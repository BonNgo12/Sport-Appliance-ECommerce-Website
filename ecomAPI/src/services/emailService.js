require('dotenv').config()
const nodemailer = require("nodemailer");

let sendSimpleEmail = async (dataSend) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_APP,
            pass: process.env.EMAIL_APP_PASSWORD,
        },
    });
    if (dataSend.type === 'verifyEmail') {
        let info = await transporter.sendMail({
            from: '"BiNgo2706 👻" <dotanthanhvlog@gmail.com>', // sender address
            to: dataSend.email, // list of receivers
            subject: "Email verification | AEUITSHOP", // Subject line
            html: getBodyHTMLEmailVerify(dataSend)
        });
    }
    if (dataSend.type === 'forgotpassword') {
        let info = await transporter.sendMail({
            from: '"BiNgo2706 👻" <dotanthanhvlog@gmail.com>', // sender address
            to: dataSend.email, // list of receivers
            subject: "Password reset confirmation | AEUITSHOP", // Subject line
            html: getBodyHTMLEmailForgotPassword(dataSend)
        });
    }
}
let getBodyHTMLEmailVerify = (dataSend) => {
    let fullname = `${dataSend.firstName} ${dataSend.lastName}`
    let result = `<h3>Hi ${fullname}!</h3>
        <p>You received this email because you requested email verification.!</p>
        <p>Please click on the link below to confirm and complete the email verification process.</p>
        <div>
            <a href="${dataSend.redirectLink}" target=""_blank>Click here</a>
        </div>
        <div>Thank you !!!</div>
    `

    return result;
}
let getBodyHTMLEmailForgotPassword = (dataSend) => {
    let fullname = `${dataSend.firstName} ${dataSend.lastName}`
    let result = `<h3>Hi ${fullname}!</h3>
        <p>You received this email because you requested a password reset!</p>
        <p>Please click on the link below to confirm the password reset and recover your password.</p>
        <div>
            <a href="${dataSend.redirectLink}" target=""_blank>Click here</a>
        </div>
        <div>Thank you !!!</div>
    `

    return result;
}
// let sendAttachment = async (dataSend) => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             let transporter = nodemailer.createTransport({
//                 host: "smtp.gmail.com",
//                 port: 587,
//                 secure: false, // true for 465, false for other ports
//                 auth: {
//                     user: process.env.EMAIL_APP,
//                     pass: process.env.EMAIL_APP_PASSWORD,
//                 },
//             });

//             let info = await transporter.sendMail({
//                 from: '"BiNgo2706 👻" <dotanthanhvlog@gmail.com>', // sender address
//                 to: dataSend.email, // list of receivers
//                 subject: "Thông tin đặt lịch khám bệnh", // Subject line
//                 html: getBodyHTMLEmailRemedy(dataSend),
//                 attachments: [
//                     {
//                         filename: `remedy-${dataSend.patientId}-${new Date().getTime()}.${dataSend.filename}`,
//                         content: dataSend.imgBase64.split("base64,")[1],
//                         encoding: 'base64'
//                     }
//                 ]
//             });
//             resolve()
//         } catch (error) {
//             reject(error)
//         }
//     })
// }
module.exports = {
    sendSimpleEmail: sendSimpleEmail,

}