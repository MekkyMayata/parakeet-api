import pg_promise from 'pg-promise';
import bluebird from 'bluebird';
import config from '../../config/config';

// initialize the pg-promise library with specific options
const pg = pg_promise({ 
    promiseLib: bluebird, 
    noLocking: true
});

// connection details
const cn = config.PARAKEET_DEV_DATABASE_URL;

// create new db instance from the connect
const parakeetDb = pg(cn);

export default parakeetDb;
