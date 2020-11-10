import fs from 'fs';
import FilestreamRotator from 'file-stream-rotator';
import morgan from 'morgan';
import loggerInit from './logger';


// *************setup logs dir************
const logsDir = './log';
const testLogDir = fs.existsSync(logsDir) || fs.mkdirSync(logsDir);

// *************configure express*********
const expressConfig = (app) => {
    let logger;
    let accessLogStream;

    if(app.get('env') === 'development') {
        logger = loggerInit('development');
    } else if (app.get('env') === 'test') {
        logger = loggerInit('test');
    } else {
        logger = loggerInit();
    }
    global.logger = logger;
    logger.info('Starting App...');
    logger.debug('Overriding default Express logger');

    if(testLogDir) {
        accessLogStream = FilestreamRotator.getStream({
            date_format: 'YYYYMMDD',
            filename: `${logsDir}/parakeet-%DATE%.log`,
            frequency: 'weekly',
            verbose: false
        });
    }

    // http logger middleware
    app.use(morgan('combined', { stream: accessLogStream }));
}


export default expressConfig;