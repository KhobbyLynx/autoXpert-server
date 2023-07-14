import Product from '../models/product.model.js'

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find()
    res.status(200).json(products)
  } catch (error) {
    console.error('Error fetching products:', error)
    res.status(500).json({ error: 'Error fetching products' })
  }
}

export const singleProduct = async (req, res) => {
  try {
    const productId = req.params.id
    const product = await Product.findById(productId)

    if (!product) {
      return res.status(404).json('product not found')
    }

    res.status(200).json(product)
  } catch (error) {
    console.log(error)
  }
}

export const createProduct = async (req, res) => {
  const newProduct = new Product({
    name: 'Men Business Quartz Watch Classic Stainless Steel',
    brandName: 'Lynx',
    price: 99.0,
    description:
      'This Rolex Wrist Watch with Gold Dial adds a striking, masculine element to your looks. It takes your overall outfit from ordinary to extraordinary. The timepiece incorporates the basic elements of watchmaking in the refined rolex straps, clean steel case and sleek dial. It is a luxury addition to any outfit -  perfect for a self treat as well as a great gift idea for someone special. ',
    category: 'Clothing', // Manually set the category value
    rating: 4.5,
    reviewCount: 9,
    quantity: 0,
    images: [
      'https://res.cloudinary.com/khobbylynx/image/upload/v1683975735/lynxmart/img/products/watch/rolex_eca_sviuo1.jpg',
      'https://res.cloudinary.com/khobbylynx/image/upload/v1683975727/lynxmart/img/products/watch/rolex_a_dkespo.jpg',
      'https://res.cloudinary.com/khobbylynx/image/upload/v1683975741/lynxmart/img/products/watch/rolex__rwrvoi.jpg',
      'https://res.cloudinary.com/khobbylynx/image/upload/v1683975736/lynxmart/img/products/watch/rolex_ec_vx8icn.jpg',
    ],
  })

  try {
    const savedProduct = await newProduct.save()
    console.log('Product saved:', savedProduct)
    res.status(201).send(newProduct)
  } catch (error) {
    console.log('Error saving product:', error)
  }
}
