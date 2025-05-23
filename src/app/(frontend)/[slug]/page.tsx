import type { Metadata } from 'next'

import configPromise from '@payload-config'
import { getPayload, type RequiredDataFromCollectionSlug } from 'payload'
import React, { cache } from 'react'
import PageClient from './page.client'

import { RenderBlocks } from '@/blocks/RenderBlocks'

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function Page({ params: paramsPromse }: Args) {
  const { slug = 'home' } = await paramsPromse
  const url = '/' + slug

  let page: RequiredDataFromCollectionSlug<'pages'> | null = null

  page = await queryPageBySlug({ slug })

  /* 
  if (!page && slug === 'home') {
    page = homeStatic
  }
  */

  if (!page) {
    console.error('Page not found:', slug)
    // Redirect to 404 page
  }

  const { layout } = page

  return (
    <>
      <PageClient />
      <RenderBlocks blocks={layout} />
    </>
  )
}

const queryPageBySlug = cache(async ({ slug }: { slug: string }) => {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'pages',
    //draft,
    limit: 1,
    pagination: false,
    //overrideAccess: draft,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})
