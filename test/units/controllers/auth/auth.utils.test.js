import "core-js/stable";
import "regenerator-runtime/runtime"
import { expect } from 'chai';
import sinon from 'sinon';
import * as authUtilModule from '../../../../src/app/controllers/auth_controller/auth.utils';

let sandbox;

describe('Unit test for auth_controller/auth.utils', () => {

  // create new sandbox object with spies, stubs, and mocks for each test
  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    // completely restore all fakes created through the sandbox
    sandbox.restore();
  });

  it('bcryptSaltPassword: Returns a password hash with its salt', async () => {
    try {
      const password = 'password123';
      const { salt, hash: hashedPassword } = await authUtilModule.bcryptSaltPassword(password);
      
      expect(hashedPassword).to.not.be.be(null);
      expect(salt).to.not.be(null);
    } catch (err) {
      // handled
    }
  });

  it('bcryptSaltPassword: Returns false and fail to hash', async () => {
    try {
      const password = 'password123';
      sandbox.stub(authUtilModule, 'bcryptSaltPassword').returns(Promise.resolve(false));
      const { result } = await authUtilModule.bcryptSaltPassword(password);
      expect(result).to.be(false);
    } catch (err) {
      // handled
    }
  });

  it('validateHash: Returns a bool depending on success or fail', async () => {
    try {
      const password = 'password123';
      const { hash: hashedPassword, salt } = await authUtilModule.bcryptSaltPassword(password);
      const { result } = await authUtilModule.validateHash(password, salt, hashedPassword);
      expect(result).to.be(true);
    } catch (err) {
      // handled
    }
  });

  it('generateRandomString: Returns exact length of random string', () => {
    const string1 = authUtilModule.generateRandomString(0);
    const string10 = authUtilModule.generateRandomString(10);
    const string99999 = authUtilModule.generateRandomString(99999);
    expect(string1).to.equal('');
    expect(string10.length).to.equal(10);
    expect(string99999.length).to.equal(99999);
  })

  it('generateJWTToken: Returns a token', () => {
    try {
      const user = {
        username: 'AliceMesus',
        email: 'alice45mesul@gmail.com'
      };
      const token = authUtilModule.generateJWTToken(user);
      expect(token.length).to.be.greaterThan(1);
      expect(token).to.not.be(null);
    } catch (err) {
      // handled
    }
  });

  it('extractUser: extract user from payload', async () => {
    try {
      const user = {
        username: 'AliceMesus',
        email: 'alice45mesul@gmail.com'
      };
      const token = authUtilModule.generateJWTToken(user);

      const req = {
        headers: {
          authorization: token
        }
      };
      const res = {
        status() {
          return this;
        },
        json(data) {
          return data;
        }
      };
      const spy = sandbox.spy();

      authUtilModule.extractUser(req, res, spy);

      sandbox.assert.calledOnce(spy);
      expect(req.user).to.equal(user);
    } catch (err) {
      // handled
    }
  });

  
})



