/* Importing the Roboto_Serif and Roboto_Flex from the google font file. */
import { Roboto_Serif, Roboto_Flex } from '@next/font/google'
import Footer from './Footer'
const roboto_serif = Roboto_Serif({ subsets: ['latin'] })
const roboto_flex = Roboto_Flex({ subsets: ['latin'] })

import { PrismicLink } from '@prismicio/react'
import { Navbar } from './Navbar'

const Layout = ({ children, footer, navigation }) => {
  return (
    <div className="drawer">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className={`drawer-content flex flex-col ${roboto_flex.className}`}>
        <Navbar serif={roboto_serif} data={navigation.data} />
        <main>{children}</main>
        <Footer {...footer} />
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
        {navigation?.data?.links?.length > 0 && (
          <ul className="menu w-80 bg-base-100 p-4">
            {navigation?.data?.links?.map((item, i) => {
              return (
                <li key={item.link.id + i}>
                  <PrismicLink field={item.link}>{item.linktext}</PrismicLink>
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </div>
  )
}
export default Layout
