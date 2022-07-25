# Meal Planner Backend API

### End Points:
* POST
    * /api/food-item/
    * /api/meal/
    * /api/user/
* PATCH
    * /api/meal/id
    * /api/user/id
* GET
    * /api/meal/calorieRequirement

## __**NOTE**__:

#### The meal recommendation will not work perfectly because the [food database](https://jtmadhavan.files.wordpress.com/2009/09/the-calorie-chart-of-indian-food.pdf) has no food item with 20-30% protein by weight of its calories. Thus, the meal made by these food items can never have the amount of protein within 20-30% by weight of the total calories.

### Example cURL commands to add/edit data

1. To add foodItem
```bash
curl -XPOST http://localhost:5000/api/food-item \
-H "Content-Type: application/json" \
-d '{"name":"milk","calories":65,"protein":3.3,"carb":5,"fat":4,"acceptedUnits":["mililiter","grams"],"itemWeight":100}'
```

2. To add meal
```bash
curl -XPOST http://localhost:5000/api/meal \
-H "Content-Type: application/json" \
-d '{"category":"Breakfast","name":"Classic Breakfast","foodItems":["62dc8722708830ffb1a7d9cc", "62dc862d708830ffb1a7d9c6", "62dc835909ebb1b5d9966be7"]}'
```

3. To edit meal
```bash
curl -XPATCH http://localhost:5000/api/meal/62dc8d3cd9128546db040998 \
-H "Content-Type: application/json" \
-d '{"category":"Lunch"}'
```

4. To get recommended meal
```bash
curl -XGET http://localhost:5000/api/meal/400
```

5. To add user
```bash
curl -XPOST http://localhost:5000/api/user \
-H "Content-Type: application/json" \
-d '{"name":"Ishaan", "calorieRequirement": 400, "mealPlan":[{"meal": "62dc8e3e7f8422b65588d30f", "date": "2022-07-24T14:30:00.000Z"}]}'
```

6. To edit user's mealPlan
```bash
curl -XPATCH http://localhost:5000/api/user/62dc94098b0187d8d34c8647 \
-H "Content-Type: application/json" \
-d '{"mealPlan":[{"meal": "62dc8d3cd9128546db040998", "date": "2022-07-24T09:30:00.000+00:00"}, {"meal": "62dc8e3e7f8422b65588d30f", "date": "2022-07-24T14:30:00.000Z"}]}'
```

