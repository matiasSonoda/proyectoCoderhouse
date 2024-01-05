import nodemailer from "nodemailer";

let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port:465,
    secure: true,
    auth: {
        user: "pepedonpepe28@gmail.com",
        pass: process.env.PASSWORD_EMAIL,
        authMethod: "LOGIN"
    }
}) 

export const deleteMail = async (req)=>{
    const resultado = await transporter.sendMail({
        from: "TEST Pepe pepedonpepe28@gmail.com",
        to: req ,
        subject:"Saludo su cuenta que se va",
        html:
            `
            <div>
                 <h1> Su cuenta a sido eliminada por inactividad </h1>
            </div>
            `
    })
    console.log(resultado)
    
}