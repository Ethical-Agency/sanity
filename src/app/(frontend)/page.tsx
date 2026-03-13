import Link from 'next/link'
import { client } from '@/sanity/lib/client'
import { postsQuery } from '@/sanity/lib/queries'

export default async function HomePage() {
  const posts = await client.fetch(postsQuery, {}, { next: { revalidate: 60 } })

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <section className="text-center mb-20">
        <h1 className="text-5xl font-bold mb-4">Next.js + Sanity CMS</h1>
        <p className="text-xl text-gray-600 mb-8">
          A test project comparing Sanity CMS to Payload CMS
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/blog"
            className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
          >
            View Blog
          </Link>
          <Link
            href="/studio"
            className="border border-black px-6 py-3 rounded-lg hover:bg-gray-50 transition"
          >
            Open Studio
          </Link>
        </div>
      </section>

      {posts.length > 0 && (
        <section>
          <h2 className="text-2xl font-semibold mb-6">Latest Posts</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {posts.slice(0, 3).map((post: any) => (
              <Link
                key={post._id}
                href={`/blog/${post.slug.current}`}
                className="border rounded-xl p-6 hover:shadow-md transition"
              >
                <h3 className="font-semibold text-lg mb-2">{post.title}</h3>
                {post.excerpt && (
                  <p className="text-gray-600 text-sm line-clamp-3">{post.excerpt}</p>
                )}
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
