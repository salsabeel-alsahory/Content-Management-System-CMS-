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
const request = require('supertest');
const app = require('../app'); // Assuming your Express app is exported from a file named 'app.js'
const { createTag } = require('../models/tag'); // Assuming 'createTag' is exported from a 'tag' model in the 'models' directory

jest.mock('../models/tag');

describe('POST /tags', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should create a tag and return 201 status code', async () => {
    const mockTag = { id: 1, title: 'testTag' };
    createTag.mockResolvedValue(mockTag);

    const response = await request(app)
      .post('/tags')
      .send({ title: 'testTag' });

    expect(response.status).toBe(201);
    expect(response.body).toEqual(mockTag);
    expect(createTag).toHaveBeenCalledWith('testTag');
  });

  it('should return 500 status code if there is an error', async () => {
    createTag.mockRejectedValue(new Error('Failed to create tag'));

    const response = await request(app)
      .post('/tags')
      .send({ title: 'testTag' });

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: 'Failed to create tag' });
  });
});
const request = require('supertest');
const express = require('express');
const app = express();
const { createContent } = require('../models/content'); // Assuming 'createContent' is exported from a 'content' model in the 'models' directory

// Mock middleware
const authenticate = jest.fn((req, res, next) => next());
app.use((req, res, next) => {
  authenticate(req, res, next);
});

app.use(express.json());
app.post('/content', authenticate, (req, res) => {
  createContent(req.body)
    .then((data) => {
      res.status(201).send(data);
    })
    .catch(err => {
      console.error(err);
      res.status(500).send(err);
    });
});

jest.mock('../models/content');

describe('POST /content', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should create content and return 201 status code', async () => {
    const mockContent = { id: 1, title: 'Sample Content' };
    createContent.mockResolvedValue(mockContent);

    const response = await request(app)
      .post('/content')
      .send({ title: 'Sample Content' });

    expect(response.status).toBe(201);
    expect(response.body).toEqual(mockContent);
    expect(createContent).toHaveBeenCalledWith({ title: 'Sample Content' });
    expect(authenticate).toHaveBeenCalled();
  });

  it('should return 500 status code if there is an error', async () => {
    createContent.mockRejectedValue(new Error('Failed to create content'));

    const response = await request(app)
      .post('/content')
      .send({ title: 'Sample Content' });

    expect(response.status).toBe(500);
    expect(response.text).toContain('Failed to create content');
    expect(authenticate).toHaveBeenCalled();
  });
});
