// src/app/github/page.tsx
import PageShell from '@/components/PageShell'
import { SignedIn, SignedOut } from '@clerk/nextjs' // ✅ 로그인/로그아웃 분기

type Repo = {
  id: number
  name: string
  html_url: string
  description: string | null
  stargazers_count: number
  forks_count: number
  watchers_count: number
  language: string | null
  updated_at: string
}

type User = {
  login: string
  html_url: string
  avatar_url: string
  name: string | null
  bio: string | null
  followers: number
  following: number
  public_repos: number
}

export const revalidate = 3600 // 1시간 캐시

async function getGithubData() {
  const username = process.env.GITHUB_USERNAME
  const token = process.env.GITHUB_ACCESS_TOKEN
  if (!username) throw new Error('GITHUB_USERNAME 환경변수가 필요합니다.')

  const headers: HeadersInit = token ? { Authorization: `token ${token}` } : {}

  const [userRes, reposRes] = await Promise.all([
    fetch(`https://api.github.com/users/${username}`, {
      headers,
      next: { revalidate },
    }),
    fetch(
      `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`,
      { headers, next: { revalidate } }
    ),
  ])

  if (!userRes.ok || !reposRes.ok)
    throw new Error('GitHub 데이터를 불러올 수 없습니다.')

  const user: User = await userRes.json()
  const repos: Repo[] = await reposRes.json()

  const sorted = repos
    .filter((r) => !r.name.startsWith('.'))
    .sort(
      (a, b) =>
        b.stargazers_count - a.stargazers_count ||
        new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
    )

  return { user, repos: sorted }
}

export default async function GithubPage() {
  // 서버에서 미리 데이터를 준비해 두지만, 화면 표시는 SignedIn 블록 안에서만 함
  let data: { user: User; repos: Repo[] } | null = null
  try {
    data = await getGithubData()
  } catch {
    // 로그인 상태에서만 에러 메시지를 보여줄 거라 여기선 조용히 무시
  }

  return (
    <PageShell title="GitHub 리포지토리">
      {/* 비로그인: clerk-app 페이지처럼 안내 문구만 */}
      <SignedOut>
        <p style={{ color: 'gray', textAlign: 'center' }}>
          로그인 후 이용 가능합니다.
        </p>
      </SignedOut>

      {/* 로그인: 프로필 + 리포지토리 리스트 */}
      <SignedIn>
        {!data ? (
          <p className="text-sm text-red-500">
            GitHub 데이터를 불러올 수 없습니다.
          </p>
        ) : (
          <>
            {/* 프로필 카드 */}
            <div className="mb-6 flex items-center gap-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={data.user.avatar_url}
                alt={`${data.user.login} avatar`}
                className="h-16 w-16 rounded-full border"
              />
              <div>
                <a
                  href={data.user.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg font-semibold text-blue-700 hover:underline"
                >
                  {data.user.name ?? data.user.login}
                </a>
                <p className="text-sm text-gray-600">{data.user.bio}</p>
                <div className="mt-1 text-xs text-gray-500 flex gap-3">
                  <span>👥 Followers {data.user.followers}</span>
                  <span>· Following {data.user.following}</span>
                  <span>· Public Repos {data.user.public_repos}</span>
                </div>
              </div>
            </div>

            {/* 리포지토리 리스트 */}
            <div className="space-y-3">
              {data.repos.map((repo) => (
                <a
                  key={repo.id}
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-lg border border-gray-200 p-4 hover:bg-gray-50 transition"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-blue-700">{repo.name}</h3>
                    <div className="text-xs text-gray-500">
                      최근 업데이트:{' '}
                      {new Date(repo.updated_at).toLocaleDateString()}
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 mt-1">
                    {repo.description || '설명이 없습니다.'}
                  </p>
                  <div className="text-xs text-gray-500 mt-2 flex gap-4">
                    {repo.language && <span>💻 {repo.language}</span>}
                    <span>⭐ {repo.stargazers_count}</span>
                    <span>🍴 {repo.forks_count}</span>
                    <span>👁️ {repo.watchers_count}</span>
                  </div>
                </a>
              ))}
              {data.repos.length === 0 && (
                <p className="text-sm text-gray-500">
                  표시할 리포지토리가 없습니다.
                </p>
              )}
            </div>
          </>
        )}
      </SignedIn>
    </PageShell>
  )
}
