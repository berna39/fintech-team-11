const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DB,
    max: 20,
    idleTimeoutMillis: 0
});

exports.register = async (data) => {
    try {
        pool.query("INSERT INTO borrowers(name, citizenship, dob, national_id, address, job, username, password) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)", [data.name, data.citizenship, data.dob, data.national_id, data.address, data.job, data.username, data.password ]);
        return true;
    } catch (error) {
        console.log(error.message);
        return false;
    }
};

exports.login = async (username) => {
    try {
        const { rows } = await pool.query('SELECT * FROM borrowers WHERE username=$1', [username]);
        return rows;
    } catch (error) {
        throw error;
    }
};
