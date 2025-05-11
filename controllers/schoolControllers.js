import pool from "../config/db.js";


export const addSchool = async (req, res) => {
    const { name, address, latitude, longitude } = req.body;

    // missing fields
    if (!name || !address || !latitude || !longitude) {
        return res.status(400).json({ error: 'Missing required fields: name, address, latitude, or longitude.' });
    }

    // data types
    if (typeof name !== 'string' || typeof address !== 'string') {
        return res.status(400).json({ error: 'Name and address must be strings.' });
    }
    if (isNaN(latitude) || isNaN(longitude)) {
        return res.status(400).json({ error: 'Latitude and longitude must be numeric.' });
    }

    // Latitude and longitude ranges
    if (latitude < -90 || latitude > 90) {
        return res.status(400).json({ error: 'Latitude must be between -90 and 90.' });
    }
    if (longitude < -180 || longitude > 180) {
        return res.status(400).json({ error: 'Longitude must be between -180 and 180.' });
    }

    try {
        const [result] = await pool.query(
            'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)',
            [name, address, latitude, longitude]
        );

        res.status(201).json({
            id: result.insertId,
            name,
            address,
            latitude,
            longitude
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while adding the school: ' + error.message });
    }
};
