import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { PrismaService } from '../src/prisma/prisma.service';
import  pactum  from 'pactum';
const PORT = 3002
describe("App EndToEnd Tests", () => {
  let app: INestApplication;
  let prismaService: PrismaService;

  beforeAll(async () => {
    const moduleApp = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    app = moduleApp.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
    await app.listen(PORT)
    prismaService = app.get(PrismaService);
    await prismaService.cleanDatabase()
  });

  afterAll(async () => {
    await app.close();
  });

  it.todo("Should pass");
});


describe('Test Authencation',()=>{
  describe('Register',()=>{
    it('Should register',()=>{
      return pactum.spec()
      .post(`http://localhost:${PORT}/auth/register`)
      .withBody({
        email :"testemail@gmail.com",
        password : '123456'
      })
      .expectStatus(200 || 201)
      .inspect()
        })
  }),
  describe('Login',()=>{
    it.todo('Should Login')
  })
})