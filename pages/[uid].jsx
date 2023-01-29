import * as React from 'react'
import Head from 'next/head'
import Layout from '@/components/Layout'
import { PrismicRichText, SliceZone } from '@prismicio/react'
import { createClient } from '../prismicio'
import { components } from '../slices'
import * as prismicH from '@prismicio/helpers'

const Page = ({ footer, navigation, page, siteMetadata }) => {
  const { data } = page
  let sliceTypes = []
  page.data.slices.forEach((slice) => sliceTypes.push(slice.slice_type))
  const formOnPage = sliceTypes.indexOf('newsletter_signup') > 0
  React.useEffect(() => {
    if (formOnPage) {
      const recaptchaScript = document.createElement('script')
      recaptchaScript.src = `https://www.google.com/recaptcha/api.js?render=6LeHxDYkAAAAAPUbSr8asoDuwicuqAa2t8i3s1Md`
      recaptchaScript.async = true
      document.head.appendChild(recaptchaScript)
      return () => {
        // Get all script tags: returns HTMLcollection
        const scripts = document.getElementsByTagName('script')
        // Loop through the HTMLcollection (array-like but not array)
        for (var i = 0; i < scripts.length; i++) {
          // find script whose src value includes "recaptcha/releases"
          // this script is added when main recaptcha script is loaded

          if (
            scripts.item(i).attributes.getNamedItem('src') &&
            scripts
              .item(i)
              .attributes.getNamedItem('src')
              .value.includes('recaptcha/releases')
          ) {
            document.head.removeChild(scripts.item(i)) // remove script from head
          }
        }
        document.head.removeChild(recaptchaScript) // remove main recaptcha script from head
        // remove the recaptcha badge from the bottom right corner
        let badge = document.querySelector('.grecaptcha-badge')
        if (badge) {
          badge.parentElement.remove()
        }
      }
    }
  }, [formOnPage])
  return (
    <Layout navigation={navigation} footer={footer}>
      <Head>
        <title>{`${prismicH.asText(page.data.title)} · ${prismicH.asText(
          siteMetadata.data.sitetitle
        )}`}</title>
        <link
          rel="canonical"
          href={
            page.data.canonicalurl || `https://www.erinkellogg.com${page.url}/`
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
            page.data.canonicalurl || `https://www.erinkellogg.com/${page.url}/`
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
