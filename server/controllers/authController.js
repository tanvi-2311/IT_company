import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcryptjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const usersFilePath = path.join(__dirname, '../data/users.json');

const JWT_SECRET = process.env.JWT_SECRET || 'vedanco_super_secret_key_123';

const readUsers = () => {
  try {
    if (!fs.existsSync(usersFilePath)) return [];
    return JSON.parse(fs.readFileSync(usersFilePath, 'utf8'));
  } catch (error) {
    console.error('Error reading users:', error);
    return [];
  }
};

const writeUsers = (users) => {
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2), 'utf8');
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const users = readUsers();
    
    const userIndex = users.findIndex(u => u.email === email);
    if (userIndex === -1) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    const user = users[userIndex];
    let isMatch = false;
    
    // Check if password is raw text (for initial seeding) or hashed
    if (user.password === password) {
      isMatch = true;
      // Upgrade to hash for future
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      writeUsers(users);
    } else {
      try {
        isMatch = await bcrypt.compare(password, user.password);
      } catch (e) {
        isMatch = false;
      }
    }
    
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    // Generate JWT
    const token = jwt.sign(
      { 
        id: user.id, 
        email: user.email, 
        role: user.role,
        permissions: user.permissions || []
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    res.status(200).json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        permissions: user.permissions || []
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMe = (req, res) => {
  res.status(200).json({ user: req.user });
};
