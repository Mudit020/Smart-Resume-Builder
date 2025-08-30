const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Use a JSON file to store resumes
const DATA_FILE = 'resumes.json';
let resumes = [];

// Load resumes from file if it exists
if (fs.existsSync(DATA_FILE)) {
  resumes = JSON.parse(fs.readFileSync(DATA_FILE));
}

// Helper to save resumes to file
function saveResumes() {
  fs.writeFileSync(DATA_FILE, JSON.stringify(resumes, null, 2));
}

// Get all resumes
app.get('/api/resumes', (req, res) => {
  res.json(resumes);
});

// Add a new resume
app.post('/api/resumes', (req, res) => {
  const resume = req.body;
  resumes.push(resume);
  saveResumes();
  res.status(201).json({ message: 'Resume saved!', resume });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
}); 