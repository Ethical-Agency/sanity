import { PortableText, type PortableTextComponents } from '@portabletext/react'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'

const components: PortableTextComponents = {
  types: {
    image: ({ value }) => (
      <div
        className="relative w-full my-8 rounded-xl overflow-hidden"
        style={{ aspectRatio: '16/9' }}
      >
        <Image
          src={urlFor(value).width(900).url()}
          alt={value.alt || ''}
          fill
          className="object-cover"
        />
      </div>
    ),
  },
  block: {
    h1: ({ children }) => <h1 className="text-4xl font-bold mt-10 mb-4">{children}</h1>,
    h2: ({ children }) => <h2 className="text-3xl font-semibold mt-8 mb-3">{children}</h2>,
    h3: ({ children }) => <h3 className="text-2xl font-semibold mt-6 mb-2">{children}</h3>,
    normal: ({ children }) => (
      <p className="mb-4 leading-relaxed text-gray-800">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-gray-300 pl-4 italic my-6 text-gray-600">
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ value, children }) => (
      <a
        href={value?.href}
        className="underline hover:text-gray-600"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc pl-6 mb-4 space-y-1">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal pl-6 mb-4 space-y-1">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li className="text-gray-800">{children}</li>,
    number: ({ children }) => <li className="text-gray-800">{children}</li>,
  },
}

export default function PortableTextRenderer({ value }: { value: any }) {
  return <PortableText value={value} components={components} />
}
