import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "비상장주식 가치평가 무료 진단 | 가업승계 사전준비",
  description: "가업승계 사전 준비를 위한 비상장주식 가치평가 무료 진단 신청 페이지입니다.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko">
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@400;500;700&display=swap"
        rel="stylesheet"
        precedence="default"
      />
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.css"
        precedence="default"
      />
      <body>{children}</body>
    </html>
  );
}
