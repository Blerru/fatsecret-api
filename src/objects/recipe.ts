export default interface IRecipe {
    directions: Directions;
    ingredients: Ingredients;
    number_of_servings: string;
    rating: string;
    recipe_categories: Recipecategories;
    recipe_description: string;
    recipe_id: string;
    recipe_name: string;
    recipe_types: Recipetypes;
    recipe_url: string;
    serving_sizes: Servingsizes;
}

interface Servingsizes {
    serving: Serving;
}

interface Serving {
    calcium: string;
    calories: string;
    carbohydrate: string;
    cholesterol: string;
    fat: string;
    fiber: string;
    iron: string;
    monounsaturated_fat: string;
    polyunsaturated_fat: string;
    potassium: string;
    protein: string;
    saturated_fat: string;
    serving_size: string;
    sodium: string;
    sugar: string;
    trans_fat: string;
    vitamin_a: string;
    vitamin_c: string;
}

interface Recipetypes {
    recipe_type: string;
}

interface Recipecategories {
    recipe_category: Recipecategory[];
}

interface Recipecategory {
    recipe_category_name: string;
    recipe_category_url: string;
}

interface Ingredients {
    ingredient: Ingredient[];
}

interface Ingredient {
    food_id: string;
    food_name: string;
    ingredient_description: string;
    ingredient_url: string;
    measurement_description: string;
    number_of_units: string;
    serving_id: string;
}

interface Directions {
    direction: Direction[];
}

interface Direction {
    direction_description: string;
    direction_number: string;
}