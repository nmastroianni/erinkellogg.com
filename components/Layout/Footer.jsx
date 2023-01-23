import { PrismicLink } from '@prismicio/react'
import * as React from 'react'
export const Footer = ({ data: { links } }) => {
  React.useEffect(() => {
    const year = new Date().getFullYear()
    document.querySelector('#copyright-year').innerHTML = year
  }, [])
  return (
    <footer className="footer mt-auto bg-neutral p-4 text-primary">
      <div className="self-center justify-self-center md:justify-self-start">
        <p>
          Copyright ©{' '}
          <span id="copyright-year">
            sit tight while we figure out what year it is
          </span>{' '}
          - All right reserved
        </p>
      </div>
      <div className="gap-4 justify-self-center md:place-self-center md:justify-self-end">
        {links?.length > 0 && (
          <ul className="menu menu-vertical md:menu-horizontal">
            {links.map((link, i) => {
              return (
                <li key={link.link.id + i} className="rounded-lg">
                  <PrismicLink
                    field={link.link}
                    className="focus:outline-none focus:ring-4 focus:ring-primary"
                  >
                    {link.linktext}
                  </PrismicLink>
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </footer>
  )
}
export default Footer
