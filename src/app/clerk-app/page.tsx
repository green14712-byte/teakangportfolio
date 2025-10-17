// src/app/clerk-app/page.tsx
'use client'

import PageShell from '@/components/PageShell'
import { UserButton, useUser, SignOutButton } from '@clerk/nextjs'

export default function ClerkAppPage() {
  const { user } = useUser()

  return (
    <PageShell title="Clerk- app 예제실습">
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        {user ? (
          <>
            <p style={{ marginTop: '10px' }}>
              안녕하세요, <strong>{user.firstName ?? user.username}</strong>님
              👋
            </p>

            {/* 프로필 버튼 (afterSignOutUrl 제거) + 타입 안전한 로그아웃 버튼 */}
            <div
              style={{
                display: 'flex',
                gap: 10,
                justifyContent: 'center',
                marginTop: 8,
              }}
            >
              <UserButton />
            </div>

            <div style={{ marginTop: '40px' }}>
              <a
                href="https://clerk-app-beige.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-block',
                  background: '#e2e8f0',
                  color: '#1e293b',
                  padding: '10px 20px',
                  borderRadius: '8px',
                  fontWeight: '600',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.background = '#cbd5e1')
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.background = '#e2e8f0')
                }
              >
                🌐 clerk-app-beige.vercel.app 바로가기
              </a>
            </div>
          </>
        ) : (
          <p style={{ color: 'gray' }}>로그인 후 이용 가능합니다.</p>
        )}
      </div>
    </PageShell>
  )
}
