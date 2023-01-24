import React from 'react'
import { PrismicRichText } from '@prismicio/react'
import { PrismicNextImage } from '@prismicio/next'
import { Roboto_Serif } from '@next/font/google'
const serif = Roboto_Serif({ subsets: ['latin'] })
import PrismicButtonLink from '@/components/PrismicButtonLink'
import Heading from '@/components/Heading'
/**
 * @typedef {import("@prismicio/client").Content.HeroSlice} HeroSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<HeroSlice>} HeroProps
 * @param { HeroProps }
 */
const Hero = ({ slice }) => {
  const heroTemplates = {
    heading1: ({ children }) => {
      return (
        <Heading as="h1" size="6xl" className={`hero-h1 mb-4 md:mb-6`}>
          {children}
        </Heading>
      )
    },
    heading2: ({ children }) => {
      return (
        <Heading as="h2" size="6xl" className={`hero-h1 mb-4 md:mb-6`}>
          {children}
        </Heading>
      )
    },
  }
  if (slice.variation === 'default') {
    return (
      <section className="bg-gradient-to-b from-primary via-base-100 to-transparent py-24 px-6 text-center text-black">
        <PrismicRichText
          field={slice.primary.headingtext}
          components={heroTemplates}
        />
        {slice.items.length > 0 && (
          <div className="flex justify-center gap-x-4">
            {slice?.items?.map((item, i) => {
              return <PrismicButtonLink key={item.id + i} {...item} />
            })}
          </div>
        )}
      </section>
    )
  }
  if (slice.variation === 'imageWithCard') {
    return (
      <section>
        <div
          className="hero relative"
          // style={{
          //   backgroundImage: `url(${slice.primary.backgroundimage.url})`,
          // }}
        >
          <PrismicNextImage
            priority={true}
            field={slice.primary.backgroundimage}
            className={`inset-0 h-[500px] object-cover`}
          />
          {/* <div className="hero-overlay"></div> */}
          <div className="hero-content max-w-[1280px] rounded-lg bg-white bg-opacity-70 px-6 text-center text-neutral backdrop-blur-md md:px-12 xl:px-32">
            <div className="">
              <PrismicRichText
                field={slice.primary.headingtext}
                components={heroTemplates}
              />
              {slice.items.length > 0 && (
                <div className="flex justify-center gap-x-4">
                  {slice.items.length > 0 && (
                    <div className="flex justify-center gap-x-4">
                      {slice?.items?.map((item, i) => {
                        return (
                          <PrismicButtonLink
                            key={item.buttonlink.id + i}
                            {...item}
                          />
                        )
                      })}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    )
  }
  if (slice.variation === 'imageHighlightCardOverlay') {
    return (
      <section>
        <div className="px-6 py-12 text-center text-gray-800 md:px-12 lg:text-left">
          <div className="container mx-auto xl:px-32">
            <div className="grid items-center lg:grid-cols-2">
              <div
                className={`mb-12 md:mt-12 lg:mt-0 lg:mb-0 ${
                  slice.primary.imagelocation ? `order-2` : ``
                }`}
              >
                <div
                  className={`block rounded-lg bg-white bg-opacity-50 px-6 py-12 shadow-lg backdrop-blur-md md:px-12 lg:-mr-14 ${
                    slice.primary.imagelocation ? `-ml-14` : ``
                  }`}
                >
                  <PrismicRichText
                    field={slice.primary.headingtext}
                    components={heroTemplates}
                  />
                  {slice.primary.description && (
                    <div className="prose text-left md:prose-lg lg:prose-xl xl:prose-2xl">
                      <PrismicRichText field={slice.primary.description} />
                    </div>
                  )}
                  {slice.items.length > 0 && (
                    <div
                      className={`flex justify-center gap-x-4 ${
                        slice.primary.imagelocation ? `order-1` : ``
                      }`}
                    >
                      {slice.items.length > 0 && (
                        <div className="mt-4 flex justify-center gap-x-4 md:mt-6 lg:mt-8 xl:mt-10">
                          {slice?.items?.map((item, i) => {
                            return (
                              <PrismicButtonLink
                                key={item.buttonlink.id + i}
                                {...item}
                              />
                            )
                          })}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
              <div className="md:mb-12 lg:mb-0">
                <PrismicNextImage
                  field={slice.primary.image}
                  className="w-full rounded-lg shadow-lg"
                  priority={true}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default Hero
