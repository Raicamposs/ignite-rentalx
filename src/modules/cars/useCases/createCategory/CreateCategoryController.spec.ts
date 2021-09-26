import { app } from "@shared/infra/http/app";
import createConnection from "@shared/infra/typeorm";
import { hash } from "bcrypt";
import request from "supertest";
import { Connection } from "typeorm";
import { v4 as uuidV4 } from "uuid";

describe("Create Category Controller", () => {

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

  it("Should be able to create a new category", async () => {
    const response = await request(app).post('/categories').send({
      name: 'any_name',
      description: 'any_description',
    }).set({
      Authorization: `Bearer ${token}`
    });

    expect(response.statusCode).toBe(201);
  })

  it("Should not be able to create a new category with name exists", async () => {
    const response = await request(app).post('/categories').send({
      name: 'any_name',
      description: 'any_description',
    }).set({
      Authorization: `Bearer ${token}`
    });

    expect(response.statusCode).toBe(400);
  })
})