const express = require('express');
const fs = require('node:fs');
const path = require('node:path');


function setPath(name) {
    const dbPath = path.join(__dirname, `../db/${name}.json`);
    if (!validateDocument(dbPath)) {
        return new Error('The database does not exist');
    }
    return dbPath
}
function validateDocument(path) {
    try {
        return fs.statSync(path).isFile();
    } catch (e) {
        return false;
    }
}
/**
 * Reads the user database and returns its contents as an object.
 * If the database does not exist, creates it and returns an empty object.
 * @returns {Object} The user database object.
 */
const readDB = (name) => {
    const dbPath = setPath(name);
    let document
    if (!validateDocument(dbPath)) {
        fs.writeFileSync(dbPath, '', (err) => {
            if (err) return err;
            return [];
        });
    } else {
        document = fs.readFileSync(dbPath, 'utf-8');
        return JSON.parse(document);
    }
}

/**
 * Writes the provided data to the user database.
 * Converts the data to a JSON string and writes it to the file specified by dbPath.
 * Returns true if the operation is successful, or false if an error occurs.
 * @param {Object} data - The data object to be written to the database.
 * @returns {boolean} - True if the data was written successfully, false otherwise.
 */

const writeDB = (data, name) => {
    const dbPath = setPath(name);
    try {
        fs.writeFileSync(dbPath, JSON.stringify(data));
        return true;
    } catch (e) {
        return false;
    }
}

module.exports = { readDB, writeDB };
