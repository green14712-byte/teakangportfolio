// src/app/page.tsx
'use client'

import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
  UserButton,
} from '@clerk/nextjs'
import Link from 'next/link'

export default function HomePage() {
  return (
    <div
      style={{
        maxWidth: 900,
        margin: '0 auto',
        padding: '32px 16px',
        fontFamily: 'sans-serif',
      }}
    >
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 16 }}>
        Teakang Portfolio
      </h1>

      <p style={{ fontSize: 16, marginBottom: 16 }}>
        <strong>안녕하세요 👋</strong>
      </p>

      <p style={{ lineHeight: 1.7, marginBottom: 24 }}>
        이 사이트는 <strong>Next.js + Clerk + MongoDB</strong>로 제작된 개인
        포트폴리오입니다.
        <br />
        왼쪽 메뉴에서 각 페이지로 이동할 수 있습니다.
      </p>

      <ul style={{ lineHeight: 2, marginBottom: 32 }}>
        <li>
          <strong>유태강 소개</strong> : 간단한 자기소개 페이지입니다. (
          <Link href="/about">/about</Link>)
        </li>
        <li>
          <strong>GitHub</strong> : 깃허브 리포지토리 목록을 보여줍니다. (
          <Link href="/github">/github</Link>)
        </li>
        <li>
          <strong>실습물</strong> : 수업/프로젝트 실습물을 MongoDB에 저장하고
          관리하는 페이지입니다. (<Link href="/practice">/practice</Link>)
        </li>
      </ul>

      <div>
        <SignedOut>
          <SignInButton mode="modal">
            <button
              style={{
                background: '#0f172a',
                color: '#fff',
                border: 'none',
                borderRadius: 6,
                padding: '8px 14px',
                cursor: 'pointer',
              }}
            >
              로그인
            </button>
          </SignInButton>
        </SignedOut>

        <SignedIn>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span>환영합니다!</span>
            <UserButton />
            <SignOutButton redirectUrl="/">
              <button
                style={{
                  background: '#e2e8f0',
                  color: '#0f172a',
                  border: 'none',
                  borderRadius: 6,
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
