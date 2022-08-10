import axios, { Axios } from "axios";

import IFoodId from "../objects/foodId";
import IFood from "../objects/food";
import IFoodList from "../objects/foodList";
import IFoodBrand from "../objects/foodBrand";
import IFoodCategory from "../objects/foodCategory";
import IRecipe from "../objects/recipe";
import IRecipeList from "../objects/recipeList";

interface IFatSecretCredentials {
    clientId: string;
    clientSecret: string;
    scope: "basic" | "premier" | "barcode" | "localization";
}

interface IGetFoodIdFromBarcode {
    barcode: string;
}

interface IGetFood {
    food_id: number | string; // TODO: figure out if string or number, docs says number but should actually be string???

    include_sub_categories?: boolean;
    flag_default_serving?: boolean;
    region?: string;
    language?: string;
}

interface IGetFoodAutocomplete {
    expression: string;
    max_results?: number;

    region?: string;
    language?: string;
}

interface IGetFoodSearch {
    search_expression?: string;
    page_number?: number;
    max_results?: number;
    generic_description?: "weight" | "portion";
    region?: string;
    language?: string;
}

interface IGetFoodBrands {
    starts_with?: string;
    brand_type?: "manufacturer" | "restaurant" | "supermarket"
    region?: string;
    language?: string;
}

interface IGetFoodCategories {
    region?: string;
    language?: string;
}

interface IGetFoodSubCategories {
    food_category_id: number;
    region?: string;
    language?: string;
}

interface IGetRecipe {
    recipe_id: string | number; // see IGetFood `food_id` for more information
}

interface IGetRecipeSearch {
    search_expression?: string;
    recipe_type?: string;
    page_number?: number;
    max_results?: number;
}

export default class FatSecretClient {
    private clientId: string;
    private clientSecret: string;
    private scope: string;

    private client: Axios;

    private readonly OAUTH_URL = "https://oauth.fatsecret.com/connect/token";
    public readonly API_URL = "https://platform.fatsecret.com/rest/server.api";

    constructor(credentials: IFatSecretCredentials) {
        this.clientId = credentials.clientId;
        this.clientSecret = credentials.clientSecret;
        this.scope = credentials.scope;

        // create a new axios client
        this.client = axios.create({});

        // setup interceptor to handle throwing error on api fail
        this.client.interceptors.response.use((response) => {
            // if error exists in data
            if (response.data.error) {
                return Promise.reject(response);
            }

            return response
        });

        // setup interceptor to handle refreshing token on error
        this.client.interceptors.response.use(response => response, async (error) => {
            // get original request
            const originalRequest = error.config;

            if (error.data.error && error.data.error["code"] === 2 && !originalRequest._retry) {
                // add _retry to request to prevent retrying infinitely
                originalRequest._retry = true;

                // attempt to re-authenticate
                await this._authenticate();

                // retry request
                return this.client.request(originalRequest);
            }

            // if not throw error
            return Promise.reject(error);
        });
    }

    async _authenticate() {
        // create request form data body
        const formData = new URLSearchParams({
            "grant_type": "client_credentials",
            "scope": this.scope
        });

        // send request
        const response = await this.client.post(this.OAUTH_URL, formData,
            {
                auth: {
                    username: this.clientId,
                    password: this.clientSecret
                },
                headers: { 'content-type': 'application/x-www-form-urlencoded' },
            }
        );

        // create access token
        const accessToken = "Bearer " + response.data["access_token"];

        // set authorization header to access token
        this.client.defaults.headers.common.Authorization = accessToken;

        return response;
    }

    private _doRequest(method: string, params: any) {
        return this.client.post(this.API_URL, {}, {
            params: {
                method: method,
                ...params
            }
        });
    }

    async getFoodIdFromBarcode(params: IGetFoodIdFromBarcode) {
        const response = await this._doRequest("food.find_id_for_barcode", {
            format: "json",
            ...params
        });

        return (<IFoodId>response.data).food_id.value;
    }

    async getFood(params: IGetFood) {
        const response = await this._doRequest("food.get.v2", {
            format: "json",
            ...params
        });

        return (<IFood>response.data.food);
    }

    async getFoodAutocomplete(params: IGetFoodAutocomplete) {
        const response = await this._doRequest("foods.autocomplete", {
            format: "json",
            ...params
        });

        return <string[]>response.data.suggestions.suggestion
    }

    async getFoodSearch(params: IGetFoodSearch) {
        const response = await this._doRequest("foods.search", {
            format: "json",
            ...params
        });

        return (<IFoodList>response.data.foods);
    }

    async getFoodBrands(params: IGetFoodBrands) {
        const response = await this._doRequest("food_brands.get", {
            format: "json",
            ...params
        });

        return (<IFoodBrand[]>response.data.food_brands.food_brand);
    }

    async getFoodCategories(params: IGetFoodCategories) {
        const response = await this._doRequest("food_categories.get", {
            format: "json",
            ...params
        });

        return (<IFoodCategory[]>response.data.food_categories.food_category);
    }

    async getFoodSubCategories(params: IGetFoodSubCategories) {
        const response = await this._doRequest("food_sub_categories.get", {
            format: "json",
            ...params
        });

        return (<string[]>response.data.food_sub_categories.food_sub_category);
    }

    async getRecipe(params: IGetRecipe) {
        const response = await this._doRequest("recipe.get", {
            format: "json",
            ...params
        });

        return <IRecipe>response.data.recipe
    }

    async getRecipeSearch(params: IGetRecipeSearch) {
        const response = await this._doRequest("recipes.search", {
            format: "json",
            ...params
        });

        return (<IRecipeList>response.data.recipes);
    }

    async getRecipeTypes(params: any) {
        const response = await this._doRequest("recipe_types.get", {
            format: "json",
            ...params
        });

        return (<string[]>response.data.recipe_types.recipe_type);
    }
}

