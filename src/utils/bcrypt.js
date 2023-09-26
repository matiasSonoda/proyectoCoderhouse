import "dotenv/config"
import bcrypt from "bcrypt"

export const createHash=(password)=>bcrypt.hashSync(password,bcrypt.genSaltSync(parseInt(process.env.SALT)))

console.log(createHash("coderhouse"))