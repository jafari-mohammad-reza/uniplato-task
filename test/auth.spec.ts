import { expect } from 'chai';
import { describe, it } from 'mocha';
import { Login } from '../src/services/auth.service';
import { UserRepository } from '../src/db';
import { ERRORS } from '../src/helper';
import sinon from 'sinon';
describe('Login Function', () => {
  it('should authenticate a user with valid credentials', async () => {
    const email = 'test@example.com';
    const password = 'password';

    const validUser = {
      id: 1,
      email: 'test@example.com',
      password: 'hashedPassword',
      salt: 'salt',
    };

    const stub = sinon.stub(UserRepository, 'FindUser').resolves(validUser);

    const token = await Login(email, password);

    expect(token).to.be.a('string');
    stub.restore();
  });

  it('should throw an error for non-existing user', async () => {
    const email = 'nonexistent@example.com';
    const password = 'password';
    const stub = sinon.stub(UserRepository, 'FindUser').rejects(new Error());

    try {
      await Login(email, password);
      expect.fail('Expected an error but got a token.');
    } catch (error) {
      expect(error).to.equal(ERRORS.userNotExists);
    } finally {
      stub.restore();
    }
  });
});
