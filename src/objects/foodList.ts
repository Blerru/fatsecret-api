export default interface IFoodList {
    food: Food[];
    max_results: string;
    page_number: string;
    total_results: string;
}

interface Food {
    food_description: string;
    food_id: string;
    food_name: string;
    food_type: string;
    food_url: string;
}