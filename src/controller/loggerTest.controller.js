import { logger } from "../utils/logger.js"


export const getFatal = async(req,res) => {
    const fatal = await logger.fatal(`[FATAL] soy logger fatal ${logger.fatal.message} - Date ${new Date().toLocaleString()}`)
    res.status(500).send(fatal.message)
} 

export const getError = async(req,res) => {
    const error = await logger.error(`[ERROR] soy logger error ${logger.error.message} - Date ${new Date().toLocaleString()}`)
    res.status(400).send(error.message)
}

export const getWarning = async(req,res) => {
    const warning = await logger.warning(`[ERROR] soy logger warning ${logger.warning.message} - Date ${new Date().toLocaleString()}`)
    res.status(400).send(warning.message)
}

export const getInfo = async(req,res) => {
    const info = await logger.info(`[INFO] soy logger info ${logger.info.message} - Date ${new Date().toLocaleString()}`)
    res.status(200).send(info.message)
}

export const getDebug = async(req, res) => {
    const debug = await logger.debug(`[DEBUG] soy logger debug ${logger.debug.message} - Date ${new Date().toLocaleString()}`)
    res.status(200).send(debug.message)
}
/*const customLevels={
    levels: {
        fatal: 0,
        error: 1,
        warning: 2,
        info: 3,
        debug: 4
    }*/

    //logger por cada level que tenes declarado, con un mensaje , ej: logger.error(`[ERROR] - soy un log de error. `) ; ) 