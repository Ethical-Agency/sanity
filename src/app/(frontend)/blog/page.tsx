import Link from 'next/link'
import { client } from '@/sanity/lib/client'
import { postsQuery } from '@/sanity/lib/queries'

export const metadata = { title: 'Blog' }

export default async function BlogPage() {
  const posts = await client.fetch(postsQuery, {}, { next: { revalidate: 60 } })

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold mb-10">Blog</h1>
      {posts.length === 0 ? (
        <p className="text-gray-500">
          No posts yet. Add some in the{' '}
          <Link href="/studio" className="underline">
            Sanity Studio
          </Link>
          .
        </p>
      ) : (
        <div className="space-y-6">
          {posts.map((post: any) => (
            <Link
              key={post._id}
              href={`/blog/${post.slug.current}`}
              className="block border rounded-xl p-6 hover:shadow-md transition"
            >
              <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
              {post.excerpt && <p className="text-gray-600">{post.excerpt}</p>}
              {post.publishedAt && (
                <p className="text-sm text-gray-400 mt-3">
                  {new Date(post.publishedAt).toLocaleDateString('en-ZA', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
