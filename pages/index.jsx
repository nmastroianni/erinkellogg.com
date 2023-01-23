import Head from 'next/head'
import { createClient } from '../prismicio'
import { components } from '../slices'
import { SliceZone } from '@prismicio/react'
import Layout from '@/components/Layout'

export default function Home({ footer, page, navigation }) {
  return (
    <Layout navigation={navigation} footer={footer}>
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
  const footer = await client.getSingle('footer')

  return {
    props: {
      navigation,
      page,
      footer,
    },
  }
}
