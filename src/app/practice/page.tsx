// src/app/practice/page.tsx
import Link from 'next/link'
import PageShell from '@/components/PageShell'
import { getPractices } from '@/lib/practice'

export const dynamic = 'force-dynamic' // 매 요청마다 DB에서 새로 가져오기

export default async function PracticeListPage() {
  const practices = await getPractices()

  return (
    <PageShell title="실습물 관리">
      <div style={{ marginBottom: 16 }}>
        <Link href="/practice/new">
          <button
            type="button"
            style={{
              padding: '8px 12px',
              borderRadius: 6,
              border: 'none',
              background: '#0f172a',
              color: '#fff',
              cursor: 'pointer',
            }}
          >
            + 새 실습물 등록
          </button>
        </Link>
      </div>

      {practices.length === 0 ? (
        <p>아직 등록된 실습물이 없습니다.</p>
      ) : (
        <ul style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {practices.map((p) => (
            <li
              key={p._id?.toString()}
              style={{
                padding: 12,
                borderRadius: 8,
                border: '1px solid #e5e7eb',
                background: '#f9fafb',
              }}
            >
              <Link
                href={`/practice/${p._id?.toString()}`}
                style={{ textDecoration: 'none', color: '#0f172a' }}
              >
                <h3
                  style={{
                    fontSize: 16,
                    fontWeight: 600,
                    marginBottom: 4,
                  }}
                >
                  {p.title}
                </h3>
                <p
                  style={{
                    fontSize: 14,
                    color: '#64748b',
                    marginBottom: 4,
                  }}
                >
                  {p.date || '날짜 정보 없음'}
                </p>
                <p
                  style={{
                    fontSize: 14,
                    color: '#4b5563',
                    margin: 0,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {p.description}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </PageShell>
  )
}
