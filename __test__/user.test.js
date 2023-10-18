import jwt from 'jsonwebtoken';
import '../config.js';
import { login } from "../dist/controllers/user.js";
import dataSource, { initDB } from '../dist/db/dataSource.js';

beforeAll(async () => {
  await initDB();
});

afterAll(async () => {
  await dataSource.destroy();
});

const tmpData = {
  "email": "suzan@email.com",
  "password": "123456"
};
//checks if the login function returns a truthy token
describe("Login process", () => {
  let token;
  beforeAll(async () => {
    token = await login(tmpData.email, tmpData.password);
  })
 
  it("returns a token", async () => {
    expect(token).toBeTruthy();
  });
//test case verifies if the token returned by login is valid 
  it("has a valid token", () => {
    const tokenIsValid = jwt.verify(token, process.env.SECRET_KEY || '');
    expect(tokenIsValid).toBeTruthy();
  });
//checks if the decoded payload contains an email field that matches the email stored in tmpData
  it("has valid payload", () => {
    const payload = jwt.decode(token, { json: true });
    expect(payload?.email).toEqual(tmpData.email);
  });
});