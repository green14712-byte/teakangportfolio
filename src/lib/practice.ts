// src/lib/practice.ts
import clientPromise from '@/lib/mongodb'
import { ObjectId } from 'mongodb'

export type PracticeDoc = {
  _id?: ObjectId
  title: string
  description: string
  date?: string
  repoUrl?: string
  note?: string
  createdAt: Date
}

// 전체 목록 조회
export async function getPractices(): Promise<PracticeDoc[]> {
  const client = await clientPromise
  const db = client.db(process.env.MONGODB_DB)

  return db
    .collection<PracticeDoc>('practices')
    .find({})
    .sort({ createdAt: -1 })
    .toArray()
}

// id로 1개 조회
export async function getPracticeById(id: string) {
  const client = await clientPromise
  const db = client.db(process.env.MONGODB_DB)

  return db.collection<PracticeDoc>('practices').findOne({
    _id: new ObjectId(id),
  })
}

// 새 문서 생성
export async function createPractice(input: {
  title: string
  description: string
  date?: string
  repoUrl?: string
  note?: string
}) {
  const client = await clientPromise
  const db = client.db(process.env.MONGODB_DB)

  const doc: PracticeDoc = {
    ...input,
    createdAt: new Date(),
  }

  const result = await db.collection<PracticeDoc>('practices').insertOne(doc)
  return { insertedId: result.insertedId }
}

// 삭제
export async function deletePractice(id: string) {
  const client = await clientPromise
  const db = client.db(process.env.MONGODB_DB)

  const result = await db
    .collection<PracticeDoc>('practices')
    .deleteOne({ _id: new ObjectId(id) })

  return result.deletedCount === 1
}
