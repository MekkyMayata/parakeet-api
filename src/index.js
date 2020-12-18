import express from 'express';
import moment from 'moment';
import config from '../src/config/';
import expressConfig from './config/expressconfigs';

const ports = config.PORT || 5050;

const app = express();
expressConfig(app);

app.listen(ports);

global.logger.info(` [${moment().format('DD-MM-YYYY h:mm:ss')}]  Parakeet API started on port ${ports}`);

export default app;
