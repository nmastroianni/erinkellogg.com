import React from 'react'
import { PrismicRichText } from '@prismicio/react'

/**
 * @typedef {import("@prismicio/client").Content.ContentSlice} ContentSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<ContentSlice>} ContentProps
 * @param { ContentProps }
 */
const Content = ({ slice }) => (
  <section>
    <div className="prose my-4 mx-auto px-3 md:my-6 md:px-6 md:prose-lg lg:my-8 lg:px-0 lg:prose-xl xl:my-10 xl:prose-2xl ">
      <PrismicRichText field={slice.primary.content} />
    </div>
  </section>
)

export default Content
