// src/app/api/practices/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { deletePractice } from '@/lib/practice'

// Next 15에서는 params가 Promise로 들어옴
type RouteParams = {
  params: Promise<{ id: string }>
}

export async function DELETE(_req: NextRequest, context: RouteParams) {
  try {
    // ❗ params를 먼저 await 해서 id를 꺼냄
    const { id } = await context.params

    const ok = await deletePractice(id)

    if (!ok) {
      return NextResponse.json(
        { message: '삭제할 실습물을 찾을 수 없습니다.' },
        { status: 404 }
      )
    }

    return NextResponse.json({ message: '삭제되었습니다.' }, { status: 200 })
  } catch (err) {
    console.error('[DELETE /api/practices/:id] error:', err)
    return NextResponse.json(
      { message: '실습물을 삭제할 수 없습니다.' },
      { status: 500 }
    )
  }
}
