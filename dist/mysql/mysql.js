"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql = require("mysql");
class MySQL {
    constructor() {
        this.connected = false;
        console.log('Initialized class');
        this.cnn = mysql.createConnection({
            host: 'localhost',
            user: 'node_user',
            password: '123456',
            database: 'node_db'
        });
        this.connectDB();
    }
    static get instance() {
        return this._instance || (this._instance = new this());
    }
    static runQuery(query, callback) {
        this.instance.cnn.query(query, (err, results, fields) => {
            if (err) {
                console.log('Error en query');
                console.log(err);
                return callback(err);
            }
            if (results.length === 0) {
                callback('The requested record does not exist');
            }
            else {
                callback(null, results);
            }
        });
    }
    connectDB() {
        this.cnn.connect((err) => {
            if (err) {
                console.log(err.message);
                return;
            }
            this.connected = true;
            console.log('Data base online!');
        });
    }
}
exports.default = MySQL;
