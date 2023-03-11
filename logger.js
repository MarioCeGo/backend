import log4js from "log4js";

log4js.configure({
    appenders: {
        warningFile: { type: "file", filename: "warn.log"},
        errFile: { type: "file", filename: "error.log"},
        console: {type: "console"},
        loggerConsole: { type: "logLevelFilter", appender: "console", level: "info"},
        loggerWarnFile: { type: "logLevelFilter", appender: "console", level: "warn"},
        loggerErrorFile: { type: "logLevelFilter", appender: "console", level: "error"}
    },
    categories: {
        default: { appenders: ["loggerConsole","loggerWarnFile", "loggerErrorFile"], level: "all"},
    }
})

const logger = log4js.getLogger();

export default logger;