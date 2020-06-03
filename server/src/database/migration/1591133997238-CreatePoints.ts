import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreatePoints1591133997238 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'points',
      columns: [
        {
          name: 'id',
          type: 'int',
          isPrimary: true,
          isGenerated: true,
        },
        {
          name: 'name',
          type: 'varchar',
          isNullable: false,
        },
        {
          name: 'image',
          type: 'varchar',
          isNullable: false,
        },
        {
          name: 'email',
          type: 'varchar',
          isNullable: false,
        },
        {
          name: 'whatsapp',
          type: 'varchar',
          isNullable: false,
        },
        {
          name: 'latitude',
          type: 'decimal',
          isNullable: false,
        },
        {
          name: 'longitude',
          type: 'decimal',
          isNullable: false,
        },
        {
          name: 'city',
          type: 'varchar',
          isNullable: false,
        },
        {
          name: 'uf',
          type: 'varchar',
          isNullable: false,
          length: '2',
        },
      ],
    }), true);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('points');
  }
}
