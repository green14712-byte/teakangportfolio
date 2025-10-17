// src/app/page.tsx
'use client'

import Link from 'next/link'
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  SignOutButton,
} from '@clerk/nextjs'

export default function HomePage() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        padding: '40px',
        fontFamily: 'sans-serif',
        backgroundColor: '#fff',
      }}
    >
      <h1
        style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}
      >
        Teakang Portfolio
      </h1>

      <p style={{ marginBottom: '16px' }}>
        <strong>안녕하세요 👋</strong>
        <br />이 사이트는 <strong>Next.js + Clerk</strong>로 제작된 개인
        포트폴리오입니다.
      </p>

      <ul style={{ lineHeight: '2', marginBottom: '40px' }}>
        <li>
          <Link href="/about">
            <strong>유태강 소개</strong>
          </Link>{' '}
          : 간단한 소개 페이지입니다.
        </li>
        <li>
          <Link href="/github">
            <strong>GitHub</strong>
          </Link>{' '}
          : 유태강의 깃허브 링크입니다.
        </li>
        <li>
          <Link href="/clerk-app">
            <strong>Clerk App</strong>
          </Link>{' '}
          : 실습했던 예제 서비스 배포 주소입니다.
        </li>
      </ul>

      <div>
        {/* ❌ 비로그인 상태 */}
        <SignedOut>
          <SignInButton mode="modal">
            <button
              style={{
                background: '#000',
                color: '#fff',
                border: 'none',
                borderRadius: '6px',
                padding: '8px 14px',
                cursor: 'pointer',
              }}
            >
              로그인
            </button>
          </SignInButton>
        </SignedOut>

        {/* ✅ 로그인 상태 */}
        <SignedIn>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              marginTop: '10px',
            }}
          >
            <span>환영합니다!</span>
            <UserButton />
            <SignOutButton redirectUrl="/">
              <button
                style={{
                  background: '#e2e8f0',
                  color: '#1e293b',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '6px 10px',
                  cursor: 'pointer',
                }}
              >
                로그아웃
              </button>
            </SignOutButton>
          </div>
        </SignedIn>
      </div>
    </div>
  )
}
