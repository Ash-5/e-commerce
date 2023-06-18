const models = require("../models");
const { Op } = require("sequelize");
const logger = require("../services/logger");
const validateNewVariantRequest = require("../dto/variant_dto");
const validateUpdateVariantRequest = require("../dto/update_variant_dto");

exports.getVariant = async (req, res) => {
    let variant = await models["variant"].findOne({
        where: {
            id: Number(req.params.id),
            deleted_at: {
                [Op.is]: null
            }
        }
    });

    if (variant) {
        res.status(200).json(variant);
    } else {
        logger.error(`Failed to find variant with id:- ${req.params.id}`);
        res.status(404).json({ message: 'Variant not found'});
    }
}

exports.createVariant = async (req, res) => {
    const request = req.body;

    const { error } = validateNewVariantRequest.validateNewVariantRequest(request);

    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    try {
        const {product_id, name, sku, additional_cost, count} = req.body;

        const variant = await models["variant"].create({
            product_id,
            name,
            sku,
            additional_cost,
            count
        });

        return res.status(201).json(variant);
    } catch (error) {
        logger.error(error.message);
        return res.status(400).json({ error: error.message });
    }
}

exports.updateVariant = async (req, res) => {
    const request = req.body;

    const { error } = validateUpdateVariantRequest.validateUpdateVariantRequest(request);

    if (error) {
        res.status(400).json({ error: error.details[0].message });
    }

    const variantId = Number(req.params.id);

    models["variant"].update({
        name: request.name,
        sku: request.sku,
        additional_cost: request.additional_cost,
        count: request.count
    }, {
        where: {
            id: variantId,
            deleted_at: {
                [Op.not]: null
            }
        }
    }).then((result) => {
        const affectedRow = result[0];

        if (affectedRow > 0) {
            logger.info(`Updated variant with id ${variantId}`);
            res.status(204).send();
        } else {
            logger.info(`unable to find variant for variant id:- ${variantId}`);
            res.status(400).json({ error: "Variant not found"})
        }
    }).catch((error) => {
        logger.error(`Error while updating variant with variant id ${error.message}`);
        return res.status(400).json({ message: error.message });
    })
}

exports.deleteVariant = async (req, res) => {
    const variantId = Number(req.params.id);

    const variant = await models["variant"].findOne({
        where: {
            id: variantId,
            deleted_at: {
                [Op.is]: null
            }
        }
    });

    if (!variant) {
        res.status(404).json({ message: "Unable to find variant" });
    }

    const [ update ] = await models["variant"].update(
        {deleted_at: new Date() },
        { where: { id: variantId }}
    );

    if (update === 0) {
        return res.status(400).json({ message: "Failed to delete variant "});
    }

    logger.info(`Deleted variant with id:- ${variantId}`);
    res.status(204).send();
}
