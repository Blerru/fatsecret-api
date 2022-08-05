export default interface IRecipeList {
    max_results: string;
    page_number: string;
    recipe: Recipe[];
    total_results: string;
}

interface Recipe {
    recipe_description: string;
    recipe_id: string;
    recipe_name: string;
    recipe_nutrition: Recipenutrition;
    recipe_url: string;
    recipe_image?: string;
}

interface Recipenutrition {
    calories: string;
    carbohydrate: string;
    fat: string;
    protein: string;
}