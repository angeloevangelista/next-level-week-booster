import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedItems1591147849794 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner
      .manager
      .createQueryBuilder()
      .insert()
      .into('items')
      .values([
        { id: 1, title: 'Lâmpadas', image: 'lampadas.svg' },
        { id: 2, title: 'Pilhas e baterias', image: 'baterias.svg' },
        { id: 3, title: 'Papéis e Papelão', image: 'papeis-papelao.svg' },
        { id: 4, title: 'Resíduos Eletrônicos', image: 'eletronicos.svg' },
        { id: 5, title: 'Resíduos Orgânicos', image: 'organicos.svg' },
        { id: 6, title: 'Óleo de Cozinha', image: 'oleo.svg' },
      ])
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner
      .manager
      .createQueryBuilder()
      .delete()
      .from('items')
      .execute();
  }
}
