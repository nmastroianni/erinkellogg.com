import { PrismicLink } from '@prismicio/react'
import Link from 'next/link'
import Headroom from 'react-headroom'
import PrismicButtonLink from '../PrismicButtonLink'
import { components } from '../../slices'
import { SliceZone } from '@prismicio/react'

export const Navbar = ({ data, serif }) => {
  const { slices } = data
  return (
    <Headroom>
      <div className="navbar bg-primary">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn-ghost btn lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu rounded-box menu-compact mt-3 w-52 bg-base-100 p-2 shadow"
            >
              <SliceZone slices={slices} components={components} />
            </ul>
          </div>
          <Link
            href="/"
            className="btn-ghost btn text-xl normal-case focus:outline-none focus:ring-4 focus:ring-secondary"
          >
            <h1
              className={`mx-2 px-2 ${serif.className} tansform absolute left-1/2 -translate-x-1/2 text-lg font-bold lg:relative lg:left-0 lg:translate-x-0 lg:text-2xl `}
            >
              Erin Kellogg
            </h1>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <SliceZone slices={slices} components={components} />
          </ul>
        </div>
        <div className="navbar-end">
          <div className="hidden lg:inline-flex">
            <PrismicButtonLink
              buttonlink={data.desktopbuttonlink}
              buttontext={data.desktopbuttontext}
              buttoncolor={data.desktopbuttoncolor}
            />
          </div>
        </div>
      </div>
      {/* <div className="navbar relative w-full bg-primary lg:justify-between">
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
        <h1
          className={`mx-2 px-2 ${serif.className} tansform absolute left-1/2 -translate-x-1/2 text-xl font-bold lg:relative lg:left-0 lg:translate-x-0 lg:text-2xl `}
        >
          <Link href="/">Erin Kellogg</Link>
        </h1>
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
      </div> */}
    </Headroom>
  )
}
