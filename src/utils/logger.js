import winston from "winston"

const customLevels={
    levels: {
        fatal: 0,
        error: 1,
        warning: 2,
        info: 3,
        debug: 4
    }
}

export const logger = winston.createLogger({
    levels: customLevels,
    transports: [
        new winston.transports.Console( {
            level: "info",
            format: winston.format.combine(
                winston.format.colorize({
                    fatal:"red",
                    error: "orange",
                    warning: "yellow",
                    info: "blue",
                    debug: "white"
                }),
                winston.format.simple()
            )
        }),
        new winston.transports.File({filename:"./src/logs/errors.logs", level:"warn"})
    ]
})

export const addLogger = (req,res,next) =>{
    req.logger = logger;
    req.logger.http(`${req.method} en ${req.url} - Date ${new Date().toLocaleString()}`)
    next();
}

