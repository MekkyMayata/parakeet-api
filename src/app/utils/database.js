import pg_prom from 'pg-promise';
import bluebird from 'bluebird';
import config from '../../config/config';

// initialize the pg-promise library with specific options
const pg = pg_prom({ 
    promiseLib: bluebird, 
    noLocking: true
});

// connection details
const cn = config.DATABASE_URL;

// create new db instance from the connect
const parakeetDb = pg(cn);

// remove this!!!
// *******************testing purposes first********************
const query = async () => {
    const res = await parakeetDb.any("select * from users");
    return res;
}

query().then(res => {
    console.log(res)
  })
  .catch(err => {
    console.error(err)
  })
  .finally(() => {
    parakeetDb.$pool.end()
  })

export default parakeetDb;
