'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Recipe extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Recipe.belongsTo(models.Category, {
        as: 'Category',
        foreignKey: 'categoryId',
      });
    }
  }
  Recipe.init(
    {
      foodName: DataTypes.STRING,
      categoryId: DataTypes.INTEGER,
      ingredients: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Recipe',
    }
  );
  return Recipe;
};
