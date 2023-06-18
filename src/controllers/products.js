const models = require("../models");
const { Op } = require("sequelize");
const logger = require("../services/logger");
const newProductRequest = require("../dto/product_dto");
const updateProductRequest = require("../dto/update_product_dto");

exports.createProduct = async (req, res) => {
    const request = req.body;

    const { error } = newProductRequest.validateNewProductRequest(request);

    if (error) {
        return res.status(400).json({ error: error.details[0].message })
    }

    try {
        const { name, description, price } = req.body;

        const product = await models["product"].create({
            name,
            description,
            price
        });

        return res.status(201).json(product);
    } catch(error) {
        logger.error(error.message);
        return res.status(400).json({ error: error.message });
    }
}

exports.getProduct = async (req, res) => {
    let product = await models["product"].findOne({
        where: {
            id : Number(req.params.id),
            deleted_at: {
                [Op.is]: null
            }
        }
    });

    if (product) {
        res.status(200).json(product);
    } else {
        logger.error(`Failed to find product with id:- ${req.params.id}`)
        res.status(404).json({ message: 'Product not found' });
    }
}


exports.updateProduct = async (req, res) => {
   const request = req.body;

   const { error } = updateProductRequest.validateUpdateProduct(request);
   
   if (error) {
        res.status(400).json({ error: error.details[0].message })
   }

   const productId = Number(req.params.id);

   models["product"].update({
        name: request.name,
        description: request.description,
        price: request.price
   }, {
        where: {
            id: productId,
            deleted_at: {
                [Op.not]: null
            }
        }
   }).then((result) => {
        const affectedRow = result[0];

        if (affectedRow > 0) {
            logger.info(`Updated product id ${productId}`);
            res.status(204).send();
        } else {
            logger.info(`unable to find product for product id:- ${productId}`);
            res.status(400).json({ error: "Product not found"})
        }

   }).catch((error) => {
        logger.error(`Error while updating product with product id ${error.message}`);
        return res.status(400);
   });
}

/**
 * Delete a product based upon product id
 * @param req 
 * @param res 
 */
exports.deleteProduct = async (req, res) => {
    const productId = Number(req.params.id);

    const product = await models["product"].findOne({
        where: {
            id: productId,
            deleted_at: {
                [Op.is]: null
            }
        }
    });

    if (!product) {
        res.status(404).json({ message: "Unable to find product"});
    }

    const [ update ] = await models["product"].update(
        { deleted_at: new Date() },
        { where: { id: productId }}
    );

    if (update === 0) {
        return res.status(400).json({ message: "Failed to delete user" });
    }

    logger.info(`Deleted product with id:- ${productId}`)
    res.status(204).send();
}
