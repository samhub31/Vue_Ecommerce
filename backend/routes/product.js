import express from 'express';
import cloudinary from '../cloudinary.js';
import multer from 'multer'
import Product from '../models/product.js';
import { isAuth } from '../utils.js';

const productRouter = express.Router();


const storage = multer.memoryStorage();
const upload = multer({ storage });

async function handleUpload(file) {
  return await cloudinary.uploader.upload(file, {
    resource_type: "auto"
  });
}

productRouter.post('/images', upload.single("image"), async (req, res) => {
  try {
    const { name, price, desc } = req.body;
    if (!req.file) {
      return res.status(400).send({ message: 'No file uploaded' });
    }
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const dataURI = `data:${req.file.mimetype};base64,${b64}`;
    const cldRes = await handleUpload(dataURI);

    if (cldRes) {
      const product = new Product({
        image: cldRes.secure_url,
        name,
        price,
        desc
      });
      const savedProduct = await product.save();
      res.status(200).send(savedProduct);
    } else {
      res.status(500).send({ message: 'Cloudinary upload failed' });
    }
  } catch (error) {
    console.error('Error uploading product:', error);
    res.status(500).send({ message: 'Error uploading product' });
  }
});



productRouter.get('/getProduct', isAuth, async(req, res) =>{
try {
const products = await Product.find({})
res.status(200).send(products)
} catch (error) {
console.log(error)
res.status(500).send(error)
}

})



productRouter.delete('/:id', isAuth, async (req, res) => {
  try {
    const productId = req.params.id;
    console.log('Received delete request for product ID:', productId); // Add this line to debug
    const product = await Product.findById(productId);
    if (product) {
      await product.remove();
      res.send({ message: 'Product Deleted' });
    } else {
      res.status(404).send({ message: 'Product Not Found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error Deleting Product' });
  }
});


productRouter.get('/search', async (req, res) => {
  try {
    const { query } = req.query; 
    const products = await Product.find({ 
      name: { $regex: query, $options: 'i' } 
    });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error searching products', error });
  }
});


export default productRouter