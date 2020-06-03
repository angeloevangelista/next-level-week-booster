import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreatePointItems1591141199285 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'point_items',
      columns: [
        {
          name: 'id',
          type: 'int',
          isPrimary: true,
          isGenerated: true,
        },
        {
          name: 'point_id',
          type: 'int',
          isNullable: false,
        },
        {
          name: 'item_id',
          type: 'int',
          isNullable: false,
        },
      ],
      foreignKeys: [
        {
          referencedTableName: 'points',
          columnNames: [
            'point_id',
          ],
          referencedColumnNames: [
            'id',
          ],
        },
        {
          referencedTableName: 'items',
          columnNames: [
            'item_id',
          ],
          referencedColumnNames: [
            'id',
          ],
        },
      ],
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('point_items');
  }
}
