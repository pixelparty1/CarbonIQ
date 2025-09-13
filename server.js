const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 3001;

// Enable CORS for the React app
app.use(cors());

// Create carbon_diposits directory if it doesn't exist
const uploadDir = path.join(__dirname, 'carbon_diposits');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Create carbon_deposits directory for Excel files
const depositsDir = path.join(__dirname, 'carbon_deposits');
if (!fs.existsSync(depositsDir)) {
  fs.mkdirSync(depositsDir, { recursive: true });
}

// Configure multer storage
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function(req, file, cb) {
    const userId = req.body.userId || 'unknown';
    const fileExt = path.extname(file.originalname);
    cb(null, `${userId}_${Date.now()}${fileExt}`);
  }
});

const upload = multer({ storage });

// Configure multer storage for carbon_deposits
const depositsStorage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, depositsDir);
  },
  filename: function(req, file, cb) {
    const userId = req.body.userId || 'unknown';
    const fileExt = path.extname(file.originalname);
    cb(null, `${userId}_${Date.now()}${fileExt}`);
  }
});

const uploadDeposits = multer({ 
  storage: depositsStorage,
  fileFilter: function (req, file, cb) {
    // Only allow Excel files
    if (file.mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || 
        file.mimetype === 'application/vnd.ms-excel' ||
        file.originalname.endsWith('.xlsx') ||
        file.originalname.endsWith('.xls')) {
      cb(null, true);
    } else {
      cb(new Error('Only Excel files are allowed!'), false);
    }
  }
});

// Handle file upload to carbon_diposits
app.post('/api/upload', upload.single('file'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    
    // Return success response with file info
    return res.status(200).json({ 
      success: true, 
      filePath: req.file.path,
      fileName: req.file.filename 
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    return res.status(500).json({ error: 'File upload failed' });
  }
});

// Handle Excel file upload to carbon_deposits
app.post('/api/upload-deposits', uploadDeposits.single('file'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No Excel file uploaded' });
    }
    
    // Return success response with file info
    return res.status(200).json({ 
      success: true, 
      filePath: req.file.path,
      fileName: req.file.filename,
      message: 'Excel file uploaded successfully to carbon_deposits folder'
    });
  } catch (error) {
    console.error('Error uploading Excel file:', error);
    if (error.message === 'Only Excel files are allowed!') {
      return res.status(400).json({ error: 'Only Excel files (.xlsx, .xls) are allowed' });
    }
    return res.status(500).json({ error: 'Excel file upload failed' });
  }
});

app.listen(port, () => {
  console.log(`File upload server running at http://localhost:${port}`);
  console.log(`Files will be saved to: ${uploadDir}`);
});
