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

console.log(`catch error ${e}`);

}

}
module.exports=sendEmail