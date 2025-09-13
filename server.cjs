const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const net = require('net');
const app = express();
const defaultPort = 3001;

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

// Handle credit count storage updates
app.post('/api/update-credit-storage', express.json(), (req, res) => {
  console.log('Received credit storage update request:', req.body);
  try {
    const { userEmail, credits } = req.body;
    
    if (!userEmail || credits === undefined) {
      console.log('Missing required fields:', { userEmail, credits });
      return res.status(400).json({ error: 'User email and credits amount are required' });
    }

    const XLSX = require('xlsx');
    const filePath = path.join(__dirname, 'credit_count_storage.xlsx');
    
    let workbook;
    let worksheet;
    let existingData = [];

    // Check if file exists, if not create it
    if (fs.existsSync(filePath)) {
      try {
        workbook = XLSX.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
        worksheet = workbook.Sheets[sheetName];
        
        // Convert existing data to array
        const range = XLSX.utils.decode_range(worksheet['!ref'] || 'A1:B1');
        for (let row = 1; row <= range.e.r; row++) { // Skip header row
          const userCell = worksheet[XLSX.utils.encode_cell({ r: row, c: 0 })];
          const creditsCell = worksheet[XLSX.utils.encode_cell({ r: row, c: 1 })];
          
          if (userCell && userCell.v) {
            existingData.push({
              user: userCell.v,
              credits: creditsCell && creditsCell.v ? creditsCell.v : 0
            });
          }
        }
      } catch (error) {
        console.log('Error reading existing file, creating new one');
        existingData = [];
      }
    }

    // Find if user already exists
    const userIndex = existingData.findIndex(item => item.user === userEmail);
    
    if (userIndex >= 0) {
      // Update existing user credits
      existingData[userIndex].credits += credits;
    } else {
      // Add new user
      existingData.push({ user: userEmail, credits });
    }

    // Create new workbook with updated data
    const newWorkbook = XLSX.utils.book_new();
    const wsData = [
      ['User', 'Credits'],
      ...existingData.map(item => [item.user, item.credits])
    ];
    
    const newWorksheet = XLSX.utils.aoa_to_sheet(wsData);
    XLSX.utils.book_append_sheet(newWorkbook, newWorksheet, 'Credit Storage');
    
    // Write file
    XLSX.writeFile(newWorkbook, filePath);
    
    return res.status(200).json({ 
      success: true,
      message: `Updated ${userEmail} with ${credits} credits`,
      totalCredits: existingData.find(item => item.user === userEmail)?.credits || 0
    });
    
  } catch (error) {
    console.error('Error updating credit storage:', error);
    return res.status(500).json({ error: 'Failed to update credit storage' });
  }
});

// Function to find an available port
function findAvailablePort(startPort, callback) {
  const server = net.createServer();
  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      // Port is in use, try the next port
      findAvailablePort(startPort + 1, callback);
    } else {
      callback(err);
    }
  });

  server.listen(startPort, () => {
    const foundPort = server.address().port;
    server.close(() => {
      callback(null, foundPort);
    });
  });
}

// Start the server with an available port
findAvailablePort(defaultPort, (err, port) => {
  if (err) {
    console.error('Error finding available port:', err);
    return;
  }
  
  app.listen(port, () => {
    console.log(`File upload server running at http://localhost:${port}`);
    console.log(`Files will be saved to: ${uploadDir}`);
  });
});
