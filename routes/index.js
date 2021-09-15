const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/web/categoryController');
const recipeController = require('../controllers/web/recipeController');

/* CRUD Categories */
router.get('/categories', categoryController.getCategories);
router.post('/add-category', categoryController.postCategory);
router.get('/add-category', categoryController.viewPostCategory);
router.get('/category/update/:id', categoryController.getUpdateCategory);
router.post('/category/update/:id', categoryController.postUpdateCategory);
router.get('/category/delete/:id', categoryController.deleteCategory);

router.get('/', recipeController.getHome);
/* CRUD Recipes */
router.get('/recipes', recipeController.getRecipes);
router.get('/add-recipe', recipeController.viewPostRecipe);
router.get('/recipe/delete/:id', recipeController.deleteRecipe);
router.get('/recipe/update/:id', recipeController.getUpdateRecipe);
router.post('/recipe/update/:id', recipeController.postUpdateRecipe);
router.get('/search', recipeController.search);

module.exports = router;
