# Calorie-Based Recipe API

This is a Node.js-based REST API that provides daily recipes based on a user's calorie intake and dietary preference (vegetarian, vegan, or non-vegetarian).

## Features

- Accepts a calorie count and dietary preference as input.
- Returns a list of recipes matching the user's preferences.
- Supports vegetarian, vegan, and non-vegetarian options.

## Endpoints

### **POST /get-recipes**

#### Request
- **Content-Type**: `application/json`
- **Body**:
  ```json
  {
    "calories": 400,
    "preference": "vegetarian"
  }

#### Response
- Success
{
  "recipes": [
    { "name": "Vegetable Stir Fry", "calories": 300 },
    { "name": "Lentil Soup", "calories": 350 }
  ]
}
- Error (400)
{
  "error": "Invalid recipe type"
}
- No Recipes Found
{
  "message": "No recipes found within the given calorie limit."
}

#### Getting Started

## Prerequisites
Node.js installed on your system

#### Installation

- Clone the repository
- cd calorie-recipe-api
- Install dependencies: npm install
- Start server : node app.js
- Test cases: npm test