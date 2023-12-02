import { logger } from "../utils/logger.js"


export const getFatal = (req,res) => {
    const message =  logger.fatal(`[FATAL] soy logger fata - Date ${new Date().toLocaleString()}`)
} 

export const getError = (req,res) => {
    const message =  logger.error(`[ERROR] soy logger error  - Date ${new Date().toLocaleString()}`)
    return   
}

export const getWarning = (req,res) => {
    const message =  logger.warning(`[ERROR] soy logger warning  - Date ${new Date().toLocaleString()}`)
}

export const getInfo = (req,res) => {
    const message =  logger.info(`[INFO] soy logger info - Date ${new Date().toLocaleString()}`)

}

export const getDebug = (req, res) => {
    const message =  logger.debug(`[DEBUG] soy logger debug - Date ${new Date().toLocaleString()}`)
}
