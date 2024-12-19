const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Sample recipe data (you can extend this with real data or a database)
const recipes = {
  vegetarian: [
    { name: "Vegetable Stir Fry", calories: 300 },
    { name: "Lentil Soup", calories: 350 },
    { name: "Quinoa Salad", calories: 250 },
  ],
  vegan: [
    { name: "Tofu Scramble", calories: 250 },
    { name: "Vegan Buddha Bowl", calories: 400 },
    { name: "Chickpea Salad", calories: 300 },
  ],
  nonVegetarian: [
    { name: "Chicken Curry", calories: 500 },
    { name: "Beef Stir Fry", calories: 600 },
    { name: "Salmon with Veggies", calories: 450 },
  ]
};

// Function to get recipes based on calorie count and preference
const getRecipes = (calories, type) => {
  if (!recipes[type]) {
    return { error: "Invalid recipe type" };
  }

  return recipes[type].filter(recipe => recipe.calories <= calories);
};

// POST endpoint to get daily recipes based on calorie count and preference
app.post('/get-recipes', (req, res) => {
    const { calories, preference } = req.body;

    if (!calories || !preference) {
        return res.status(400).json({ status: "error", error: "Please provide both calories and preference." });
    }

    const recipeType = recipes[preference];

    if (!calories || !preference) {
        return res.status(400).json({ error: "Please provide calories and preference." });
    }

    const filteredRecipes = recipeType ? recipeType.filter(recipe => recipe.calories <= calories) : { error: "Invalid recipe type" };
        
    if (filteredRecipes.error) {
        return res.status(400).json({ error: filteredRecipes.error });
    }
        
    if (filteredRecipes.length === 0) {
        return res.status(200).json({ message: "No recipes found within the given calorie limit." });
    }
    
    return res.status(200).json({ status: "success", recipes: filteredRecipes});

});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
