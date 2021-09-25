import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateCarImages1632536923686 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: "car_images",
      columns: [
        {
          name: "id",
          type: "uuid",
          isPrimary: true
        },
        {
          name: "car_id",
          type: "uuid",
        },
        {
          name: "image_name",
          type: "varchar",
        },
        {
          name: 'created_at',
          type: 'timestamp',
          default: 'now()'
        }
      ],
      foreignKeys: [
        new TableForeignKey({
          name: 'car_images_fk_cars',
          columnNames: ["car_id"],
          referencedColumnNames: ["id"],
          referencedTableName: "cars",
          onDelete: "CASCADE"
        })
      ]
    }), true);

  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("car_images", "car_images_fk_cars");
    await queryRunner.dropTable("car_images");
  }


}
