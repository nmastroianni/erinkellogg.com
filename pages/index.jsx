import * as React from 'react'
import Head from 'next/head'
import { createClient } from '../prismicio'
import { components } from '../slices'
import * as prismicH from '@prismicio/helpers'
import { SliceZone } from '@prismicio/react'
import Layout from '@/components/Layout'

export default function Home({ footer, page, navigation, siteMetadata }) {
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
            siteMetadata.data.sitecanonicalurl || `https://www.erinkellogg.com/`
          }
        />
        {page.data.metadescription ? (
          <meta name="description" content={page.data.metadescription} />
        ) : (
          siteMetadata.data.sitemetadescription && (
            <meta
              name="description"
              content={siteMetadata.data.sitemetadescription}
            />
          )
        )}
        {page.data.metadescription ? (
          <meta property="og:description" content={page.data.metadescription} />
        ) : (
          siteMetadata.data.sitemetadescription && (
            <meta
              property="og:description"
              content={siteMetadata.data.sitemetadescription}
            />
          )
        )}
        <meta
          property="og:url"
          content={
            siteMetadata.data.sitecanonicalurl || `https://www.erinkellogg.com/`
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
      <div className="grid grid-cols-1 gap-y-4 md:gap-y-0">
        <SliceZone
          slices={page.data.slices}
          components={components}
          myProp="foo"
        />
      </div>
    </Layout>
  )
}
export async function getStaticProps({ previewData }) {
  const client = createClient({ previewData })
  const siteMetadata = await client.getSingle('sitemetadata')
  const page = await client.getSingle('homepage')
  const navigation = await client.getSingle('mainmenu')
  const footer = await client.getSingle('footer')

  return {
    props: {
      navigation,
      page,
      footer,
      siteMetadata,
    },
  }
}
