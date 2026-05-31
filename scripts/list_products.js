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
  console.log('Using mongoUri:', mongoUri)
  const client = new MongoClient(mongoUri)
  await client.connect()
  const db = client.db('YT-NEXTJS-ECOMMERCE')

  const products = await db.collection('products').find({}).project({ _id: 1, name: 1, slug: 1 }).limit(50).toArray()
  console.log('Products list (up to 50):')
  products.forEach(p => console.log(p._id + ' | ' + p.slug + ' | ' + p.name))

  await client.close()
}

main().catch(err => { console.error(err); process.exit(1) })
