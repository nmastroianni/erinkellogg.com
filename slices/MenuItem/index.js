import React from 'react'
import { PrismicRichText, PrismicLink } from '@prismicio/react'

/**
 * @typedef {import("@prismicio/client").Content.MenuItemSlice} MenuItemSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<MenuItemSlice>} MenuItemProps
 * @param { MenuItemProps }
 */
const MenuItem = ({ slice }) => (
  <li>
    <PrismicLink field={slice.primary.link} className="">
      {slice.primary.linktext}
    </PrismicLink>
  </li>
)

export default MenuItem
