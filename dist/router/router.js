"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mysql_1 = __importDefault(require("../mysql/mysql"));
const router = express_1.Router();
router.get('/heroes', (req, res) => {
    const query = `
        SELECT *
        FROM heroes
    `;
    mysql_1.default.runQuery(query, (err, heroes) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                error: err
            });
        }
        res.json({
            ok: true,
            heroes
        });
    });
});
router.get('/heroes/:id', (req, res) => {
    const escapedId = mysql_1.default.instance.cnn.escape(req.params.id);
    const query = `
        SELECT *
        FROM heroes
        WHERE id = ${escapedId}
    `;
    mysql_1.default.runQuery(query, (err, heroe) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                error: err
            });
        }
        res.json({
            ok: true,
            heroe: heroe[0]
        });
    });
});
exports.default = router;
