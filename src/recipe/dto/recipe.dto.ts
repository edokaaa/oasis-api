export class RecipeDto {
    description: string;
    ingredients: IngredientDto[];
}

export class IngredientDto {
    name: string;
    unit: Unit;
    quantity: number;
}

export enum Unit {
    MILILITERS = 'mililiters',
    LITERS = 'liters',
    GRAMS = 'grams',
    KILIGRAMS = 'kilograms',
    SPOONS = 'spoons',
    CUPS = 'cups',
    PIECES = 'pieces',
}