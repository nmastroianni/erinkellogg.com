import Head from 'next/head'
import Layout from '@/components/Layout'
import { PrismicRichText, SliceZone } from '@prismicio/react'
import { createClient } from '../prismicio'
import { components } from '../slices'
import * as prismicH from '@prismicio/helpers'

const Page = ({ footer, navigation, page, siteMetadata }) => {
  const { data } = page
  return (
    <Layout navigation={navigation} footer={footer}>
      <Head>
        <title>{`${prismicH.asText(page.data.title)} · ${prismicH.asText(
          siteMetadata.data.sitetitle
        )}`}</title>
        <link
          rel="canonical"
          href={
            page.data.canonicalurl || `https://www.erinkellogg.com${page.url}`
          }
        />
        {page.data.metadescription ||
          (siteMetadata.data.sitemetadescription && (
            <meta
              name="description"
              content={
                page.data.metadescription ||
                siteMetadata.data.sitemetadescription
              }
            />
          ))}
        {page.data.metadescription ||
          (siteMetadata.data.sitemetadescription && (
            <meta
              property="og:description"
              content={
                page.data.metadescription ||
                siteMetadata.data.sitemetadescription
              }
            />
          ))}
        <meta
          property="og:url"
          content={
            page.data.canonicalurl || `https://www.erinkellogg.com/${page.url}`
          }
        />
        <meta property="og:type" content="website" />

        {page.data.metaimage.url ||
          (siteMetadata.data.sitemetaimage.url && (
            <meta
              property="og:image"
              content={
                page.data.metaimage.url || siteMetadata.data.sitemetaimage.url
              }
            />
          ))}

        <meta property="twitter:card" content="summary" />

        {page.data.metaimage.url ||
          (siteMetadata.data.sitemetaimage.url && (
            <meta
              property="twitter:image"
              content={
                page.data.metaimage.url || siteMetadata.data.sitemetaimage.url
              }
            />
          ))}
      </Head>
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
  const siteMetadata = await client.getSingle('sitemetadata')
  const navigation = await client.getSingle('mainmenu')
  const footer = await client.getSingle('footer')
  return {
    props: {
      page,
      navigation,
      footer,
      siteMetadata,
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
