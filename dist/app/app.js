"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const cors_1 = __importDefault(require("cors"));
const book_route_1 = __importDefault(require("../routes/book.route"));
const borrow_route_1 = __importDefault(require("../routes/borrow.route"));
// middleware
app.use(express_1.default.json());
// cors
app.use((0, cors_1.default)({
    origin: [
        "http://localhost:5173",
        "https://magical-kangaroo-1871da.netlify.app",
        "https://magical-kangaroo-1871da.netlify.app",
    ],
}));
// book
app.use("/api", book_route_1.default);
app.use("/api/borrow", borrow_route_1.default);
// books-collection LIbraryDB
app.get("/", (req, res) => {
    res.send("Library api server running");
});
exports.default = app;
