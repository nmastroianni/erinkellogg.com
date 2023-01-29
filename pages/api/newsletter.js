import axios from 'axios'

/**
 * It takes an email address, an API key, and an array of lists, and adds the email address to the
 * lists
 * @param address - The email address of the subscriber
 * @param key - Your MailerLite API key
 * @param lists - An array of list IDs that you want to add the subscriber to.
 * @returns An object with a successful key and a message key.
 */
const addSubscriber = async (address, firstName, key, lists) => {
  const result = await (async () => {
    const baseUrl = 'https://connect.mailerlite.com'
    const endPoint = '/api/subscribers'
    const url = baseUrl + endPoint
    try {
      const response = await axios.post(
        url,
        {
          email: address,
          groups: lists,
          fields: {
            name: firstName,
          },
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${key}`,
          },
        }
      )
      return { successful: true, message: response }
    } catch (err) {
      console.log(err)
    }
  })()
  return result
}

/**
 * It takes a reCAPTCHA token, sends it to Google's reCAPTCHA server, and returns the result of the
 * validation
 * @returns An object with two properties: successful and message.
 */
const recaptchaValidation = async (token) => {
  const result = await (async () => {
    try {
      const response = await axios({
        url: 'https://www.google.com/recaptcha/api/siteverify',
        method: 'POST',
        params: {
          secret: process.env.RECAPTCHA_SECRET_KEY,
          response: token,
        },
      })
      return { successful: true, message: response.data.score }
    } catch (error) {
      let message
      if (error.response) {
        message = `reCAPTCHA server responded with non 2xx code: ${error.response.data}`
      } else if (error.request) {
        message = `No reCAPTCHA response received: ${error.request}`
      } else {
        message = `Error setting up reCAPTCHA response: ${error.message}`
      }
      return { successful: false, message }
    }
  })()
  return result
}

/**
 * We're using the Google Recaptcha API to check if the user is a bot. If they're not a bot, we're
 * adding them to our MailerLite list
 * @param req - The request object
 * @param res - the response object
 * @returns an object with a statusCode and a body.
 */
export default async function handler(req, res) {
  const {
    body: { email, firstName, groupIds, token },
  } = req
  if (req.method !== 'POST') {
    res.status(405).send('Method not allowed')
  }
  // Check if Google thinks this interaction is suspicious
  const recaptchaResult = await recaptchaValidation(token)
  if (!recaptchaResult.successful) {
    // this is sent if the recaptcha was not successful
    // res.status(400).send(recaptchaValidationResult.message);
    return {
      statusCode: 400,
      body: recaptchaResult.message,
    }
  } else {
    // Make sure the value returned is numeric
    const googleCaptchaScore = Number(recaptchaResult.message)
    // Arbitrarily setting the threshold of suspicion @ 0.7 adjust as needed
    if (googleCaptchaScore > 0.7) {
      const API_KEY = process.env.MAILERLITE_API_KEY
      const mailerLiteResult = await addSubscriber(
        email,
        firstName,
        API_KEY,
        groupIds
      )
      if (mailerLiteResult.successful) {
        res.status(200).send('Subscriber Added')
      } else {
        res.status(400).send('Error with MailerLite integration')
      }
    } else {
      res.status(400).send('Action not taken. Possible bot detected')
    }
  }
}
