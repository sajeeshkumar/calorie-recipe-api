const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

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

describe('POST /get-recipes', () => {
		it('should return 400 if calories or preference is missing', async () => {
				const response = await request(app)
						.post('/get-recipes')
						.send({ calories: 300 });
				expect(response.status).toBe(400);
				expect(response.body.error).toBe("Please provide both calories and preference.");
		});

		it('should return 400 if invalid recipe type is provided', async () => {
				const response = await request(app)
						.post('/get-recipes')
						.send({ calories: 300, preference: 'invalidType' });
				expect(response.status).toBe(400);
				expect(response.body.error).toBe("Invalid recipe type");
		});

		it('should return 200 with no recipes found message if no recipes match the criteria', async () => {
				const response = await request(app)
						.post('/get-recipes')
						.send({ calories: 100, preference: 'vegetarian' });
				expect(response.status).toBe(200);
				expect(response.body.message).toBe("No recipes found within the given calorie limit.");
		});

		it('should return 200 with filtered recipes if valid criteria is provided', async () => {
				const response = await request(app)
						.post('/get-recipes')
						.send({ calories: 300, preference: 'vegetarian' });
				expect(response.status).toBe(200);
				expect(response.body.status).toBe("success");
				expect(response.body.recipes.length).toBeGreaterThan(0);
		});
});