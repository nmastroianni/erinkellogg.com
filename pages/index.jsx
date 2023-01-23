import Head from 'next/head'
import Image from 'next/image'
import { createClient } from '../prismicio'
import { components } from '../slices'
import { SliceZone } from '@prismicio/react'
import Layout from '@/components/Layout'

export default function Home({ page, navigation }) {
  return (
    <Layout navigation={navigation}>
      <div className="grid grid-cols-1 gap-y-4 md:gap-y-0">
        <SliceZone slices={page.data.slices} components={components} />
      </div>
    </Layout>
  )
}
export async function getStaticProps({ previewData }) {
  const client = createClient({ previewData })
  const page = await client.getSingle('homepage')
  const navigation = await client.getSingle('mainmenu')

  return {
    props: {
      navigation,
      page,
    },
  }
}
