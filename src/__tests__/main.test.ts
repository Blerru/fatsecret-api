import "dotenv/config";
import { FatSecretClient } from "../index";

const client = new FatSecretClient({
    clientId: process.env["FATSECRET_CLIENT_ID"] || "",
    clientSecret: process.env["FATSECRET_CLIENT_SECRET"] || "",
    scope: "premier" // I don't hav premier so I cannot test the premier features
});

describe("getFood - food.get.v2", () => {
    it("should return a food which isn't undefined", async () => {
        const result = await client.getFood({ food_id: "4278773" });
        expect(result).toBeDefined();
    });
});

describe("getFoodAutocomplete - foods.autocomplete", () => {
    it("should return an array of autocomplete results", async () => {
        const result = await client.getFoodAutocomplete({ expression: "Tomato" });
        expect(result).toBeInstanceOf(Array);
    });
});

describe("getFoodSearch - foods.search", () => {
    it("should return an array of foods", async () => {
        const result = await client.getFoodSearch({ search_expression: "Cereal" });
        expect(result.food).toBeInstanceOf(Array);
    });
});

describe("getFoodBrands - food_brands.get", () => {
    it("should return an array of brands", async () => {
        const result = await client.getFoodBrands({ starts_with: "Pep" });
        expect(result).toBeInstanceOf(Array);
    });
});

describe("getFoodCategories - food_categories.get", () => {
    it("should return an array of categories", async () => {
        const result = await client.getFoodCategories({});
        expect(result).toBeInstanceOf(Array);
    });
});

describe("getFoodSubCategories - food_sub_categories.get", () => {
    it("should return an array of sub categories", async () => {
        const result = await client.getFoodSubCategories({ food_category_id: 2 /* Beverage*/ });
        expect(result).toBeInstanceOf(Array);
    });
});

describe("getRecipe - recipe.get", () => {
    it("should return a recipe object", async () => {
        const result = await client.getRecipe({ recipe_id: "31341" });
        expect(result).toBeDefined();
    });
});

describe("getRecipeSearch - recipe.search", () => {
    it("should return a an array of recipes", async () => {
        const result = await client.getRecipeSearch({ search_expression: "Brownies" });
        expect(result.recipe).toBeDefined();
    });
});

describe("getRecipeTypes - recipe_types.get", () => {
    it("should return a an array of recipe types", async () => {
        const result = await client.getRecipeTypes({});
        expect(result).toBeDefined();
    });
});