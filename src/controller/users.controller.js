import Mail from "nodemailer/lib/mailer/index.js"
import usersModel from "../models/users.model.js"
import { loggerError } from "../utils/logger.js"
import { deleteMail } from "./mail.controller.js"

export const postRegisterUser = async(req,res)=>{
    try{
        return res.status(200).send({mensaje: `Usuario creado`})
    }catch(error){
            loggerError(error)
            res.status(500).send({mensaje:`error al crear usuario: ${error}`})
    }
}

export const getUsers = async(req,res) => {
    try{
        //devuelve lista de usuarios: nombre, correo, rol de cuenta
        let users = await usersModel.find()
        let  getUsers = users.map(user =>{
             let {first_name, last_name, email, rol} = user
             let nombre_completo = `${first_name} ${last_name}`
             return  {nombre_completo, email, rol}
        })
        console.log(getUsers)
        //res.status(200).send({ resultado: "Ok", message: product });
        res.status(200).send({getUsers})
        
    }
    catch(error){

    }
}

export const deleteInactiveUsers = async(req,res) => {
    
        /*const thirtyMinutesAgo = new Date();
        thirtyMinutesAgo.setDate(thirtyMinutesAgo.getMinutes() - 30)
        */
        const now = new Date()
        const thirtyMinutes = 30 * 60 * 1000
        const thirtyMinutesAgo = now - thirtyMinutes
        
        const users =  await usersModel.find({ lastConnection: {$lt: thirtyMinutesAgo}})
        if (users.length === 0){
          return res.status(404).send("No se encontraron usuarios") 
        }
        console.log(users)
        const emails = users.map( user => user.email)
        console.log(emails)
        for ( let email of emails ) {
            deleteMail(email)
        }
        users.splice(0)
        users.save()
        res.status(200).send("Usuarios eliminados")
}