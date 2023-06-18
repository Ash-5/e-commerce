const validateNewProductRequest = (product) => {
    const Joi = require("joi");

    const schema = Joi.object({
        name: Joi.string().required(),
        description: Joi.string().required(),
        price: Joi.number().integer().required()
    });

    return schema.validate(product);
}

exports.validateNewProductRequest = validateNewProductRequest;
