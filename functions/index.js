/**
 * Copyright 2015 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

const functions = require('firebase-functions');
const nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
// Configure the email transport using the default SMTP transport and a GMail account.
// For other types of transports such as Sendgrid see https://nodemailer.com/transports/
// TODO: Configure the `gmail.email` and `gmail.password` Google Cloud environment variables.
const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;
const mailTransport = nodemailer.createTransport(smtpTransport({
  service: 'gmail',
  auth: {
    user: gmailEmail,
    pass: gmailPassword
  }
}));

// Sends an email confirmation when a user registeres.
exports.sendEmailConfirmation = functions.database.ref('/registrants/{uid}').onWrite((change) => {
  const snapshot = change.after;
  const val = snapshot.val();

  const mailOptions = {
    from: 'Admin. <noreply@projectrescuenigeria.org>',
    to: val.email,
    subject: `Welcome, ${val.firstname} to Project Rescue Nigeria` ,
    html: val.html
  };



  return mailTransport.sendMail(mailOptions)
    .then(() => console.log(`New Registrant confirmation email sent to:`,
        val.email))
    .catch((error) => console.error('There was an error while sending the email:', error));
});

// Sends an email confirmation to Admin to notify he(r).
exports.sendAdminEmailConfirmation = functions.database.ref('/registrants/{uid}').onWrite((change) => {
  const snapshot = change.after;
  const val = snapshot.val();


  const mailOptions = {
      to: "[stanarua@aol.com, nsachaa@gmail.com]",
      subject: "A New Member just signed up!",
      text: `Hey ${val.firstname} just joined the platform you can call. You can manage the registrant by logging in into the app or just send a direct mail to ${val.email}`

  };


  return mailTransport.sendMail(mailOptions)
    .then(() => console.log(`Confirmation email sent to: stanarua@aol.com`,
        val.email))
    .catch((error) => console.error('There was an error while sending the email:', error));
});