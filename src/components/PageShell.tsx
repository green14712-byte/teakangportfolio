'use client'
import React from 'react'

export default function PageShell({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div style={{ maxWidth: 960, padding: 16 }}>
      <h1 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>
        {title}
      </h1>
      <div>{children}</div>
    </div>
  )
}
