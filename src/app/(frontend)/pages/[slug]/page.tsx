import { notFound } from 'next/navigation'
import { client } from '@/sanity/lib/client'
import { pageBySlugQuery, pagesQuery } from '@/sanity/lib/queries'
import PortableTextRenderer from '@/components/PortableText'

export async function generateStaticParams() {
  const pages = await client.fetch(pagesQuery)
  return pages.map((page: any) => ({ slug: page.slug.current }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const page = await client.fetch(pageBySlugQuery, { slug })
  return { title: page?.title ?? 'Page Not Found' }
}

export default async function DynamicPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const page = await client.fetch(pageBySlugQuery, { slug }, { next: { revalidate: 60 } })

  if (!page) notFound()

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold mb-10">{page.title}</h1>
      {page.body && <PortableTextRenderer value={page.body} />}
    </div>
  )
}
