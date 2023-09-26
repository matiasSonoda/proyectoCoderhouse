import "dotenv/config"
import bcrypt from "bcrypt"

export const createHash=(password)=>bcrypt.hashSync(password,bcrypt.genSaltSync(parseInt(process.env.SALT)))

const hashPassowrd=(createHash("coderhouse"))
console.log(hashPassowrd)
export const validatePassword=(passwordSend,passwordBDD)=>bcrypt.compareSync(passwordSend,passwordBDD)

console.log (validatePassword("coderhouse",hashPassowrd))