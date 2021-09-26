import { app } from "@shared/infra/http/app";
import createConnection from "@shared/infra/typeorm";
import { hash } from "bcrypt";
import request from "supertest";
import { Connection } from "typeorm";
import { v4 as uuidV4 } from "uuid";

describe("List Categories Controller", () => {

  let connection: Connection;
  let token: string;

  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    const id = uuidV4();
    const password = await hash("admin", 8);

    await connection.query(
      `INSERT INTO USERS(id, name, email, password, admin, created_at, driver_license ) 
      values('${id}', 'admin', 'admin@rentx.com.br', '${password}', true, 'now()', 'XXXXXX')
    `
    );
  });

  afterAll(async () => {
    await connection?.dropDatabase();
    await connection?.close();
  })

  beforeEach(async () => {
    const { body } = await request(app).post('/sessions').send({
      "email": "admin@rentx.com.br",
      "password": "admin"
    });

    token = body.token;
  })

  it("Should be able to list all categories", async () => {
    await request(app).post('/categories').send({
      name: 'any_name',
      description: 'any_description',
    }).set({
      Authorization: `Bearer ${token}`
    });

    const response = await request(app).get('/categories');

    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0]).toHaveProperty("id");
    expect(response.body[0]).toHaveProperty("name");
    expect(response.body[0].name).toEqual('any_name');
  })

})