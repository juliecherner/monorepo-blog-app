import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { faker } from '@faker-js/faker';
import { AppModule } from './../src/app.module';
import { BasePostDto, CreatePostDto } from "types";

describe('AppController (e2e/api-tests)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });


  it('Check if greeting route GET/greeter/hello returns text', async () => {
    return request(app.getHttpServer())
      .get('/greeter/hello')
      .expect(200)
      .expect('Hello World!');
  });

  it('Check if (GET)/POSTS return at least 1 post', async () => {
    return request(app.getHttpServer())
      .get('/posts')
      .expect(200)
      .then((response) => {
        expect(response.body?.posts?.length).toBeTruthy();
        const arePostValid = response.body?.posts.every((post: BasePostDto) => post.hasOwnProperty("_id") && post.hasOwnProperty("name"))
        expect(arePostValid).toBeTruthy();
      });
  });

  it('Check if (GET)/POSTS return valid posts', async () => {
    return request(app.getHttpServer())
      .get('/posts')
      .expect(200)
      .then((response) => {
        const arePostValid = response.body?.posts.every((post: BasePostDto) => post.hasOwnProperty("_id") && post.hasOwnProperty("name"))
        expect(arePostValid).toBeTruthy();
      });
  });

  it('Check if (GET)/POSTS/ID return a valid post', async () => {
    let posts: BasePostDto[] = [];

    request(app.getHttpServer())
      .get('/posts')
      .expect(200)
      .then((response) => {
        posts = response.body?.posts
      });

    const randomIndex = Math.floor(Math.random() * (posts.length));

    request(app.getHttpServer())
      .get('/posts')
      .expect(200)
      .then((response) => {
        expect(response).toMatchObject(posts[randomIndex])
      });
  })


  it('Check if (POST)/POSTS returns and saves a post', async () => {

    const post: CreatePostDto = {
      name: "Enter a name for post",
      description: "Enter description for post",
      authorId: "64a157cee4c70a935728db7c"
    };

    let createdPost: any = null;
    let id = "";

    (request(app.getHttpServer()))
      .post('/posts')
      .send(post)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .then((response) => {
        expect(response.body).toBeTruthy();
        createdPost = response.body
        id = response.body?._id
      })

    delete createdPost["_id"]

    expect(createdPost).toMatchObject(post);

    return request(app.getHttpServer())
      .get('/posts' + id)
      .expect(200)
      .then((response) => {
        expect(response.body).toMatchObject({ ...post, "_id": id });

      });
  });


//   it('/ (GET)/POSTS/ID - id does not exit - to fail with 500 status', async () => {
//     //automation!
//     const edgeCasesPerPostId: string[] = ['abc', '1', ''];
//     for (const edgeCase of edgeCasesPerPostId) {
//       return request(app.getHttpServer())
//         .get('/posts/' + edgeCase)
//         .expect(500);
//     }
//   });

//   it('/ (GET)/POSTS/ID - id exits - get post', async () => {
//     const idsLength = postIds.length;
//     //automation!
//     const realIds = [
//       postIds[0],
//       postIds[(Math.floor(idsLength / 2), postIds[idsLength - 1]) as unknown as number],
//     ];
//     for (const id of realIds) {
//       return request(app.getHttpServer())
//         .get('/posts/' + id)
//         .expect(200)
//         .then((response) => {
//           expect(response?.body).toBeTruthy();
//         });
//     }
//   });

//   //create/patch/delete post
//   //mock db?
// });

// describe('Auth routes', () => {
//   let token: string;

//   it('/ (POST)/AUTH/REGISTER', async () => {
//     return request(app.getHttpServer())
//       .post('/auth/register')
//       .send({
//         username: faker.person.fullName(),
//         password: faker.internet.password.toString(),
//       })
//       .expect(201)
//       .then((response) => {
//         expect(response?.body?._id).toBeTruthy();
//         expect(response?.body?.username).toBeTruthy();
//         //expect(response?.body?.password?.length).toBeGreaterThan(10);
//       });
//   });

//   //add to environmental variables
//   it('/ (POST)/AUTH/LOGIN', async () => {
//     return request(app.getHttpServer())
//       .post('/auth/login')
//       .send({
//         username: 'username',
//         password: 'password',
//       })
//       .expect(201)
//       .then((response) => {
//         expect(response?.body?.access_token).toBeTruthy();
//         token = response?.body?.access_token;
//       });
//   });

//   it('/ (GET)/ME + PROTECTED ROUTE', async () => {
//     return request(app.getHttpServer())
//       .get('/auth/me')
//       .set('Authorization', 'Bearer ' + token)
//       .expect(200)
//       .then((response) => {
//         expect(response?.body?._id).toBeTruthy();
//         expect(response?.body?.username).toBeTruthy();
//       });
//   });
// });

afterEach(async () => {
  await app.close();
});

});
