const validateUpdateProduct = (product) => {
    const Joi = require("joi");

    const schema = Joi.object({
        name: Joi.string(),
        description: Joi.string(),
        price: Joi.number().integer()
    });

    return schema.validate(product);
}

exports.validateUpdateProduct = validateUpdateProduct;
