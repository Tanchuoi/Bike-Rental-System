import nodemailer from "nodemailer";
import dotenv from "dotenv";
import path from "path"; // Import path
import { fileURLToPath } from "url"; // Import for getting the file path

dotenv.config();

// Get the directory name from the file URL
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sendSubscriptionMail = async (req, res) => {
  const { to } = req.body;

  // Check if the email is provided
  if (!to) {
    return res.status(400).json({ message: "Recipient email is required" });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: to,
    subject: "RentBike Newsletter Subscription",
    html: `
      <h1>Thank You ${to} for Subscribing 🎉</h1>
      <h3>You will get update on our event</h3>
      <img src="cid:unique@image" style="width: 100%; max-width: 600px; height: auto; border: 0;" />
    `,
    attachments: [
      {
        filename: "thankyou_mail.webp",
        path: path.join(__dirname, "../public/img/thankyou_mail.webp"), // Now __dirname is defined
        cid: "unique@image",
      },
    ],
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email sent", info });
  } catch (error) {
    res.status(500).json({ message: "Error sending email", error });
  }
};

const sendReceiptMail = async (req, res) => {
  const {
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
    totalPrice,
  } = req.body;

  // Check if the email is provided
  if (!to) {
    return res.status(400).json({ message: "Recipient email is required" });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: to,
    subject: subject,
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
            background-color: #f4f4f4;
          }
          .container {
            display: flex;
            background: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          }
          .info {
            flex: 1;
            margin-right: 20px;
          }
          .bike-info {
            flex: 1;
            margin-left: 20px;
          }
          h1 {
            color: #333;
          }
          h3 {
            color: #555;
            font-weight: bold;
          }
          .footer {
            margin-top: 20px;
            font-size: 0.9em;
            color: #888;
          }
          img {
            max-width: 100%;
            height: auto;
            border-radius: 8px;
          }
          .total {
            font-weight: bold;
            font-size: 1.3em;
            margin-top: 10px;
            color: #00A1D8;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="info">
            <h1>Receipt for Your RentBike Rental</h1>
            <h3>City: ${city}</h3>
            <h3>Quantity: ${quantity}</h3>
            <h3>Start Date: ${startDate}</h3>
            <h3>Rental Duration: ${rentalDuration} days</h3>
            <h3>Rental End Date: ${rentalEnd}</h3>
            <h3>Name: ${name}</h3>
            <h3>Phone Number: ${phoneNumber}</h3>
            <h3>Message: ${message}</h3>
            <div class="total">Total Price: $${totalPrice}</div>
          </div>
          <div class="bike-info">
            <h1>Bike Information</h1>
            <h3>Bike Name: ${bikeName}</h3>
            <h3>Bike Price/Day: $${bikePrice}</h3>
            <img src="cid:unique@image" style="width: 100%; width: 200px; height: auto; border: 0;" />
          </div>
        </div>
        <div class="footer">
          <p>Thank you for choosing RentBike!</p>
          <p>We hope you enjoy your ride!</p>
        </div>
      </body>
      </html>
    `,
    attachments: [
      {
        filename: "thankyou_mail.webp",
        path: path.join(__dirname, "../public/img/thankyou_mail.webp"), // Now __dirname is defined
        cid: "unique@image",
      },
    ],
  };

  console.log(mailOptions.html);

  try {
    const info = await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email sent", info });
  } catch (error) {
    res.status(500).json({ message: "Error sending email", error });
  }
};

export { sendSubscriptionMail, sendReceiptMail };
