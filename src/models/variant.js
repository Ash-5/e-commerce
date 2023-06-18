const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Variant = sequelize.define('variant', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
          },
          product_id: {
            type: DataTypes.INTEGER,
            allowNull: false
          },
          name: {
            type: DataTypes.CHAR,
            allowNull: false,
          },
          sku: {
            type: DataTypes.INTEGER,
            allowNull: false
          },
          additional_cost: {
            type: DataTypes.INTEGER,
            allowNull: false
          },
          count: {
            type: DataTypes.INTEGER,
            allowNull: false
          },
          deleted_at: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: null
          }
    }, {
      timestamps: false,
      paranoid: false,
    });

    return Variant;
}