const { Category } = require('../../models');

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

exports.home = (req, res) => {
  res.render('index', { content: null });
};

// CRUD Categories
exports.getCategories = (req, res) => {
  Category.findAll().then((category) => {
    res.render('index', { content: './page/category', category });
  });
};

exports.postCategory = async (req, res) => {
  const { categoryName } = req.body;

  Category.create({ categoryName })
    .then(() => {
      res.redirect('/categories');
    })
    .catch((err) => {
      res.json(
        successResponse(res, 200, null, { message: err.errors[0].message })
      );
    });
};

exports.viewPostCategory = (req, res) => {
  res.render('index', { content: './page/addCategory' });
};

exports.deleteCategory = (req, res) => {
  const { id } = req.params;
  Category.destroy({
    where: { id },
  }).then(() => {
    res.redirect('/categories');
  });
};

exports.getUpdateCategory = (req, res) => {
  const { id } = req.params;
  Category.findOne({
    where: { id },
  }).then((category) => {
    res.render('index', { content: './page/updateCategory', category });
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
  ).then(() => {
    res.redirect('/categories');
  });
};
