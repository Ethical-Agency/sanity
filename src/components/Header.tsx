import Link from 'next/link'

export default function Header() {
  return (
    <header className="border-b">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="font-semibold text-lg">
          Sanity Test
        </Link>
        <nav className="flex gap-6 text-sm">
          <Link href="/blog" className="hover:text-gray-600 transition">
            Blog
          </Link>
          <Link href="/studio" className="hover:text-gray-600 transition">
            Studio
          </Link>
        </nav>
      </div>
    </header>
  )
}
