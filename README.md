# Meal Planner Backend API

### Description

This is a simple application using Nodejs, Express and MongoDB.
Using this API one can make optimised meal plans for users.

## Setup and Installation

* Install [Node JS](https://nodejs.org/en/download/) version 8.15.0 or higher.
* No need for `npm install`.
* Replace the placeholder text in `backend/.env` with your mongoDB ATLAS connection string.
* `npm start` in the `backend` directory will start the server.

### End Points:

* POST
    * `/api/food-item/add` to add a `foodItem` in the database
    * `/api/meal/make` to add a `meal` in the database
    * `/api/meal/{id}/add` to add a `foodItem` to a `meal`
    * `/api/meal/{id}/remove` to remove a `foodItem` from a `meal`
    * `/api/user/add` to add a `user` to the database
    * `/api/user/add/{id}` to add a `date` to the `mealPlan` of the user
    * `/api/user/remove/{id}` to remove a `date` from the `mealPlan` of the user
    * `/api/user/add/{id}/{date}` to add a `meal` to the `mealPlan` of a user for a particular `date`
    * `/api/user/remove/{id}/{date}` to remove a `meal` from the `mealPlan` of a user for a particular `date`
* PATCH
    * `/api/food-item/update/{id}` to update the properties of a `foodItem` in the database
    * `/api/meal/{id}/update` to update a `meal` in the database
    * `/api/user/update/{id}` to update the entire `mealPlan` for a particular `user`
    * `/api/user/update/{id}/{date}` to update `mealPlan` for the `user` for a particular `date`
* GET
    * `/api/meal/recommend/{calorieRequirement}` to get a `meal` recommendation on the basis of `calorieRequirement`


### Points to note

* The api returns json data which has only one of `msg`, `err` and `id` as key.
* The **meal recommendation** function is *intentionally* made very **random** because no one likes eating the same meal everyday.
* Since the meal recommendation function was made keeping *randomness* in mind, it would therefore produce *better* results with more `foodItems` in the database.
* Although the meal recommendation function is accessed by a **`GET`** request, the `name` and `category` can be predefined by passing in their values as json. 
* Since the `meal` model had no mention of the `quantity` of `foodItem`s, I did not impliment fractional quantities and stuck to whole numbers for the meal recommendation function.
* Each occurance of a `foodItem` in the `foodItems` array of `meal` represents a whole `foodItem`.
* The recommended `meal` is created considering the `itemWeight` of the `foodItem` and not *100 grams* of it.
* Although, I have tried to keep `name` property unique (in all 3 models). I have not used it to find objects (I used `_id`) since I have not imposed `names` to be unique (in any of the 3 models). 
* I added some extra routes and functions to the project that might come in handy. These are the functionalities they provide.
    * editing a `foodItem`'s properties
    * adding `foodItem`s to `meal`s
    * removing `foodItem`s from `meal`s
    * adding a `date` to the `user`'s `mealPlan`
    * removing a `date` from the `user`'s `mealPlan`
    * adding a `meal` to a `user`'s `mealPlan` for a given `date`
    * removing a `meal` from a `user`'s `mealPlan` for a given `date`
    * updating the `user`'s `mealPlan` for a particular `date`
* Although I have added the variety check (the number of *different* `foodItems` in the *recommended* `meal` are in the range of 2-5).
    * It makes the algorithm slower and hence can be erradicated in some use cases.

### Example *cURL* commands to add/update data

* To add a new `foodItem`
```bash
curl -XPOST http://localhost:5000/api/food-item/add \
-H "Content-Type: application/json" \
-d '{"name": "milk", "calories": 65, "protein": 3.3, "carb": 5, "fat": 4, "acceptedUnits": ["mililiter", "grams"], "itemWeight": 100}'
```
* To update an existing `foodItem`
```bash
curl -XPATCH http://localhost:5000/api/food-item/update/62e05161bf37d8646ca38798 \
-H "Content-Type: application/json" -d '{"name": "milk"}'
```

* To add a new `meal`
```bash
curl -XPOST http://localhost:5000/api/meal/make \
-H "Content-Type: application/json" \
-d '{"category": "Breakfast", "name": "Classic Breakfast", "foodItems": ["62dc8722708830ffb1a7d9cc", "62dc862d708830ffb1a7d9c6", "62e05161bf37d8646ca38798"]}'
```
* To add an existing `foodItem` to a `meal`
```bash
curl -XPOST http://localhost:5000/api/meal/62ddd1c4b556e24d18ec21cf/add \
-H "Content-Type: application/json" \
-d '{"foodItem": "62e05161bf37d8646ca38798"}'
```
* To remove a `foodItem` from an existing `meal`
```bash
curl -XPOST http://localhost:5000/api/meal/62ddd1c4b556e24d18ec21cf/remove \
-H "Content-Type: application/json" \
-d '{"foodItem": "62e05161bf37d8646ca38798"}'
```
* To update an existing `meal`
```bash
curl -XPATCH http://localhost:5000/api/meal/62e054f38699dceafe56f641/update \
-H "Content-Type: application/json" \
-d '{"category": "Lunch"}'
```
* To get a recommended `meal`
```bash
curl -XGET http://localhost:5000/api/meal/recommend/400
```
OR
```bash
curl -XGET http://localhost:5000/api/meal/recommend/400 \
-H "Content-Type: application/json" \
-d '{"category": "Lunch", "name": "recommended Lunch"}'
```

* To add a new `user`
```bash
curl -XPOST http://localhost:5000/api/user/add \
-H "Content-Type: application/json" \
-d '{"name": "Ishaan", "calorieRequirement": 400, "mealPlan": [{"date": "2022-07-24", "meals": ["62ddd1c4b556e24d18ec21cf"]}]}'
```
* To update an existing `user`'s entire `mealPlan`
```bash
curl -XPATCH http://localhost:5000/api/user/update/62e07141354d0cf26563b92e \
-H "Content-Type: application/json" \
-d '{"mealPlan": [{"date": "2022-07-24", "meals": ["62e054f38699dceafe56f641", "62ddd1c4b556e24d18ec21cf", "62ddd1c5b556e24d18ec21d3", "62ddd1c5b556e24d18ec21d1"]}, {"date": "2022-07-25", "meals": ["62ddd1c6b556e24d18ec21d5"]}]}'
```
* To update an existing `user`'s `mealPlan` for a particular `date`
```bash
curl -XPATCH http://localhost:5000/api/user/update/62e07141354d0cf26563b92e/2022-07-25 \
-H "Content-Type: application/json" \
-d '{"meals": []}'
```
* To add a `date` to the `user`'s `mealPlan`
```bash
curl -XPOST http://localhost:5000/api/user/add/62e07141354d0cf26563b92e \
-H "Content-Type: application/json" \
-d '{"date": "2022-07-26"}'
```
* To remove a `date` from the `user`'s `mealPlan`
```bash
curl -XPOST http://localhost:5000/api/user/remove/62e07141354d0cf26563b92e \
-H "Content-Type: application/json" \
-d '{"date": "2022-07-26"}'
```
* To add an existing `meal` to a `user`'s `mealPlan` for a particular `date`
```bash
curl -XPOST http://localhost:5000/api/user/add/62e07141354d0cf26563b92e/2022-07-25 \
-H "Content-Type: application/json" \
-d '{"meal": "62ddd1c6b556e24d18ec21d5"}'
```
* To remove a `meal` from a `user`'s `mealPlan` for a particular `date`
```bash
curl -XPOST http://localhost:5000/api/user/remove/62e07141354d0cf26563b92e/2022-07-25 \
-H "Content-Type: application/json" \
-d '{"meal": "62ddd1c6b556e24d18ec21d5"}'
```

### *The cURL commands I used to add `foodItems` into the database*

P.S. These might help you set up the database quicker.
```bash
curl -XPOST http://localhost:5000/api/food-item/add -H "Content-Type: application/json" -d '{"name": "milk", "calories": 65, "protein": 3.3, "carb": 5, "fat": 4, "acceptedUnits": ["mililiter", "grams"], "itemWeight": 100}'
curl -XPOST http://localhost:5000/api/food-item/add -H "Content-Type: application/json" -d '{"name": "butter", "calories": 740, "protein": 0, "carb": 0, "fat": 82, "acceptedUnits": ["grams"], "itemWeight": 100}'
curl -XPOST http://localhost:5000/api/food-item/add -H "Content-Type: application/json" -d '{"name": "egg", "calories": 150, "protein": 12, "carb": 0, "fat": 11, "acceptedUnits": ["item"], "itemWeight": 50}'
curl -XPOST http://localhost:5000/api/food-item/add -H "Content-Type: application/json" -d '{"name": "chicken (roast)", "calories": 150, "protein": 25, "carb": 0, "fat": 5, "acceptedUnits": ["grams"], "itemWeight": 100}'
curl -XPOST http://localhost:5000/api/food-item/add -H "Content-Type: application/json" -d '{"name": "fish", "calories": 220, "protein": 20, "carb": 8, "fat": 10, "acceptedUnits": ["grams"], "itemWeight": 100}'
curl -XPOST http://localhost:5000/api/food-item/add -H "Content-Type: application/json" -d '{"name": "beans (boiled)", "calories": 20, "protein": 2, "carb": 3, "fat": 0, "acceptedUnits": ["grams"], "itemWeight": 100}'
curl -XPOST http://localhost:5000/api/food-item/add -H "Content-Type: application/json" -d '{"name": "cabbage (boiled)", "calories": 10, "protein": 1, "carb": 1, "fat": 0, "acceptedUnits": ["grams"], "itemWeight": 100}'
curl -XPOST http://localhost:5000/api/food-item/add -H "Content-Type: application/json" -d '{"name": "carrot (boiled)", "calories": 20, "protein": 0.6, "carb": 4, "fat": 0, "acceptedUnits": ["grams", "item"], "itemWeight": 60}'
curl -XPOST http://localhost:5000/api/food-item/add -H "Content-Type: application/json" -d '{"name": "cucumber (raw)", "calories": 10, "protein": 0.6, "carb": 2, "fat": 0, "acceptedUnits": ["grams", "item"], "itemWeight": 300}'
curl -XPOST http://localhost:5000/api/food-item/add -H "Content-Type: application/json" -d '{"name": "peas (boiled)", "calories": 50, "protein": 5, "carb": 8, "fat": 0, "acceptedUnits": ["grams"], "itemWeight": 100}'
curl -XPOST http://localhost:5000/api/food-item/add -H "Content-Type: application/json" -d '{"name": "potatoe (boiled)", "calories": 80, "protein": 1, "carb": 22, "fat": 0, "acceptedUnits": ["grams", "item"], "itemWeight": 200}'
curl -XPOST http://localhost:5000/api/food-item/add -H "Content-Type: application/json" -d '{"name": "tomato", "calories": 15, "protein": 1, "carb": 3, "fat": 0, "acceptedUnits": ["grams", "item"], "itemWeight": 100}'
curl -XPOST http://localhost:5000/api/food-item/add -H "Content-Type: application/json" -d '{"name": "apple", "calories": 45, "protein": 0.3, "carb": 12, "fat": 0, "acceptedUnits": ["grams", "item"], "itemWeight": 200}'
curl -XPOST http://localhost:5000/api/food-item/add -H "Content-Type: application/json" -d '{"name": "banana", "calories": 80, "protein": 1, "carb": 20, "fat": 0, "acceptedUnits": ["grams", "item"], "itemWeight": 100}'
curl -XPOST http://localhost:5000/api/food-item/add -H "Content-Type: application/json" -d '{"name": "grapes", "calories": 60, "protein": 0.6, "carb": 15, "fat": 0, "acceptedUnits": ["grams"], "itemWeight": 100}'
curl -XPOST http://localhost:5000/api/food-item/add -H "Content-Type: application/json" -d '{"name": "orange", "calories": 35, "protein": 1, "carb": 9, "fat": 0, "acceptedUnits": ["grams", "item"], "itemWeight": 130}'
curl -XPOST http://localhost:5000/api/food-item/add -H "Content-Type: application/json" -d '{"name": "beer", "calories": 30, "protein": 0.3, "carb": 2, "fat": 0, "acceptedUnits": ["mililiter"], "itemWeight": 100}'
curl -XPOST http://localhost:5000/api/food-item/add -H "Content-Type: application/json" -d '{"name": "spirits", "calories": 220, "protein": 0, "carb": 0, "fat": 0, "acceptedUnits": ["mililiter"], "itemWeight": 100}'
curl -XPOST http://localhost:5000/api/food-item/add -H "Content-Type: application/json" -d '{"name": "cheese", "calories": 310, "protein": 22, "carb": 0, "fat": 25, "acceptedUnits": ["grams"], "itemWeight": 100}'
curl -XPOST http://localhost:5000/api/food-item/add -H "Content-Type: application/json" -d '{"name": "pork", "calories": 340, "protein": 29, "carb": 0, "fat": 24, "acceptedUnits": ["grams"], "itemWeight": 100}'
```