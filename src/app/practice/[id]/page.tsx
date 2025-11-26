// src/app/practice/[id]/page.tsx
import Link from 'next/link'
import PageShell from '@/components/PageShell'
import { getPracticeById } from '@/lib/practice'
import DeleteButton from './DeleteButton'

type PageProps = {
  params: Promise<{ id: string }>
}

export const dynamic = 'force-dynamic'

export default async function PracticeDetailPage({ params }: PageProps) {
  const { id } = await params
  const practice = await getPracticeById(id)

  if (!practice) {
    return (
      <PageShell title="실습물 상세">
        <p>해당 실습물을 찾을 수 없습니다.</p>
        <Link href="/practice">목록으로 돌아가기</Link>
      </PageShell>
    )
  }

  return (
    <PageShell title="실습물 상세">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <h2>{practice.title}</h2>
        <p>{practice.date || '날짜 정보 없음'}</p>
        <p>{practice.description}</p>

        {practice.repoUrl && (
          <p>
            URL:{' '}
            <a href={practice.repoUrl} target="_blank" rel="noreferrer">
              {practice.repoUrl}
            </a>
          </p>
        )}

        {practice.note && (
          <p>
            메모:
            <br />
            {practice.note}
          </p>
        )}

        <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
          <Link href="/practice">← 목록으로</Link>
          <DeleteButton id={id} />
        </div>
      </div>
    </PageShell>
  )
}
