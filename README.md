# FatSecret API Wrapper

This package is an unofficial [fatsecret.com](https://platform.fatsecret.com/api/) API wrapper for Node.js. The FatSecret API, in addition to many other features, allows you to gather nutritional information about foods.

## Install

```shell
# install locally
npm install fatsecret-api --save
```

## Highlights

-   ✔ Full type-definitions
-   ✔ Automatic access token refreshing
-   ✔ Uses OAUTH2

## Usage

Initialize a new `FatSecretClient` instance with your credentials.

```ts
import { FatSecretClient } from "fatsecret-api";

const fatSecretClient = new FatSecretClient({
    clientId: "YOUR_CLIENT_ID",
    clientSecret: "YOUR_CLIENT_SECRET",
    scope: "SEE_FATSECRET_DOCS",
});
```

### Methods

Examples of basic methods on the `FatSecretClient` instance. To see documentation on parameters and responses please visit the official docs [here](https://platform.fatsecret.com/api/Default.aspx?screen=rapiref2).

```ts
// food.get.v2: Returns detailed nutritional information for the specified food.
await fatSecretClient.getFood({ food_id: "4278773" });

// foods.search: Conducts a search of the food database using the search expression specified.
await fatSecretClient.getFoodSearch({ search_expression: "Cereal" });

// recipe.get: Returns detailed information for the specified recipe.
await fatSecretClient.getRecipe({ recipe_id: "31341" });

// recipes.search: Conducts a search of the recipe database using the search expression specified.
await fatSecretClient.getRecipeSearch({ search_expression: "Brownies" });

// ... to see more methods view the official api docs
```

> 📌 OAUTH1 is currently not supported.
