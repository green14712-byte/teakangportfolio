// src/app/github/error.tsx
'use client'

export default function Error({ error }: { error: Error }) {
  return (
    <div className="rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-700">
      GitHub 데이터를 불러오는 중 문제가 발생했습니다.
      <div className="mt-1 opacity-80">{error.message}</div>
    </div>
  )
}
