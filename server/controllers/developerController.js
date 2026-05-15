import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataFilePath = path.join(__dirname, '../data/developers.json');

// Helper to read data
const readData = () => {
  try {
    if (!fs.existsSync(dataFilePath)) {
      return [];
    }
    const data = fs.readFileSync(dataFilePath, 'utf8');
    if (!data || data.trim() === '') return [];
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading/parsing developers data:', error);
    // If it's a parse error, we should probably not return [] to avoid overwriting
    if (error instanceof SyntaxError) {
      throw new Error('Data corruption detected in developers.json. Please check the file.');
    }
    return [];
  }
};

// Helper to write data
const writeData = (data) => {
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), 'utf8');
};

// Get all developers
export const getDevelopers = (req, res) => {
  try {
    const developers = readData();
    res.status(200).json(developers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new developer
export const createDeveloper = (req, res) => {
  try {
    const developers = readData();
    const newDeveloper = {
      id: Date.now(), // Generate a simple unique ID
      ...req.body
    };
    developers.push(newDeveloper);
    writeData(developers);
    res.status(201).json(newDeveloper);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a developer
export const updateDeveloper = (req, res) => {
  try {
    const developers = readData();
    const index = developers.findIndex(dev => dev.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ message: 'Developer not found' });
    
    developers[index] = { ...developers[index], ...req.body };
    writeData(developers);
    res.status(200).json(developers[index]);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a developer
export const deleteDeveloper = (req, res) => {
  try {
    let developers = readData();
    const index = developers.findIndex(dev => dev.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ message: 'Developer not found' });
    
    developers.splice(index, 1);
    writeData(developers);
    res.status(200).json({ message: 'Developer deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Upload resume (Base64 approach for simplicity)
export const uploadResume = (req, res) => {
  try {
    const { developerId, fileName, base64Data } = req.body;
    if (!developerId || !fileName || !base64Data) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Prepare path - saving directly to the frontend's public directory
    const resumesDir = path.join(__dirname, '../../public/resumes');
    
    // Create dir if not exists
    if (!fs.existsSync(resumesDir)) {
      fs.mkdirSync(resumesDir, { recursive: true });
    }

    const filePath = path.join(resumesDir, fileName);
    const buffer = Buffer.from(base64Data, 'base64');

    fs.writeFileSync(filePath, buffer);

    // Update developers.json
    const developers = readData();
    const index = developers.findIndex(dev => dev.id === parseInt(developerId));
    if (index !== -1) {
      developers[index].resumeUrl = `/resumes/${fileName}`;
      writeData(developers);
    }

    res.status(200).json({ 
      message: 'Resume uploaded successfully', 
      resumeUrl: `/resumes/${fileName}` 
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ message: error.message });
  }
};
// Delete resume
export const deleteResume = (req, res) => {
  try {
    const { developerId } = req.body;
    if (!developerId) {
      return res.status(400).json({ message: 'Missing developerId' });
    }

    const developers = readData();
    const index = developers.findIndex(dev => dev.id === parseInt(developerId));
    if (index === -1) return res.status(404).json({ message: 'Developer not found' });

    const resumeUrl = developers[index].resumeUrl;
    if (resumeUrl) {
      const fileName = resumeUrl.replace('/resumes/', '');
      const filePath = path.join(__dirname, '../../public/resumes', fileName);
      
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
      
      developers[index].resumeUrl = '';
      writeData(developers);
    }

    res.status(200).json({ message: 'Resume removed successfully' });
  } catch (error) {
    console.error('Delete resume error:', error);
    res.status(500).json({ message: error.message });
  }
};
