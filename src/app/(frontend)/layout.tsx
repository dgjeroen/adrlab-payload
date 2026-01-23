import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ADR Lab - Topverhalen',
  description: 'Content Management System voor topverhalen',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="nl">
      <body>{children}</body>
    </html>
  )
}
