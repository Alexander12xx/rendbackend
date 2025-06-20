// Set up storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });
// Store products in memory
let products = [];
// Endpoint to upload images for "Our Work" section
app.post('/upload-work', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }
  const filePath = `/${req.file.path}`;
  io.emit('newImage', filePath);
  res.send({ filePath });
});
// Endpoint to upload featured products
app.post('/add-product', upload.single('image'), (req, res) => {
  const { title, description } = req.body;
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }
  const productImagePath = `/${req.file.path}`;
  const newProduct = { title, description, imagePath: productImagePath };
  products.push(newProduct);
  io.emit('newProduct', newProduct);
  res.send({ message: 'Product added successfully!', product: newProduct });
});
// Start the server
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});