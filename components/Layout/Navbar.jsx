import { PrismicLink } from '@prismicio/react'
import Headroom from 'react-headroom'
import PrismicButtonLink from '../PrismicButtonLink'

export const Navbar = ({ data, serif }) => {
  return (
    <Headroom>
      <div className="navbar relative w-full bg-primary lg:justify-between">
        <div className="flex-none lg:hidden">
          <label htmlFor="my-drawer-3" className="btn-ghost btn-square btn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block h-6 w-6 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </label>
        </div>
        <div
          className={`mx-2 px-2 ${serif.className} tansform absolute left-1/2 -translate-x-1/2 text-xl font-bold lg:relative lg:left-0 lg:translate-x-0 lg:text-2xl `}
        >
          Erin Kellogg
        </div>
        <div className="hidden lg:block">
          {data.links.length > 0 && (
            <ul className="menu rounded-box menu-horizontal">
              {data?.links?.map((item, i) => {
                return (
                  <li key={`desktopnav${item.link.id + i}`}>
                    <PrismicLink field={item.link}>{item.linktext}</PrismicLink>
                  </li>
                )
              })}
            </ul>
          )}
        </div>
        <div className="hidden lg:inline">
          <PrismicButtonLink
            buttonlink={data.desktopbuttonlink}
            buttontext={data.desktopbuttontext}
            buttoncolor={data.desktopbuttoncolor}
          />
        </div>
      </div>
    </Headroom>
  )
}
