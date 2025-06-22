"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const bookSchema = new Schema({
    title: { type: String, required: [true, "Mandatory the book’s title"] },
    author: { type: String, required: true },
    genre: {
        type: String,
        enum: {
            values: [
                "FICTION",
                "NON_FICTION",
                "SCIENCE",
                "HISTORY",
                "BIOGRAPHY",
                "FANTASY",
            ],
        },
        required: true,
    },
    isbn: { type: String, unique: true, required: true },
    description: { type: String, required: true },
    copies: {
        type: Number,
        required: true,
        min: [1, "Copies must be a positive number"],
    },
    available: {
        type: Boolean,
        default: true,
    },
}, {
    versionKey: false,
    timestamps: true,
});
// save
bookSchema.post("save", function (doc, next) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(doc.title);
        next();
    });
});
bookSchema.pre("save", function (next) {
    if (this.copies <= 1) {
        next(new Error("Copies cannot be negative"));
    }
    next();
});
// use middleware if copies<0 error
bookSchema.methods.functionLogic = function (quantity) {
    return __awaiter(this, void 0, void 0, function* () {
        if (this.copies < quantity) {
            throw new Error("Not enough copies available");
        }
        this.copies -= quantity; //1
        if (this.copies <= 0) {
            this.available = false;
        }
        yield this.save(); // 4
    });
};
exports.Book = mongoose_1.default.model("Book", bookSchema);
