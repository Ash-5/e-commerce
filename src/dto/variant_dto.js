
const validateNewVariantRequest = (variant) => {
    const Joi = require("joi");

    const schema = Joi.object({
        product_id: Joi.number().required(),
        name: Joi.string().required(),
        sku: Joi.number().required(),
        additional_cost: Joi.number().required(),
        count: Joi.number().required()
    });

    return schema.validate(variant);
}

exports.validateNewVariantRequest = validateNewVariantRequest;
