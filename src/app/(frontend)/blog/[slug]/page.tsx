import { notFound } from 'next/navigation'
import Image from 'next/image'
import { client } from '@/sanity/lib/client'
import { postBySlugQuery, postsQuery } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'
import PortableTextRenderer from '@/components/PortableText'

export async function generateStaticParams() {
  const posts = await client.fetch(postsQuery)
  return posts.map((post: any) => ({ slug: post.slug.current }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await client.fetch(postBySlugQuery, { slug })
  return { title: post?.title ?? 'Post Not Found' }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await client.fetch(postBySlugQuery, { slug }, { next: { revalidate: 60 } })

  if (!post) notFound()

  return (
    <article className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      {post.publishedAt && (
        <p className="text-gray-500 mb-8">
          {new Date(post.publishedAt).toLocaleDateString('en-ZA', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
      )}
      {post.mainImage && (
        <div className="relative w-full h-72 mb-10 rounded-xl overflow-hidden">
          <Image
            src={urlFor(post.mainImage).width(900).height(500).url()}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}
      {post.body && <PortableTextRenderer value={post.body} />}
    </article>
  )
}
