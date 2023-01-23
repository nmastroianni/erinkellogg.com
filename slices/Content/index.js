import React from 'react'
import { PrismicRichText } from '@prismicio/react'

/**
 * @typedef {import("@prismicio/client").Content.ContentSlice} ContentSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<ContentSlice>} ContentProps
 * @param { ContentProps }
 */
const Content = ({ slice }) => (
  <section>
    <div className="my-4 px-3 md:my-6 md:px-6 lg:my-8 lg:px-0 xl:my-10">
      <PrismicRichText field={slice.primary.content} />
    </div>
  </section>
)

export default Content
