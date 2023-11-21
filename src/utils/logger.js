import winston from "winston"

const customLevels={
    levels: {
        fatal: 0,
        error: 1,
        warning: 2,
        info: 3,
        debug: 4
    },
    colors: {
        fatal: "red",
        error: "magenta",
        warning: "yellow",
        info: "blue",
        debug: "white"
      }
}

export const logger = winston.createLogger({
    levels: customLevels.levels,
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple()
    ),
    transports: [
      new winston.transports.Console({
        level: "info"
      }),
      new winston.transports.File({ filename: "./src/logs/errors.logs", level: "warn" })
    ]
  });


export const addLogger = (req,res,next) =>{
    req.logger = logger;
    req.logger.info(`${req.method} en ${req.url} - Date ${new Date().toLocaleString()}`)
    next();
}

