import { createLogger, format, transports } from "winston";

export const logger = createLogger({
    format: format.combine(format.simple()),
    transports: [
        new transports.File({
            maxsize: 5120000,
            maxFiles: 5,
            filename: "../logs/log-api.log"
        }),
        new transports.Console({
            level: "debug"
        })
    ]
})