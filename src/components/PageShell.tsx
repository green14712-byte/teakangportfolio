// src/components/PageShell.tsx
'use client'

import React from 'react'

type Props = {
  title: string
  children: React.ReactNode
}

/**
 * PageShell:
 * - 전체 페이지 레이아웃은 layout.tsx(파란 사이드바)가 담당
 * - 여기서는 "제목 + 내용"만 가운데 정렬해서 보여주는 역할만 한다
 */
export default function PageShell({ title, children }: Props) {
  return (
    <div
      style={{
        maxWidth: 960,
        margin: '0 auto',
        padding: '24px 16px',
        fontFamily: 'system-ui, sans-serif',
      }}
    >
      <h1
        style={{
          fontSize: 22,
          fontWeight: 700,
          marginBottom: 16,
        }}
      >
        {title}
      </h1>
      <div>{children}</div>
    </div>
  )
}
