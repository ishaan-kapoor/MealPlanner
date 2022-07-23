# Meal Planner Backend API


End Points:
* POST
    * /api/food-item
    * /api/meal
    * /api/user
* PATCH
    * /api/meal/id
    * /api/user/id




Example commands to add/edit data:
1. **To add foodItem**
```bash
curl -XPOST http://localhost:5000/api/food-item \
-H "Content-Type: application/json" \
-d '{"name":"milk","calories":65,"protein":3.3,"carb":5,"fat":4,"acceptedUnits":["mililiter","grams"],"itemWeight":100}'
```

2. **To add meal**
```bash
curl -XPOST http://localhost:5000/api/meal \
-H "Content-Type: application/json" \
-d '{"category":"Breakfast","name":"Classic Breakfast","foodItems":["62dc8722708830ffb1a7d9cc", "62dc862d708830ffb1a7d9c6", "62dc835909ebb1b5d9966be7"]}'
```

3. **To edit meal**
```bash
curl -XPATCH http://localhost:5000/api/meal/62dc8d3cd9128546db040998 \
-H "Content-Type: application/json" \
-d '{"category":"Lunch"}'
```

4. **To add user**
```bash
curl -XPOST http://localhost:5000/api/user \
-H "Content-Type: application/json" \
-d '{"name":"Ishaan", "calorieRequirement": 400, "mealPlan":[{"meal": "62dc8e3e7f8422b65588d30f", "date": "2022-07-24T14:30:00.000Z"}]}'
```

5. **To edit user's mealPlan**
```bash
curl -XPATCH http://localhost:5000/api/user/62dc94098b0187d8d34c8647 \
-H "Content-Type: application/json" \
-d '{"mealPlan":[{"meal": "62dc8d3cd9128546db040998", "date": "2022-07-24T09:30:00.000+00:00"}, {"meal": "62dc8e3e7f8422b65588d30f", "date": "2022-07-24T14:30:00.000Z"}]}'
```