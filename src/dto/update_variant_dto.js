
const validateUpdateVariantRequest = (variant) => {
    const Joi = require("joi");

    const schema = Joi.object({
        product_id: Joi.number(),
        name: Joi.string(),
        sku: Joi.number(),
        additional_cost: Joi.number(),
        count: Joi.number()
    });

    return schema.validate(variant);
}

exports.validateUpdateVariantRequest = validateUpdateVariantRequest;
