import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUsers1631236091619 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: "users",
      columns: [
        {
          name: "id",
          type: "uuid",
          isPrimary: true
        },
        {
          name: "name",
          type: "varchar",
        },
        {
          name: "username",
          type: "varchar",
          isUnique: true
        },
        {
          name: "password",
          type: "varchar",
        },
        {
          name: "email",
          type: "varchar",
          isUnique: true
        },
        {
          name: "driver_licence",
          type: "varchar",
        },
        {
          name: "admin",
          type: "boolean",
          default: false
        },
        {
          name: 'created_at',
          type: 'timestamp',
          default: 'now()'
        }
      ]
    }), true)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("users");
  }

}