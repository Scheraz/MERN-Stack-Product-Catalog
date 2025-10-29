import Product from '../model/productModel.js'

// GET ALL PRODUCTS
export const getAllProducts = async (req, res) => {
  try {
    const allProducts = await Product.find({})
    res.status(200).json({ success: true, data: allProducts })
  } catch (error) {
    res
      .status(500)
      .json({ success: false, msg: 'There was a problem getting all products' })
  }
}

// GET SINGLE PRODUCT
export const getSingleProduct = async (req, res) => {
  const id = req.params.id
  try {
    const singleProduct = await Product.findById(id)
    if (!singleProduct) {
      return res
        .status(404)
        .json({ success: false, msg: `No product found with id: ${id}` })
    }
    res.status(200).json({ success: true, data: singleProduct })
  } catch (error) {
    res
      .status(500)
      .json({ success: false, msg: 'There was a problem getting the product' })
  }
}

// CREATE PRODUCT
export const createProduct = async (req, res) => {
  const product = req.body
  if (!product.name || !product.price || !product.image) {
    return res
      .status(400)
      .json({ success: false, msg: 'Please add name, price and image.' })
  }

  try {
    const newProduct = await Product.create(product)
    res.status(201).json({ success: true, data: newProduct })
  } catch (error) {
    res
      .status(500)
      .json({ success: false, msg: 'There was a problem creating the product' })
  }
}

// UPDATE PRODUCT
export const updateProduct = async (req, res) => {
  const id = req.params.id
  const { name, price, image } = req.body

  if (!name || !price || !image) {
    return res
      .status(400)
      .json({ success: false, msg: 'Please provide name, price and image' })
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { name, price, image },
      { new: true, runValidators: true }
    )
    if (!updatedProduct) {
      return res
        .status(404)
        .json({ success: false, msg: `No product found with id: ${id}` })
    }
    res.status(200).json({ success: true, data: updatedProduct })
  } catch (error) {
    res
      .status(500)
      .json({ success: false, msg: 'There was a problem updating the product' })
  }
}

// DELETE PRODUCT
export const deleteProduct = async (req, res) => {
  const id = req.params.id
  try {
    const deletedProduct = await Product.findByIdAndDelete(id)
    if (!deletedProduct) {
      return res
        .status(404)
        .json({ success: false, msg: `No product found with id: ${id}` })
    }
    res.status(200).json({ success: true, data: deletedProduct })
  } catch (error) {
    res
      .status(500)
      .json({ success: false, msg: 'There was a problem deleting the product' })
  }
}
