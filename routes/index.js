const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/web/categoryController');
const recipeController = require('../controllers/web/recipeController');

router.get('/', categoryController.home);
/* CRUD Categories */
router.get('/categories', categoryController.getCategories);
router.post('/add-category', categoryController.postCategory);
router.get('/add-category', categoryController.viewPostCategory);
router.get('/update/:id', categoryController.getUpdateCategory);
router.post('/update/:id', categoryController.postUpdateCategory);
router.get('/delete/:id', categoryController.deleteCategory);

/* CRUD Recipes */
router.get('/recipes', recipeController.getRecipes);
router.get('/add-recipe', recipeController.viewPostRecipe);
router.post('/add-recipe', recipeController.postRecipe);

module.exports = router;
