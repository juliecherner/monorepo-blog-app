import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { faker } from '@faker-js/faker';
import { AppModule } from './../src/app.module';
import {BasePostDto} from "types";
 
describe('AppController (e2e/api-tests)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    //check db connection????
  });

  it('/ (GET)', async () => {
    return request(app.getHttpServer())
      .get('/greeter/hello')
      .expect(200)
      .expect('Hello World!');
  });

  describe('Posts routes', () => {
    let postIds: BasePostDto[] = [];

    it('/ (GET)/POSTS', async () => {
      return request(app.getHttpServer())
        .get('/posts')
        .expect(200)
        .then((response) => {
          expect(response?.body).toBeTruthy();
          postIds = response?.body?.posts.map((post: BasePostDto) => post._id);
        });
    });

    it('/ (GET)/POSTS/ID - id does not exit - to fail with 500 status', async () => {
      //automation!
      const edgeCasesPerPostId: string[] = ['abc', '1', ''];
      for (const edgeCase of edgeCasesPerPostId) {
        return request(app.getHttpServer())
          .get('/posts/' + edgeCase)
          .expect(500);
      }
    });

    it('/ (GET)/POSTS/ID - id exits - get post', async () => {
      const idsLength = postIds.length;
      //automation!
      const realIds = [
        postIds[0],
        postIds[(Math.floor(idsLength / 2), postIds[idsLength - 1]) as unknown as number],
      ];
      for (const id of realIds) {
        return request(app.getHttpServer())
          .get('/posts/' + id)
          .expect(200)
          .then((response) => {
            expect(response?.body).toBeTruthy();
          });
      }
    });

    //create/patch/delete post
    //mock db?
  });

  describe('Auth routes', () => {
    let token: string;

    it('/ (POST)/AUTH/REGISTER', async () => {
      return request(app.getHttpServer())
        .post('/auth/register')
        .send({
          username: faker.person.fullName(),
          password: faker.internet.password.toString(),
        })
        .expect(201)
        .then((response) => {
          expect(response?.body?._id).toBeTruthy();
          expect(response?.body?.username).toBeTruthy();
          //expect(response?.body?.password?.length).toBeGreaterThan(10);
        });
    });

    //add to environmental variables
    it('/ (POST)/AUTH/LOGIN', async () => {
      return request(app.getHttpServer())
        .post('/auth/login')
        .send({
          username: 'username',
          password: 'password',
        })
        .expect(201)
        .then((response) => {
          expect(response?.body?.access_token).toBeTruthy();
          token = response?.body?.access_token;
        });
    });

    it('/ (GET)/ME + PROTECTED ROUTE', async () => {
      return request(app.getHttpServer())
        .get('/auth/me')
        .set('Authorization', 'Bearer ' + token)
        .expect(200)
        .then((response) => {
          expect(response?.body?._id).toBeTruthy();
          expect(response?.body?.username).toBeTruthy();
        });
    });

    //create -> check: status, response, try to search in db?
    //delete -> check status, response, try to search in db?
  });

  afterAll(async () => {
    await app.close();
  });
});
