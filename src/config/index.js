import dev from './environment/dev';
import test from './environment/test';
import prod from './environment/prod';

// configs for choosen environment
const env = process.env.NODE_ENV || 'develpment';

let ENV_CONFIG = {};

// add any additional specific env configs to 'env_configs' before return
switch(env) {
    case 'test':
        ENV_CONFIG = Object.assign(test);
        break;
    case 'dev':
        ENV_CONFIG = Object.assign(dev);
        break;
    case 'prod':
        ENV_CONFIG = Object.assign(prod);
        break;
    default: 
        break;
}

export default ENV_CONFIG;