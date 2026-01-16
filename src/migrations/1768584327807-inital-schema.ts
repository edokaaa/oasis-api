import { Unit } from "src/recipe/dto/recipe.dto";
import { MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey } from "typeorm";

export class InitalSchema1768584327807 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        // recipes table
        await queryRunner.createTable(
            new Table({
                name: 'recipes',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'uuid',
                        isNullable: false,
                    },
                    {
                        name: 'description',
                        type: 'varchar',
                        isNullable: false,
                    },
                ],
            }),
        );

        // ingredients table
        await queryRunner.createTable(
            new Table({
                name: 'ingredients',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'uuid',
                        isNullable: false,
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'unit',
                        type: 'varchar',
                        isNullable: false,
                        enum: [...Object.values(Unit)],
                    },
                    {
                        name: 'quantity',
                        type: 'integer',
                        isNullable: false,
                    },
                ],
            }),
        );

        // one to many relationship
        await queryRunner.addColumn(
            'ingredients',
            new TableColumn({
                name: 'recipeId',
                type: 'uuid',
            })
        );

        await queryRunner.createForeignKey(
            'ingredients',
            new TableForeignKey({
                columnNames: ['recipeId'],
                referencedColumnNames: ['id'],
                referencedTableName: 'recipes',
                onDelete: 'CASCADE',
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // find fk
        const table = await queryRunner.getTable('ingredients');
        const foreignKey = table?.foreignKeys.find(
            (fk) => fk.columnNames.indexOf('recipeId') !== -1,
        );

        if (!foreignKey) {
            console.error('Error reverting migration');
            return;
        };

        // drop fk
        await queryRunner.dropForeignKey('ingredients', foreignKey);

        // drop fk column
        await queryRunner.dropColumn('ingredient', 'recipeId');

        // drop tables
        await queryRunner.dropTable('ingredients');
        await queryRunner.dropTable('recipients');
    }

}
