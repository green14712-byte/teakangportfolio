// src/app/api/practices/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { createPractice, getPractices } from '@/lib/practice'

export const dynamic = 'force-dynamic' // 캐시 없이 항상 새로 조회

// GET /api/practices  -> 전체 목록
export async function GET() {
  try {
    const list = await getPractices()
    return NextResponse.json(list, { status: 200 })
  } catch (err) {
    console.error('[GET /api/practices] error:', err)
    return NextResponse.json(
      { message: '실습물 목록을 불러올 수 없습니다.' },
      { status: 500 }
    )
  }
}

// POST /api/practices  -> 새로 등록
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const title = String(body.title || '').trim()
    const description = String(body.description || '').trim()
    const date = body.date ? String(body.date).trim() : undefined
    const repoUrl = body.repoUrl ? String(body.repoUrl).trim() : undefined
    const note = body.note ? String(body.note).trim() : undefined

    if (!title || !description) {
      return NextResponse.json(
        { message: '제목과 설명은 필수입니다.' },
        { status: 400 }
      )
    }

    const result = await createPractice({
      title,
      description,
      date,
      repoUrl,
      note,
    })

    return NextResponse.json(
      { message: '저장되었습니다.', id: result.insertedId.toString() },
      { status: 201 }
    )
  } catch (err) {
    console.error('[POST /api/practices] error:', err)
    return NextResponse.json(
      { message: '실습물을 저장할 수 없습니다.' },
      { status: 500 }
    )
  }
}