### *All the cURL commands I used to add/edit data*
```bash
curl -XPOST http://localhost:5000/api/food-item -H "Content-Type: application/json" -d '{"name": "milk", "calories": 65, "protein": 3.3, "carb": 5, "fat": 4, "acceptedUnits": ["mililiter", "grams"], "itemWeight": 100}'
curl -XPOST http://localhost:5000/api/food-item -H "Content-Type: application/json" -d '{"name": "butter", "calories": 740, "protein": 0, "carb": 0, "fat": 82, "acceptedUnits": ["grams"], "itemWeight": 100}'
curl -XPOST http://localhost:5000/api/food-item -H "Content-Type: application/json" -d '{"name": "egg", "calories": 150, "protein": 12, "carb": 0, "fat": 11, "acceptedUnits": ["item"], "itemWeight": 50}'
curl -XPOST http://localhost:5000/api/food-item -H "Content-Type: application/json" -d '{"name": "chicken (roast)", "calories": 150, "protein": 25, "carb": 0, "fat": 5, "acceptedUnits": ["grams"], "itemWeight": 100}'
curl -XPOST http://localhost:5000/api/food-item -H "Content-Type: application/json" -d '{"name": "fish", "calories": 220, "protein": 20, "carb": 8, "fat": 10, "acceptedUnits": ["grams"], "itemWeight": 100}'
curl -XPOST http://localhost:5000/api/food-item -H "Content-Type: application/json" -d '{"name": "beans (boiled)", "calories": 20, "protein": 2, "carb": 3, "fat": 0, "acceptedUnits": ["grams"], "itemWeight": 100}'
curl -XPOST http://localhost:5000/api/food-item -H "Content-Type: application/json" -d '{"name": "cabbage (boiled)", "calories": 10, "protein": 1, "carb": 1, "fat": 0, "acceptedUnits": ["grams"], "itemWeight": 100}'
curl -XPOST http://localhost:5000/api/food-item -H "Content-Type: application/json" -d '{"name": "carrot (boiled)", "calories": 20, "protein": 0.6, "carb": 4, "fat": 0, "acceptedUnits": ["grams", "item"], "itemWeight": 60}'
curl -XPOST http://localhost:5000/api/food-item -H "Content-Type: application/json" -d '{"name": "cucumber (raw)", "calories": 10, "protein": 0.6, "carb": 2, "fat": 0, "acceptedUnits": ["grams", "item"], "itemWeight": 300}'
curl -XPOST http://localhost:5000/api/food-item -H "Content-Type: application/json" -d '{"name": "peas (boiled)", "calories": 50, "protein": 5, "carb": 8, "fat": 0, "acceptedUnits": ["grams"], "itemWeight": 100}'
curl -XPOST http://localhost:5000/api/food-item -H "Content-Type: application/json" -d '{"name": "potatoe (boiled)", "calories": 80, "protein": 1, "carb": 22, "fat": 0, "acceptedUnits": ["grams", "item"], "itemWeight": 200}'
curl -XPOST http://localhost:5000/api/food-item -H "Content-Type: application/json" -d '{"name": "tomato", "calories": 15, "protein": 1, "carb": 3, "fat": 0, "acceptedUnits": ["grams", "item"], "itemWeight": 100}'
curl -XPOST http://localhost:5000/api/food-item -H "Content-Type: application/json" -d '{"name": "apple", "calories": 45, "protein": 0.3, "carb": 12, "fat": 0, "acceptedUnits": ["grams", "item"], "itemWeight": 200}'
curl -XPOST http://localhost:5000/api/food-item -H "Content-Type: application/json" -d '{"name": "banana", "calories": 80, "protein": 1, "carb": 20, "fat": 0, "acceptedUnits": ["grams", "item"], "itemWeight": 100}'
curl -XPOST http://localhost:5000/api/food-item -H "Content-Type: application/json" -d '{"name": "grapes", "calories": 60, "protein": 0.6, "carb": 15, "fat": 0, "acceptedUnits": ["grams"], "itemWeight": 100}'
curl -XPOST http://localhost:5000/api/food-item -H "Content-Type: application/json" -d '{"name": "orange", "calories": 35, "protein": 1, "carb": 9, "fat": 0, "acceptedUnits": ["grams", "item"], "itemWeight": 130}'
curl -XPOST http://localhost:5000/api/food-item -H "Content-Type: application/json" -d '{"name": "beer", "calories": 30, "protein": 0.3, "carb": 2, "fat": 0, "acceptedUnits": ["mililiter"], "itemWeight": 100}'
curl -XPOST http://localhost:5000/api/food-item -H "Content-Type: application/json" -d '{"name": "spirits", "calories": 220, "protein": 0, "carb": 0, "fat": 0, "acceptedUnits": ["mililiter"], "itemWeight": 100}'
curl -XPOST http://localhost:5000/api/food-item -H "Content-Type: application/json" -d '{"name": "cheese", "calories": 310, "protein": 22, "carb": 0, "fat": 25, "acceptedUnits": ["grams"], "itemWeight": 100}'
curl -XPOST http://localhost:5000/api/food-item -H "Content-Type: application/json" -d '{"name": "pork", "calories": 340, "protein": 29, "carb": 0, "fat": 24, "acceptedUnits": ["grams"], "itemWeight": 100}'

curl -XPOST http://localhost:5000/api/meal -H "Content-Type: application/json" -d '{"category": "Breakfast", "name": "Classic Breakfast", "foodItems": ["62dc8722708830ffb1a7d9cc", "62dc862d708830ffb1a7d9c6", "62dc835909ebb1b5d9966be7"]}'
curl -XPOST http://localhost:5000/api/meal -H "Content-Type: application/json" -d '{"category": "Lunch", "name": "Meaty Lunch", "foodItems": ["62dc86a9708830ffb1a7d9c8", "62dc86fa708830ffb1a7d9ca", "62dc8b48d9128546db040996"]}'
curl -XPOST http://localhost:5000/api/meal -H "Content-Type: application/json" -d '{"category": "Dinner", "name": "Tipsy Dinner", "foodItems": ["62dc8a5bb7e0ebe05d6510d9", "62dc8a94d9128546db040990", "62dc89bc708830ffb1a7d9e0"]}'
curl -XPOST http://localhost:5000/api/meal -H "Content-Type: application/json" -d '{"category": "Evening Snack", "name": "Veggie Snack", "foodItems": ["62dc879c708830ffb1a7d9d0", "62dc87fc708830ffb1a7d9d2", "62dc88cc708830ffb1a7d9d8"]}'
curl -XPOST http://localhost:5000/api/meal -H "Content-Type: application/json" -d '{"category": "Evening Snack", "name": "Fruity Snack", "foodItems": ["62dc890f708830ffb1a7d9da", "62dc8946708830ffb1a7d9dc", "62dc896c708830ffb1a7d9de", "62dc89bc708830ffb1a7d9e0"]}'

curl -XPOST http://localhost:5000/api/user -H "Content-Type: application/json" -d '{"name": "Ishaan", "calorieRequirement": 400, "mealPlan": [{"date": "2022-07-24T21:30:00.000Z", "meal": "62ddd1c5b556e24d18ec21d1"}]}'

curl -XPATCH http://localhost:5000/api/user/62dca3b6a17aeaa773f2dfb9 -H "Content-Type: application/json" -d '{"mealPlan": [{"date": "2022-07-24T09:30:00.000+00:00", "meal": "62ddd1c4b556e24d18ec21cd"}, {"date": "2022-07-24T14:30:00.000Z", "meal": "62ddd1c4b556e24d18ec21cf"}, {"date": "2022-07-24T18:30:00.000Z", "meal": "62ddd1c5b556e24d18ec21d3"}, {"date": "2022-07-24T21:00:00.000Z", "meal": "62ddd1c5b556e24d18ec21d1"}, {"date": "2022-07-25T18:30:00.000Z", "meal": "62ddd1c6b556e24d18ec21d5"}]}'

curl -XPATCH http://localhost:5000/api/meal/62ddd1c4b556e24d18ec21cf -H "Content-Type: application/json" -d '{"category":"Lunch"}'

curl -XGET http://localhost:5000/api/meal/400
```
These might help you set up the database quicker.