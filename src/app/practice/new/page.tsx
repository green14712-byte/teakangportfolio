// src/app/practice/new/page.tsx
'use client'

import { useRouter } from 'next/navigation'
import { FormEvent, useState } from 'react'
import PageShell from '@/components/PageShell'

export default function PracticeNewPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (isSubmitting) return

    const formData = new FormData(e.currentTarget)
    const title = String(formData.get('title') || '').trim()
    const description = String(formData.get('description') || '').trim()
    const repoUrl = String(formData.get('repoUrl') || '').trim()
    const note = String(formData.get('note') || '').trim()

    if (!title) {
      alert('제목은 필수입니다.')
      return
    }

    setIsSubmitting(true)
    try {
      const res = await fetch('/api/practices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          description,
          repoUrl: repoUrl || null,
          note: note || null,
        }),
      })

      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as {
          message?: string
        } | null
        alert(data?.message ?? '저장에 실패했습니다.')
        return
      }

      router.push('/practice')
      router.refresh()
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <PageShell title="새 실습물 등록">
      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
          maxWidth: 520,
        }}
      >
        <label style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <span>제목 *</span>
          <input
            name="title"
            required
            style={{
              border: '1px solid #e5e7eb',
              borderRadius: 6,
              padding: '8px 10px',
            }}
          />
        </label>

        <label style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <span>설명</span>
          <textarea
            name="description"
            rows={3}
            style={{
              border: '1px solid #e5e7eb',
              borderRadius: 6,
              padding: '8px 10px',
            }}
          />
        </label>

        <label style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <span>실습물 주소 (GitHub, Vercel 등)</span>
          <input
            name="repoUrl"
            placeholder="https://..."
            style={{
              border: '1px solid #e5e7eb',
              borderRadius: 6,
              padding: '8px 10px',
            }}
          />
        </label>

        <label style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <span>메모</span>
          <textarea
            name="note"
            rows={2}
            style={{
              border: '1px solid #e5e7eb',
              borderRadius: 6,
              padding: '8px 10px',
            }}
          />
        </label>

        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            marginTop: 8,
            background: '#2563eb',
            color: '#fff',
            padding: '8px 14px',
            borderRadius: 6,
            border: 'none',
            cursor: 'pointer',
            opacity: isSubmitting ? 0.7 : 1,
          }}
        >
          {isSubmitting ? '저장 중...' : '저장하기'}
        </button>
      </form>
    </PageShell>
  )
}
