// Use at least Nodemailer v4.1.0
const nodemailer = require('nodemailer');

// Generate SMTP service account from ethereal.email
function sendMail(draw) {
    nodemailer.createTestAccount((err, account) => {
        if (err) {
            console.error('Failed to create a testing account. ' + err.message);
            return process.exit(1);
        }

        console.log('Credentials obtained, sending message...');
        
        // Create a SMTP transporter object
        const transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: 'adriana.kuphal65@ethereal.email',
                pass: 'DkqK91HTNdRDmRTZa8'
            }
        });

        draw.forEach(d => {
            // Message object
            let message = {
                from: 'Ethereal  <adriana.kuphal65@ethereal.email>',
                to: `${d.name} <${d.email}>`,
                subject: 'Amigo Secreto',
                text: `Seu amigo secreto é: ${d.gifted_name}\nEmail: ${d.gifted_email}`,
                html: `<p><b>Seu amigo secreto é:</b> ${d.gifted_name}<br></br><b>Email:</b> ${d.gifted_email}</p>`
            };

            transporter.sendMail(message, (err, info) => {
                if (err) {
                    console.log('Error occurred. ' + err.message);
                    return process.exit(1);
                }

                console.log('Message sent: %s', info.messageId);
                // Preview only available when sending through an Ethereal account
                console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
            });
        });


    });
}

module.exports = sendMail