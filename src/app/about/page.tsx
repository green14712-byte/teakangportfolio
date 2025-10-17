// src/app/about/page.tsx
import PageShell from '@/components/PageShell'
import Image from 'next/image'

export default function AboutPage() {
  return (
    <PageShell title="유태강">
      <div style={{ lineHeight: '1.8', fontSize: '1.05rem' }}>
        <p>
          <br />
          <strong>2022년</strong>에 <strong>중부대학교 정보보호학과</strong>에
          입학하였습니다.
        </p>
        <p>
          특히 네트워크 보안, 웹 취약점, 암호기술 등에 관심이 많으며, 최근에는{' '}
          <strong>Next.js</strong>를 이용해 웹페이지를 만드는 것을
          배우고있습니다.
        </p>
        <p>
          앞으로는 실무 중심의 보안 전문가로 성장하여, 사용자와 시스템 모두가
          안전한 환경을 만드는 것을 목표로 하고 있습니다.
        </p>
      </div>

      {/* 하단 로고 */}
      <div className="mt-10 text-center opacity-80">
        <a
          href="https://www.joongbu.ac.kr/"
          target="_blank"
          rel="noopener noreferrer"
          className="group block w-fit mx-auto"
        >
          <Image
            src="/joongbu.jpg"
            alt="중부대학교 로고"
            width={300}
            height={300}
            priority
            className="block mx-auto cursor-pointer transition-transform duration-300 group-hover:scale-105"
          />
        </a>

        <p className="text-sm mt-2 text-gray-600">중부대학교 정보보호학과</p>
      </div>
    </PageShell>
  )
}
