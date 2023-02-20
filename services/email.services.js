const  nodeoutlook = require('nodejs-nodemailer-outlook')
function sendEmail(dest,message){

try{

    nodeoutlook.sendEmail({
        auth: {
            user: process.env.SENDEREMAIL,
            pass: process.env.SENDERPASSWORD
        },
        from: process.env.SENDEREMAIL,
        to: dest,
        subject: 'Hey you, awesome!',
        html: message,
        text: 'This is text version!',

        onError: (e) => console.log(e),
        onSuccess: (i) => console.log(i)
    } );

}catch(e){

// res.status(500).json({message:'email error'})
console.log(`catch error ${e}`);

}

}





// const sgMail = require('@sendgrid/mail');
// function sendEmail(dest,message){

//     try{
    
//         sgMail.setApiKey(process.env.SENDGRID_API_KEY);
//         const msg = {
//           to: dest,
//           from: 'm07med.abdelrazek@gmail.com', // Use the email address or domain you verified above
//           subject: 'Sending with Twilio SendGrid is Fun',
//           text: 'and easy to do anywhere, even with Node.js',
//           html: message,
//         };

//         //ES8
//         (async () => {
//           try {
//             await sgMail.send(msg);
//           } catch (error) {
//             console.error(error);
        
//             if (error.response) {
//               console.error(error.response.body)
//             }
//           }
//         })();
    
//     }catch(e){
    
//     // res.status(500).json({message:'email error'})
//     console.log(`catch error ${e}`);
    
//     }
    
//     }


module.exports=sendEmail