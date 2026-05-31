const { MongoClient } = require('mongodb')
const fs = require('fs')

function getEnvVar(name) {
  try {
    const env = fs.readFileSync('.env.local', 'utf8')
    const re = new RegExp(`^\\s*${name}\\s*=\\s*\"?(.*?)\"?\\s*$`, 'm')
    const m = env.match(re)
    return m ? m[1] : undefined
  } catch (e) {
    return process.env[name]
  }
}

async function main() {
  const mongoUri = getEnvVar('MONGODB_URI') || process.env.MONGODB_URI
  const client = new MongoClient(mongoUri)
  await client.connect()
  const db = client.db('YT-NEXTJS-ECOMMERCE')

  const productSlug = "men's-shirt"
  let product = await db.collection('products').findOne({ slug: productSlug })
  if (!product) {
    // Try broader search (some slugs may use different apostrophe or typos)
    product = await db.collection('products').findOne({ $or: [ { slug: { $regex: '^men', $options: 'i' } }, { name: { $regex: 'men', $options: 'i' } } ] })
  }
  if (!product) {
    console.error('Product not found (tried slug and name regex):', productSlug)
    await client.close()
    process.exit(1)
  }

  // Check existing variants for this product
  const existing = await db.collection('productvariants').findOne({ product: product._id })
  if (existing) {
    console.log('Product already has a variant (id):', existing._id)
    await client.close()
    process.exit(0)
  }

  const variantDoc = {
    product: product._id,
    color: 'Blue',
    size: 'M',
    sku: 'MEN-SHIRT-DEFAULT',
    mrp: product.mrp || 0,
    sellingPrice: product.sellingPrice || 0,
    discountPercentage: product.discountPercentage || 0,
    media: product.media || [],
    deletedAt: null,
    createdAt: new Date(),
    updatedAt: new Date()
  }

  const result = await db.collection('productvariants').insertOne(variantDoc)
  console.log('Inserted variant id:', result.insertedId)

  await client.close()
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
