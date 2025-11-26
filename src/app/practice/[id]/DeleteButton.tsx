// src/app/practice/[id]/DeleteButton.tsx
'use client'

import { useRouter } from 'next/navigation'
import { MouseEvent, useTransition } from 'react'

type Props = {
  id: string
}

export default function DeleteButton({ id }: Props) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  async function handleClick(
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) {
    e.preventDefault()
    if (!confirm('정말 이 실습물을 삭제하시겠습니까?')) return

    const res = await fetch(`/api/practices/${id}`, {
      method: 'DELETE',
    })

    if (!res.ok) {
      alert('삭제에 실패했습니다.')
      return
    }

    startTransition(() => {
      router.push('/practice')
      router.refresh()
    })
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isPending}
      style={{
        background: '#ef4444',
        color: '#fff',
        border: 'none',
        borderRadius: 6,
        padding: '6px 10px',
        cursor: 'pointer',
      }}
    >
      {isPending ? '삭제 중...' : '삭제'}
    </button>
  )
}
