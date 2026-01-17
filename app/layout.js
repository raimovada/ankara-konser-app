export const metadata = {
  title: 'Ankara Konser Takip',
  description: 'Ankara\'daki konserleri takip edin',
}

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  )
}
