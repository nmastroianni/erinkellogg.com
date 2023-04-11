import * as React from 'react'
import { PrismicRichText } from '@prismicio/react'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import Heading from '@/components/Heading'

/**
 * @typedef {import("@prismicio/client").Content.NewsletterSignupSlice} NewsletterSignupSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<NewsletterSignupSlice>} NewsletterSignupProps
 * @param { NewsletterSignupProps }
 */
const NewsletterSignup = ({ slice }) => {
  const [isDisabled, setIsDisabled] = React.useState(false)
  const [success, setSuccess] = React.useState(null)
  const [formInteraction, setFormInteraction] = React.useState(false)

  const handleFocus = () => {
    !formInteraction && setFormInteraction(true)
  }

  React.useEffect(() => {
    if (formInteraction) {
      const recaptchaScript = document.createElement('script')
      recaptchaScript.src = `https://www.google.com/recaptcha/api.js?render=6LeHxDYkAAAAAPUbSr8asoDuwicuqAa2t8i3s1Md`
      recaptchaScript.async = true
      recaptchaScript.defer = true
      document.head.appendChild(recaptchaScript)
      return () => {
        // Get all script tags: returns HTMLcollection
        const scripts = document.getElementsByTagName('script')
        // Loop through the HTMLcollection (array-like but not array)
        for (var i = 0; i < scripts.length; i++) {
          // find script whose src value includes "recaptcha/releases"
          // this script is added when main recaptcha script is loaded

          if (
            scripts.item(i).attributes.getNamedItem('src') &&
            scripts
              .item(i)
              .attributes.getNamedItem('src')
              .value.includes('recaptcha/releases')
          ) {
            document.head.removeChild(scripts.item(i)) // remove script from head
          }
        }
        document.head.removeChild(recaptchaScript) // remove main recaptcha script from head
        // remove the recaptcha badge from the bottom right corner
        let badge = document.querySelector('.grecaptcha-badge')
        if (badge) {
          badge.parentElement.remove()
        }
      }
    }
  }, [formInteraction])

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()

  const submitData = async (formData, token) => {
    setIsDisabled(true)
    const formKeys = Object.keys(formData)
    let email
    let firstName
    formKeys.forEach(key => {
      key.indexOf('email') !== -1
        ? (email = formData[key])
        : (firstName = formData[key])
    })
    try {
      const groupIds = slice.items.map(item => item.mailerlitegroupid)
      await axios({
        url: '/api/newsletter',
        method: 'POST',
        data: { email, firstName, groupIds, token },
      }).then(res => {
        if (res.status === 200) {
          reset()
          setSuccess(true)
          setTimeout(() => {
            setSuccess(null)
            setIsDisabled(false)
          }, 3000)
        } else {
          console.log('res.status not 200')
          setSuccess(false)
          reset()
        }
      })
    } catch (err) {
      if (err.response) {
        console.log('server responded with non 2xx code: ', err.response.data)
      } else if (err.request) {
        console.log('no response received: ', err.request)
      } else {
        console.log('Error setting up response: ', err.message)
      }
    }
  }

  const addSubscriber = async formData => {
    window.grecaptcha.ready(() => {
      window.grecaptcha
        .execute('6LeHxDYkAAAAAPUbSr8asoDuwicuqAa2t8i3s1Md', {
          action: 'submit',
        })
        .then(token => {
          submitData(formData, token)
        })
    })
  }
  const {
    primary: {
      buttoncolor,
      buttontext,
      description,
      formlocation,
      placeholdertext,
      title,
    },
    id,
  } = slice
  let formSide
  switch (formlocation) {
    case false:
      formSide = 'order-last'
      break
    default:
      break
  }
  let buttonColor
  switch (buttoncolor) {
    case 'Primary':
      buttonColor = 'btn-primary'
      break
    case 'Secondary':
      buttonColor = 'btn-secondary'
      break
    case 'Accent':
      buttonColor = 'btn-accent'
      break
    case 'Info':
      buttonColor = 'btn-info'
      break
    case 'Neutral':
      buttonColor = 'btn-neutral'
      break
    case 'Success':
      buttonColor = 'btn-success'
      break
    case 'Warning':
      buttonColor = 'btn-warning'
      break
    case 'Error':
      buttonColor = 'btn-error'
      break
    default:
      break
  }
  let inputColor
  switch (buttoncolor) {
    case 'Primary':
      inputColor = 'input-primary'
      break
    case 'Secondary':
      inputColor = 'input-secondary'
      break
    case 'Accent':
      inputColor = 'input-accent'
      break
    case 'Info':
      inputColor = 'input-info'
      break
    case 'Neutral':
      inputColor = 'input-neutral'
      break
    case 'Success':
      inputColor = 'input-success'
      break
    case 'Warning':
      inputColor = 'input-warning'
      break
    case 'Error':
      inputColor = 'input-error'
      break
    default:
      break
  }
  const components = {
    heading2: ({ node, children }) => {
      return (
        <Heading
          as="h2"
          size="3xl"
          className={`my-4 text-center font-semibold md:my-0 md:mb-4 md:text-left`}
        >
          {children}
        </Heading>
      )
    },
    paragraph: ({ node, children }) => {
      return (
        <p className="prose md:prose-lg lg:prose-xl xl:prose-2xl">{children}</p>
      )
    },
  }
  return (
    <section className="mx-auto my-4 grid max-w-screen-lg px-4 md:my-6 md:grid-cols-2 md:gap-x-4 lg:my-8 lg:gap-x-8 xl:my-10">
      <div className={`flex flex-col ${formSide}`}>
        <PrismicRichText field={title} components={components} />
        <PrismicRichText field={description} components={components} />
      </div>
      {success === null && (
        <form
          className="flex flex-col gap-y-4"
          onSubmit={handleSubmit(addSubscriber)}
        >
          <label htmlFor={`name_${id}`}>
            <span className="sr-only">What is your first name?</span>
            <input
              name={`firstName_${id}`}
              type="text"
              placeholder={`Enter your first name here`}
              {...register(`firstName${id}`, {
                required:
                  'Your first name is required. I would like to be able to say hi!',
              })}
              className={`max-w-s input-bordered ${inputColor} input w-full`}
              onFocus={handleFocus}
            />
          </label>
          <label htmlFor={`email_${id}`}>
            <span className="sr-only">What is your email address?</span>
            <input
              name={`email_${id}`}
              type="email"
              placeholder={placeholdertext}
              {...register(`email_${id}`, {
                required: 'Your email address is required.',
              })}
              className={`max-w-s input-bordered ${inputColor} input w-full`}
            />
          </label>
          {errors[`email_${id}`] && (
            <p className="text-error">
              {' '}
              &uarr; {errors[`email_${id}`].message}
            </p>
          )}
          <div>
            <input
              type={'submit'}
              className={`btn w-full ${buttonColor} ${
                isDisabled ? `btn-disabled` : ``
              }`}
              value={buttontext}
            />
            <p className="prose prose-sm prose-a:text-info-content prose-a:no-underline hover:prose-a:underline">
              This site is protected by reCAPTCHA and the{' '}
              <a href="https://policies.google.com/privacy">
                Google Privacy Policy
              </a>{' '}
              and{' '}
              <a href="https://policies.google.com/terms">Terms of Service</a>{' '}
              apply.
            </p>
          </div>
        </form>
      )}
      {success === true && (
        <div className="grid grid-rows-1 place-items-center">
          <p className="prose-xl">I 💗 You! Thank you for subscribing.</p>
        </div>
      )}
      {success === false && (
        <div className="grid grid-rows-1 place-items-center">
          <p className="prose-xl">
            😔 Something went wrong behind the scenes. Please try again later.
          </p>
        </div>
      )}
    </section>
  )
}

export default NewsletterSignup
