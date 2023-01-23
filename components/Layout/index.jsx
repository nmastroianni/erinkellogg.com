/* Importing the Roboto_Serif and Roboto_Flex from the google font file. */
import { Roboto_Serif, Roboto_Flex } from '@next/font/google'
import Footer from './Footer'
const roboto_serif = Roboto_Serif({ subsets: ['latin'] })
const roboto_flex = Roboto_Flex({ subsets: ['latin'] })

import { Navbar } from './Navbar'
import Consent from './Consent'

const Layout = ({ children, footer, navigation }) => {
  return (
    <div className="relative">
      <a
        href="#main-content"
        className=" btn-warning btn fixed top-12 -left-[320px] z-10 transform opacity-50 focus:translate-x-[380px] focus:opacity-100 "
      >
        Press Enter to Skip to Main Content
      </a>
      <div className={`flex min-h-screen flex-col ${roboto_flex.className}`}>
        <Navbar serif={roboto_serif} data={navigation.data} />
        <main id="main-content">{children}</main>
        <Footer {...footer} />
        <Consent />
      </div>
    </div>
  )
}
export default Layout
