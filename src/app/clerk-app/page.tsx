// src/app/clerk-app/page.tsx
'use client'

import Link from 'next/link'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'

export default function ClerkAppPage() {
  return (
    <div style={{ maxWidth: 960, padding: 24 }}>
      <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 16 }}>
        Clerk App 실습 소개
      </h1>

      <p style={{ marginBottom: 16 }}>
        이 페이지는 Clerk 인증 실습용 예제 서비스로 이동하는 링크를 모아둔
        곳입니다.
      </p>

      <ul style={{ listStyle: 'disc', paddingLeft: 20, lineHeight: 1.8 }}>
        <li>
          <Link
            href="https://clerk-app-beige.vercel.app/"
            target="_blank"
            style={{ color: '#2563eb' }}
          >
            Clerk-App 데모 바로가기
          </Link>
        </li>
      </ul>

      <div style={{ marginTop: 24 }}>
        <SignedOut>
          <SignInButton mode="modal">
            <button
              style={{
                background: '#0f172a',
                color: '#fff',
                padding: '8px 14px',
                borderRadius: 6,
                border: 'none',
                cursor: 'pointer',
              }}
            >
              로그인 후 이용하기
            </button>
          </SignInButton>
        </SignedOut>

        <SignedIn>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <UserButton />
            <span>현재 계정으로 이용 중입니다.</span>
          </div>
        </SignedIn>
      </div>
    </div>
  )
}
