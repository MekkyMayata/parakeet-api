import express from 'express';
import expressConfig from './config/expressconfigs';
import logger from './config/logger';

const port = process.env.PORT || 5050;

const app = express();
expressConfig(app);

app.listen(port);

logger.info(`Parakeet API started on port ${port}`);

export default app;
