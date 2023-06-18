const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const Product = sequelize.define('product', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.CHAR,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        deleted_at:{
            type: DataTypes.DATE,
            allowNull: true
        }
    }, {
        timestamps: false,
        paranoid: false,
    });

    return Product;
}