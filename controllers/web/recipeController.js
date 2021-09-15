const { Recipe, Category } = require('../../models');

const messages = {
  200: 'sukses',
  201: 'data berhasil disimpan',
  400: 'not found',
};
function successResponse(res, code, data = {}, meta = {}) {
  res.status(code).json({
    data,
    meta: {
      code,
      message: messages[code.toString()],
      ...meta,
    },
  });
}

// CRUD Recipes
exports.getRecipes = (req, res) => {
  Recipe.findAll({ include: [{ model: Category, as: 'Category' }] }).then(
    (recipe) => {
      res.render('index', { content: './page/recipe', recipe });
      // res.json(recipe[0].Category);
    }
  );
};

exports.postRecipe = async (req, res) => {
  const { foodName, categoryId, ingredients } = req.body;

  Recipe.create({ foodName, categoryId, ingredients })
    .then((recipe) => {
      res.redirect('/recipes');
      // res.json(successResponse(res, 201, recipe));
    })
    .catch((err) => {
      res.json(
        successResponse(res, 200, null, { message: err.errors[0].message })
      );
    });
};

exports.viewPostRecipe = (req, res) => {
  Category.findAll().then((category) => {
    res.render('index', { content: './page/addRecipe', category });
  });
};