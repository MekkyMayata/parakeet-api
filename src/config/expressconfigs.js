import fs from 'fs';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import FilestreamRotator from 'file-stream-rotator';
import morgan from 'morgan';
import compression from 'compression';
import loggerInit from './logger';
import authRoutes from '../app/routes/auth.route';


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

    // http secure headers
    app.use(helmet());
    app.disable('x-powered-by');

    // compress and reduce latency
    app.use(compression());

    // parse application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({ extended: false }))
    // parse application/json
    app.use(bodyParser.json())

    app.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');

        // request methods allowed
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH ,DELETE');

        // request headers allowed
        res.setHeader('Access-Control-Allow-Headers', 'Origin, Accept, X-Requested-With, Content-type, Authorization');

        // Set to true if you need the website to include cookies in the requests sent
        // to the API (e.g. in case you use sessions)
        res.setHeader('Access-Control-Allow-Credentials', true);

        // next middleware layer
        next();
    })

    // routes
    app.use('/api/v1/auth', authRoutes);

    app.use((req, res) => {
        res.status(404).json({
            message: 'Not Found',
            status: 404
        });
    });
}


export default expressConfig;