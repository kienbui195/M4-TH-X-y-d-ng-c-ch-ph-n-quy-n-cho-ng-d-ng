"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const router_1 = __importDefault(require("./src/router/router"));
const app = (0, express_1.default)();
const port = 8080;
const DB_URL = 'mongodb://localhost:27017/dbdemo';
app.use(body_parser_1.default.json());
app.set('view engine', 'ejs');
app.set('views', './src/views');
mongoose_1.default.connect(DB_URL)
    .then(() => console.log(`DB connected`))
    .catch(err => console.log(err.message));
app.use('/api', router_1.default);
app.listen(port, () => {
    console.log(`running at http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map