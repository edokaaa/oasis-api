import { UserRole } from "src/auth/entity/user";
import { MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey } from "typeorm";

export class AddUser1768602685387 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // users table

        await queryRunner.createTable(
            new Table({
                name: 'users',
                columns: [
                    {
                        name: 'email',
                        type: 'varchar',
                        isPrimary: true,
                        isNullable: false,
                    },
                    {
                        name: 'password',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'userRole',
                        type: 'varchar',
                        enum: [...Object.values(UserRole)],
                        isNullable: false,
                        default: UserRole.USER,
                    },
                ],
            }),
        );

        // fk
        await queryRunner.addColumn(
            'recipes',
            new TableColumn({
                name: 'userEmail',
                type: 'varchar',
            })
        );

        await queryRunner.createForeignKey(
            'recipes',
            new TableForeignKey({
                columnNames: ['userEmail'],
                referencedColumnNames: ['email'],
                referencedTableName: 'users',
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // find fk
        const table = await queryRunner.getTable('recipes');
        const foreignKey = table?.foreignKeys.find(
            (fk) => fk.columnNames.indexOf('userEmail') !== -1,
        );

        if (!foreignKey) {
            console.error('Error reverting migration');
            return;
        };

        // drop fk
        await queryRunner.dropForeignKey('recipes', foreignKey);

        // drop fk column
        await queryRunner.dropColumn('recipes', 'userEmail');

        // drop user tables
        await queryRunner.dropTable('users');
        
    }

}
