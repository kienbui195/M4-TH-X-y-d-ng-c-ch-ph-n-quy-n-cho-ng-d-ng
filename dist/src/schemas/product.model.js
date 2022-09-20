"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModel = void 0;
const mongoose_1 = require("mongoose");
const productSchema = new mongoose_1.Schema({
    name: String,
    price: Number,
    category: String
});
const ProductModel = (0, mongoose_1.model)('Product', productSchema);
exports.ProductModel = ProductModel;
//# sourceMappingURL=product.model.js.map