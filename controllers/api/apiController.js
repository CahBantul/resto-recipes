const { Recipe, Category } = require('../../models');
const { Op } = require('sequelize');

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

// CRUD Categories
exports.getCategories = (req, res) => {
  Category.findAll()
    .then((category) => {
      res.json(successResponse(res, 200, category));
    })
    .catch((err) => {
      res.json(
        successResponse(res, 200, null, { message: err.errors[0].message })
      );
    });
};

exports.postCategory = async (req, res) => {
  const { categoryName } = req.body;

  Category.create({ categoryName })
    .then((category) => {
      res.json(successResponse(res, 201, category));
    })
    .catch((err) => {
      res.json(
        successResponse(res, 200, null, { message: err.errors[0].message })
      );
    });
};

exports.postUpdateCategory = (req, res) => {
  const { id } = req.params;
  const { categoryName } = req.body;
  Category.update(
    {
      categoryName,
    },
    {
      where: { id },
    }
  )
    .then(() => {
      res.json(successResponse(res, 201, null));
    })
    .catch((err) => {
      res.json(
        successResponse(res, 200, null, { message: err.errors[0].message })
      );
    });
};

exports.deleteCategory = (req, res) => {
  const { id } = req.params;
  Category.destroy({
    where: { id },
  })
    .then(() => {
      res.json(successResponse(res, 200, null));
    })
    .catch((err) => {
      res.json(
        successResponse(res, 200, null, { message: err.errors[0].message })
      );
    });
};

// CRUD Recipes
exports.getRecipes = (req, res) => {
  Recipe.findAll({ include: [{ model: Category, as: 'Category' }] })
    .then((recipes) => {
      res.json(successResponse(res, 200, recipes));
    })
    .catch((err) => {
      res.json(
        successResponse(res, 200, null, { message: err.errors[0].message })
      );
    });
};

exports.postRecipe = async (req, res) => {
  const { foodName, categoryId, ingredients } = req.body;

  Recipe.create({ foodName, categoryId, ingredients })
    .then((recipe) => {
      res.json(successResponse(res, 201, recipe));
    })
    .catch((err) => {
      res.json(
        successResponse(res, 200, null, { message: err.errors[0].message })
      );
    });
};

exports.postUpdateRecipe = (req, res) => {
  const { id } = req.params;
  const { foodName, categoryId, ingredients } = req.body;
  Recipe.update({ foodName, categoryId, ingredients }, { where: { id } })
    .then(() => {
      res.json(successResponse(res, 201, null));
    })
    .catch((err) => {
      res.json(
        successResponse(res, 200, null, { message: err.errors[0].message })
      );
    });
};

exports.search = (req, res) => {
  const search = req.query.search;
  Recipe.findAll({
    where: {
      ingredients: { [Op.iLike]: '%' + search + '%' },
    },
    include: [{ model: Category, as: 'Category' }],
  })
    .then((search) => {
      res.json(successResponse(res, 200, search));
    })
    .catch((err) => {
      res.json(
        successResponse(res, 200, null, { message: err.errors[0].message })
      );
    });
};

exports.deleteRecipe = (req, res) => {
  const { id } = req.params;
  Recipe.destroy({
    where: { id },
  })
    .then(() => {
      res.json(successResponse(res, 200, null));
    })
    .catch((err) => {
      res.json(
        successResponse(res, 200, null, { message: err.errors[0].message })
      );
    });
};
