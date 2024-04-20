const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
const app = express();

app.use(bodyParser.json({ limit: '50mb' }));
app.use(cors());

//import routes
const postRoutes = require('./routes/posts');

//app middleware
app.use(bodyParser.json());
app.use(cors());

//route middleware
app.use(postRoutes);

mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('MongoDB connected');
    app.listen(process.env.PORT || 8070, () => {
      console.log(`App is running on ${process.env.PORT || 8070}`);
    });
  })
  .catch((err) => {
    console.error('DB Connection error', err);
    process.exit(1);
  });

const imageSchema = new mongoose.Schema({
  image: String,
  title: String,
  description: String,
});
const ImageModel = mongoose.model('Image', imageSchema);

app.get('/images', async (req, res) => {
  try {
    const data = await ImageModel.find({});
    res.json({ message: 'All Images', data: data.reverse() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/images/upload', async (req, res) => {
  const { image, title, description } = req.body;

  try {
    const newImage = new ImageModel({ image, title, description });
    await newImage.save();
    res.status(201).json({
      message: 'Image Uploaded Successfully',
      success: true,
      data: newImage,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/images/delete/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await ImageModel.findByIdAndDelete(id);
    res.json({ message: 'Image Deleted Successfully', success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/images/update/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  try {
    const updatedImage = await ImageModel.findByIdAndUpdate(
      id,
      { title, description },
      { new: true }
    );
    if (updatedImage) {
      res.json({ message: 'Image Updated Successfully', success: true });
    } else {
      res.status(404).json({ error: 'Image not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
