// src/app/layout.tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  UserButton,
  SignInButton,
  SignOutButton, // ✅ 추가
} from '@clerk/nextjs'
import { Geist, Geist_Mono } from 'next/font/google' // Margarine 제거
import './globals.css'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Teakang Portfolio',
  description: 'Next.js + Clerk integration',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="ko" className={`${geistSans.variable} ${geistMono.variable}`}>
        <body
          style={{ display: 'flex', minHeight: '100vh' }}
          className="antialiased"
        >
          {/* 왼쪽 사이드바 */}
          <nav
            style={{
              width: '220px',
              background: '#e0f2fe',
              color: '#0f172a',
              padding: '20px',
              borderRight: '2px solid #bae6fd',
            }}
          >
            <Link
              href="/"
              style={{
                display: 'block',
                marginBottom: '20px',
                fontWeight: 'bold',
                textDecoration: 'none',
                color: '#0f172a',
              }}
            >
              📁 Portfolio
            </Link>

            <ul style={{ listStyle: 'none', padding: 0, lineHeight: '2' }}>
              <li style={{ marginBottom: '10px' }}>
                <a
                  href="/about"
                  style={{ color: '#0f172a', textDecoration: 'none' }}
                >
                  유태강
                </a>
              </li>

              {/* ✅ 로그인 시 접근 가능한 메뉴 */}
              <SignedIn>
                <li style={{ marginBottom: '10px' }}>
                  <a
                    href="/github"
                    style={{ color: '#0f172a', textDecoration: 'none' }}
                  >
                    GitHub
                  </a>
                </li>
                <li>
                  <a
                    href="/clerk-app"
                    style={{ color: '#0f172a', textDecoration: 'none' }}
                  >
                    Clerk App
                  </a>
                </li>
              </SignedIn>

              {/* ❌ 비로그인 시 클릭 → 로그인 모달 자동 실행 */}
              <SignedOut>
                <li style={{ marginBottom: '10px' }}>
                  <SignInButton mode="modal">
                    <button
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#64748b',
                        cursor: 'pointer',
                        padding: 0,
                        textAlign: 'left',
                      }}
                    >
                      🔒 GitHub (로그인 필요)
                    </button>
                  </SignInButton>
                </li>
                <li>
                  <SignInButton mode="modal">
                    <button
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#64748b',
                        cursor: 'pointer',
                        padding: 0,
                        textAlign: 'left',
                      }}
                    >
                      🔒 Clerk App (로그인 필요)
                    </button>
                  </SignInButton>
                </li>
              </SignedOut>
            </ul>

            <div
              style={{
                marginTop: '40px',
                borderTop: '1px solid #bae6fd',
                paddingTop: '20px',
              }}
            >
              <SignedOut>
                <SignInButton mode="modal">
                  <button
                    style={{
                      background: '#0f172a',
                      color: '#fff',
                      padding: '8px 12px',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      border: 'none',
                    }}
                  >
                    로그인
                  </button>
                </SignInButton>
              </SignedOut>

              <SignedIn>
                {/* 프로필 메뉴 + 타입 안전한 로그아웃 버튼 */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <UserButton /> {/* afterSignOutUrl 제거 */}
                  <SignOutButton redirectUrl="/">
                    <button
                      style={{
                        background: '#e2e8f0',
                        color: '#0f172a',
                        padding: '6px 10px',
                        borderRadius: 6,
                        border: 'none',
                        cursor: 'pointer',
                      }}
                    >
                      로그아웃
                    </button>
                  </SignOutButton>
                </div>
              </SignedIn>
            </div>
          </nav>

          {/* 오른쪽 메인 콘텐츠 */}
          <main style={{ flex: 1, padding: '20px' }}>{children}</main>
        </body>
      </html>
    </ClerkProvider>
  )
}
