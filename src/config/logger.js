import winston from 'winston';

winston.emitErrors = true;

const logger = (env) => {
    let yields;

    switch(env) {
        case 'development':
            yields = winston.createLogger({
                transports: [
                    new winston.transports.Console({
                        level: 'debug',
                        handleExceptions: true,
                        json: false,
                        format: winston.format.combine(
                            winston.format.colorize(),
                            winston.format.simple()
                        )
                    }),
                    new winston.transports.File({
                        level: 'info',
                        filename: './server.log',
                        handleExceptions: true,
                        json: false,
                        maxsize: 1024 * 1024 * 20,    // 15MB
                        maxFiles: 5,
                        colorize: false
                    })
                ],
                exitOnError: false
            });
            break;

        case 'test':
            yields = winston.createLogger({
                transports: [
                    new winston.transports.Console({
                        level: 'debug',
                        handleExceptions: true,
                        json: false,
                        format: winston.format.combine(
                            winston.format.colorize(),
                            winston.format.simple()
                        )
                    }),
                    new winston.transports.File({
                        level: 'info',
                        filename: './test.log',
                        handleExceptions: true,
                        json: false,
                        maxsize: 1024 * 1024 * 20,    // 15MB
                        maxFiles: 50,
                        colorize: false
                    })
                ],
                exitOnError: false
            });
            break;
        
        default:
            yields = winston.createLogger({
                transports: [
                    new winston.transports.Console({
                        level: 'debug',
                        handleExceptions: true,
                        json: false,
                        format: winston.format.combine(
                            winston.format.colorize(),
                            winston.format.simple()
                        )
                    }),
                    new winston.transports.Console({
                        level: 'debug',
                        handleExceptions: true,
                        json: false,
                        format: winston.format.combine(
                            winston.format.colorize(),
                            winston.format.simple()
                        )
                    })
                ],
                exitOnError: false
            });
    }
    yields.stream = {
        write: (message) => {
            logger.info(message);
        }
    };
    return yields;
};

export default logger;