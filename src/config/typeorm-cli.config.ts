import { ConfigService } from "@nestjs/config";
import { config } from "dotenv";
import { InitalSchema1768584327807 } from "src/migrations/1768584327807-inital-schema";
import { Ingredient, Recipe } from "src/recipe/entity/recipe";
import { DataSource } from "typeorm";

config();

const configService = new ConfigService();

export default new DataSource({
    type: 'postgres',
    host: configService.get<string>('DB_HOST'),
    port: configService.get<number>('DB_PORT'),
    username: configService.get<string>('DB_USERNAME'),
    password: configService.get<string>('DB_PASSWORD'),
    database: configService.get<string>('DB_NAME'),
    entities: [Recipe, Ingredient],
    migrations: [InitalSchema1768584327807],
});
