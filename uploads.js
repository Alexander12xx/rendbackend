// api/upload.js
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() }); // Use memory storage for serverless
module.exports = (req, res) => {
  upload.single('image')(req, res, (err) => {
    if (err) {
      return res.status(400).send('Error uploading file.');
    }
    const filePath = `data:image/png;base64,${req.file.buffer.toString('base64')}`; // Convert to base64
    res.status(200).json({ filePath });
  });
};