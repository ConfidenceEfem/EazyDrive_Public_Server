const nodemailer = require('nodemailer');
const { google } = require('googleapis');
require('dotenv').config();

const oAuthPass = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URL
  );
  
  oAuthPass.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

  const verificationEmail = async (email, otp) => {
    try {
      const createToken = await oAuthPass.getAccessToken();
  
      const transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          type: 'OAuth2',
          user: 'smartdevopss@gmail.com',
          clientId: process.env.CLIENT_ID,
          clientSecret: process.env.CLIENT_SECRET,
          refresh_token: process.env.REFRESH_TOKEN,
          accessToken: createToken.token,
        },
      });
  
      const mailOptions = {
        from: `Eazy Drive <"eazydrive@gmail.com">`,
        to: email,
        subject: `Verify your Email with Eazy Drive`,
        html: `<h3>Hello,</h3></br><h4>Thanks for Creating an account with Eazy Drive. Copy the OTP below for verification process. The OTP would expire in 5 minutes</h4><h1>${otp}</h1>`,
      };
  
      const result = transport.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.log(err.message);
        } else {
          console.log(info.response);
        }
      });
  
      return result;
    } catch (error) {
      return error;
    }
  };

  const CarHiredMail = async (user,hiring) => {
    try {
      const createToken = await oAuthPass.getAccessToken();
  
      const transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          type: 'OAuth2',
          user: 'smartdevopss@gmail.com',
          clientId: process.env.CLIENT_ID,
          clientSecret: process.env.CLIENT_SECRET,
          refresh_token: process.env.REFRESH_TOKEN,
          accessToken: createToken.token,
        },
      });
  
      const mailOptions = {
        from: `Eazy Drive <"eazydrive@gmail.com">`,
        to: user.email,
        subject: `Your Car has been Booked on Eazy Drive`,
        html: `<h4>Hello ${user.fullName},</h4>
        </br>
        <p>Your car has been booked for the ${hiring.date} by ${hiring.time}. Please go to Eazy Drive dashboard to complete this process</p>
        <h5>Thank you!</h5>`,
      };
  
      const result = transport.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.log(err.message);
        } else {
          console.log(info.response);
        }
      });
  
      return result;
    } catch (error) {
      return error;
    }
  };

  const AcceptCarHiredMail = async (user,hiring,carDetails,carOwner) => {
    try {
      const createToken = await oAuthPass.getAccessToken();
  
      const transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          type: 'OAuth2',
          user: 'smartdevopss@gmail.com',
          clientId: process.env.CLIENT_ID,
          clientSecret: process.env.CLIENT_SECRET,
          refresh_token: process.env.REFRESH_TOKEN,
          accessToken: createToken.token,
        },
      });
  
      const mailOptions = {
        from: `Eazy Drive <"eazydrive@gmail.com">`,
        to: user.email,
        subject: `Your Car Booking on Eazy Drive has been Confirmed`,
        html: `<h4>Hello ${user.fullName},</h4>
        </br>
        <p>Your car booking on Eazy Drive has been confirmed. The car would be available at ${carDetails.pickUpLocation} by ${hiring.time}. You can reach out to the car owner +234${carOwner.telephone}</p>
        <p>You are expected to pay 70% of the payment before the car would be handed over to you</p>
        <h5>Thank you!</h5>`,
      };
  
      const result = transport.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.log(err.message);
        } else {
          console.log(info.response);
        }
      });
  
      return result;
    } catch (error) {
      return error;
    }
  };
  const DeclineCarHiredMail = async (user) => {
    try {
      const createToken = await oAuthPass.getAccessToken();
  
      const transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          type: 'OAuth2',
          user: 'smartdevopss@gmail.com',
          clientId: process.env.CLIENT_ID,
          clientSecret: process.env.CLIENT_SECRET,
          refresh_token: process.env.REFRESH_TOKEN,
          accessToken: createToken.token,
        },
      });
  
      const mailOptions = {
        from: `Eazy Drive <"eazydrive@gmail.com">`,
        to: user.email,
        subject: `Your Car Booking on Eazy Drive has been Declined`,
        html: `<h4>Hello ${user.fullName},</h4>
        </br>
        <p> Your car booking on Eazy Drive has been declined by the Car Owner. We are sorry for the inconveniences we might have caused you. You can do well to 
        check other cars available at your city.</p>
        <p>Eazy Drive team is always ready and available to provide you the best transport you need for your daily activities</p>
        <h5>Thank you!</h5>`,
      };
  
      const result = transport.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.log(err.message);
        } else {
          console.log(info.response);
        }
      });
  
      return result;
    } catch (error) {
      return error;
    }
  };

  module.exports = {
    verificationEmail,
    CarHiredMail,
    AcceptCarHiredMail,
    DeclineCarHiredMail,
  }