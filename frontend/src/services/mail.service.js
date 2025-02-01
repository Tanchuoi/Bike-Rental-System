import axios from 'axios'

const sendMail = async (email) => {
  try {
    const response = await axios.post('/api/sendSubscriptionMail', { to: email })
    return response.data.message
  } catch (error) {
    return 'Failed to send email'
  }
}

const sendReceiptMail = async ({
  to,
  subject,
  city,
  quantity,
  startDate,
  rentalDuration,
  rentalEnd,
  name,
  phoneNumber,
  message,
  bikeName,
  bikePrice,
  totalPrice
}) => {
  try {
    const response = await axios.post('/api/sendReceiptMail', {
      to,
      subject,
      city,
      quantity,
      startDate,
      rentalDuration,
      rentalEnd,
      name,
      phoneNumber,
      message,
      bikeName,
      bikePrice,
      totalPrice
    })
    return response.data.message
  } catch (error) {
    return 'Failed to send email'
  }
}

export { sendMail, sendReceiptMail }
