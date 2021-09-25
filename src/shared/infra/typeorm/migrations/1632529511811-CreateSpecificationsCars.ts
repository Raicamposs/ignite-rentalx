import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateSpecificationsCars1632529511811 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: "specifications_cars",
      columns: [
        {
          name: "car_id",
          type: "uuid",
          isPrimary: true
        },
        {
          name: "specification_id",
          type: "uuid",
          isPrimary: true,
        },
        {
          name: 'created_at',
          type: 'timestamp',
          default: 'now()'
        }
      ]
    }), true);

    await queryRunner.createForeignKey("specifications_cars", new TableForeignKey({
      name: 'specifications_cars_fk_cars',
      columnNames: ["car_id"],
      referencedColumnNames: ["id"],
      referencedTableName: "cars",
      onDelete: "CASCADE"
    }));

    await queryRunner.createForeignKey("specifications_cars", new TableForeignKey({
      name: 'specifications_cars_fk_specifications',
      columnNames: ["specification_id"],
      referencedColumnNames: ["id"],
      referencedTableName: "specifications",
      onDelete: "CASCADE"
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("specifications_cars", "specifications_cars_fk_cars");
    await queryRunner.dropForeignKey("specifications_cars", "specifications_cars_fk_specifications");
    await queryRunner.dropTable("specifications_cars");
  }


}
