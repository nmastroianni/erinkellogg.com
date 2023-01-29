import React from 'react'
import { PrismicRichText } from '@prismicio/react'
import { PrismicNextImage } from '@prismicio/next'
import PrismicButtonLink from '@/components/PrismicButtonLink'
import Heading from '@/components/Heading'
import Image from 'next/image'
/**
 * @typedef {import("@prismicio/client").Content.HeroSlice} HeroSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<HeroSlice>} HeroProps
 * @param { HeroProps }
 */
const Hero = ({ index, slice }) => {
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
      <section className="bg-gradient-to-b from-primary via-base-100 to-transparent py-8 px-6 text-center text-black md:py-16 lg:py-24">
        <PrismicRichText
          field={slice.primary.headingtext}
          components={heroTemplates}
        />
        {slice.items.length > 0 && (
          <div className="flex justify-center gap-x-4">
            {slice?.items?.map((item, i) => {
              return <PrismicButtonLink key={slice.id + i} {...item} />
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
          className="relative h-[500px] overflow-hidden bg-cover bg-no-repeat"
          // style={{
          //   backgroundPosition: '50%',
          //   backgroundImage: `url(${slice.primary.backgroundimage.url})`,
          //   height: '500px',
          // }}
        >
          <Image
            src={slice.primary.backgroundimage.url}
            alt={slice.primary.backgroundimage.alt}
            fill
            className="object-cover"
            priority={index === 0 ? true : false}
          />
        </div>
        <div className="mx-auto max-w-[1280px] px-6 md:px-12 xl:px-32">
          <div className="text-center text-black">
            <div className="-mt-[180px] block rounded-lg bg-white bg-opacity-70 px-6 py-12 backdrop-blur-md md:py-16 md:px-12">
              <PrismicRichText
                field={slice.primary.headingtext}
                components={heroTemplates}
              />
              {slice.items.length > 0 && (
                <div className="flex justify-center gap-x-4">
                  {slice?.items?.map((item, i) => {
                    return <PrismicButtonLink key={slice.id + i} {...item} />
                  })}
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
                  className={`block rounded-lg bg-white bg-opacity-50 px-6 py-12 shadow-lg backdrop-blur-md md:px-12 lg:-mr-8 ${
                    slice.primary.imagelocation ? `-ml-8` : ``
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
                              <PrismicButtonLink key={slice.id + i} {...item} />
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
                  priority={index === 0 ? true : false}
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
