import { PrismicLink } from '@prismicio/react'
const PrismicButtonLink = ({
  buttoncolor,
  buttonlink,
  buttontext,
  className,
}) => {
  return (
    <PrismicLink
      field={buttonlink}
      className={`${
        buttoncolor === 'Primary'
          ? `btn-primary `
          : buttoncolor === 'Secondary'
          ? `btn-secondary hover:text-base-100`
          : buttoncolor === 'Accent'
          ? `btn-accent hover:text-base-100`
          : buttoncolor === 'Neutral'
          ? `btn-neutral hover:text-base-100`
          : buttoncolor === 'Info'
          ? `btn-info`
          : buttoncolor === 'Success'
          ? `btn-success hover:text-neutral`
          : buttoncolor === 'Warning'
          ? `btn-warning`
          : buttoncolor === 'Error'
          ? `btn-error`
          : ``
      } btn ${className}`}
    >
      {buttontext}
    </PrismicLink>
  )
}
export default PrismicButtonLink
