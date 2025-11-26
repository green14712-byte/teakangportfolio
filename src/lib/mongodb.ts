// src/lib/mongodb.ts
import { MongoClient } from 'mongodb'

const uri = process.env.MONGODB_URI
if (!uri) {
  throw new Error('MONGODB_URI 환경 변수가 설정되어 있지 않습니다.')
}

const options = {}

let client: MongoClient
let clientPromise: Promise<MongoClient>

/**
 * 개발 환경에서는 hot reload 때문에 여러 번 생성되는 것을 막기 위해
 * 전역(globalThis)에 MongoClient Promise를 보관한다.
 */
declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined
}

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options)
    global._mongoClientPromise = client.connect()
  }
  clientPromise = global._mongoClientPromise
} else {
  client = new MongoClient(uri, options)
  clientPromise = client.connect()
}

export default clientPromise
