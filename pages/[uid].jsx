import Layout from '@/components/Layout'
import { PrismicRichText, SliceZone } from '@prismicio/react'
import { createClient } from '../prismicio'
import { components } from '../slices'
import * as prismicH from '@prismicio/helpers'

const Page = ({ footer, navigation, page }) => {
  const { data } = page
  return (
    <Layout navigation={navigation} footer={footer}>
      {!data.hidepagetitle && (
        <header className="bg-base-100 py-4 text-center md:py-6 lg:py-8 xl:py-10">
          <PrismicRichText field={data.title} />
        </header>
      )}
      {data.slices.length > 0 && (
        <SliceZone slices={data.slices} components={components} />
      )}
    </Layout>
  )
}
export default Page
export async function getStaticProps({ params, previewData }) {
  const client = createClient({ previewData })
  const page = await client.getByUID('page', params.uid)
  const navigation = await client.getSingle('mainmenu')
  const footer = await client.getSingle('footer')
  return {
    props: {
      page,
      navigation,
      footer,
    },
  }
}

export async function getStaticPaths() {
  const client = createClient()
  const pages = await client.getAllByType('page')
  return {
    paths: pages.map((page) => prismicH.asLink(page)),
    fallback: false,
  }
}
