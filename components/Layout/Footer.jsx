import * as React from 'react'
export const Footer = () => {
  React.useEffect(() => {
    const year = new Date().getFullYear()
    document.querySelector('#copyright-year').innerHTML = year
  }, [])
  return (
    <footer className="footer mt-auto bg-neutral p-4 text-neutral-content">
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
        <ul className="menu menu-vertical md:menu-horizontal">
          <li>
            <a>Item 1</a>
          </li>
          <li>
            <a>Item 2</a>
          </li>
          <li>
            <a>Item 3</a>
          </li>
        </ul>
      </div>
    </footer>
  )
}
export default Footer
