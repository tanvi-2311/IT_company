import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const usersFilePath = path.join(__dirname, '../data/users.json');

const readUsers = () => {
  try {
    if (!fs.existsSync(usersFilePath)) return [];
    return JSON.parse(fs.readFileSync(usersFilePath, 'utf8'));
  } catch (error) {
    return [];
  }
};

const writeUsers = (users) => {
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2), 'utf8');
};

// Admin only: Get all subadmins
export const getSubAdmins = (req, res) => {
  try {
    const users = readUsers();
    const subAdmins = users.filter(u => u.role === 'subadmin').map(u => ({
      id: u.id,
      name: u.name,
      email: u.email,
      role: u.role,
      permissions: u.permissions || []
    }));
    res.status(200).json(subAdmins);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin only: Create a subadmin
export const createSubAdmin = (req, res) => {
  try {
    const { name, email, password, permissions } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const users = readUsers();
    if (users.some(u => u.email === email)) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    const newUser = {
      id: Date.now(),
      name,
      email,
      password, // Password will be hashed upon first login or we could hash it here. Let's just store plaintext for the seed logic to pick up
      role: 'subadmin',
      permissions: Array.isArray(permissions) ? permissions : []
    };

    users.push(newUser);
    writeUsers(users);

    res.status(201).json({ message: 'Sub-admin created successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin only: Delete a subadmin
export const deleteSubAdmin = (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    let users = readUsers();
    
    const userIndex = users.findIndex(u => u.id === userId && u.role === 'subadmin');
    if (userIndex === -1) {
      return res.status(404).json({ message: 'Sub-admin not found' });
    }

    users.splice(userIndex, 1);
    writeUsers(users);
    
    res.status(200).json({ message: 'Sub-admin deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
