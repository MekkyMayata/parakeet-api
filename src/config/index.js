import dev from './environment/dev';
import test from './environment/test';
import prod from './environment/prod';

const defaults = {
    auth: {
        issuer: 'parakeet',
        subject: 'LoginToken',
        expiresIn: '720h'
    },
    passwordResetTokenExpiresIn: 24 // hrs
}

// configs for choosen environment
const env = process.env.NODE_ENV || 'development';

let ENV_CONFIG = {};

// add any additional specific env configs to 'env_configs' before return
switch(env) {
    case 'test':
        ENV_CONFIG = Object.assign(defaults, test);
        break;
    case 'development':
        ENV_CONFIG = Object.assign(defaults, dev);
        break;
    case 'production':
        ENV_CONFIG = Object.assign(defaults, prod);
        break;
    default: 
        break;
}

export default ENV_CONFIG;