export default interface IFood {
    food_id: string;
    food_name: string;
    food_type: string;
    food_url: string;
    servings: Servings;
}

interface Servings {
    serving: Serving;
}

interface Serving {
    added_sugars: string;
    calcium: string;
    calories: string;
    carbohydrate: string;
    cholesterol: string;
    fat: string;
    fiber: string;
    iron: string;
    measurement_description: string;
    metric_serving_amount: string;
    metric_serving_unit: string;
    monounsaturated_fat: string;
    number_of_units: string;
    polyunsaturated_fat: string;
    potassium: string;
    protein: string;
    saturated_fat: string;
    serving_description: string;
    serving_id: string;
    serving_url: string;
    sodium: string;
    sugar: string;
    trans_fat: string;
    vitamin_a: string;
    vitamin_c: string;
    vitamin_d: string;
}