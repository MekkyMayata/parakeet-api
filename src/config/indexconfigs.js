import dev from './environment/dev';
import test from './environment/test';

// configs for choosen environment
const env = process.env.NODE_ENV || 'develpment';

let env_configs = {};

// add any additional specific env configs to 'env_configs' before return
switch(env) {
    case 'test':
        env_configs = Object.assign(test);
        break;
    case 'dev':
        env_configs = Object.assign(dev);
        break;
    default: 
        break;
}

export default env_configs;