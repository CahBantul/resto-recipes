const express = require('express');
const api = express.Router();
const apiController = require('../controllers/api/apiController');

/* CRUD Categories */
api.get('/categories', apiController.getCategories);
api.post('/add-category', apiController.postCategory);
api.post('/category/update/:id', apiController.postUpdateCategory);
api.delete('/category/delete/:id', apiController.deleteCategory);

/* CRUD Recipes */
api.get('/recipes', apiController.getRecipes);
api.post('/add-recipe', apiController.postRecipe);
api.post('/recipe/update/:id', apiController.postUpdateRecipe);
api.get('/search', apiController.search);
api.delete('/recipe/delete/:id', apiController.deleteRecipe);

module.exports = api;
