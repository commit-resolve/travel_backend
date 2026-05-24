const pool = require('../config/db');

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const isValidPhone = (phone) => /^\d{7,15}$/.test(phone);

exports.createUserAccount = async (req, res) => {
    const {
        user_first_name,
        user_last_name,
        user_phone,
        user_email,
        user_unique_name,
        user_password,
        user_account_request,
    } = req.body;

    if (!user_first_name || !user_email || !user_unique_name || !user_password) {
        return res.status(400).json({ status: 'ERROR', message: 'user_first_name, user_email, user_unique_name and user_password are required' });
    }

    if (!isValidEmail(user_email)) {
        return res.status(400).json({ status: 'ERROR', message: 'Invalid email format' });
    }

    if (user_phone && !isValidPhone(user_phone)) {
        return res.status(400).json({ status: 'ERROR', message: 'Phone must contain only digits and be 7 to 15 characters long' });
    }

    const query = `
        INSERT INTO users_accounts (
            user_first_name,
            user_last_name,
            user_phone,
            user_email,
            user_unique_name,
            user_password,
            user_account_status
        ) VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *
    `;

    const values = [
        user_first_name,
        user_last_name,
        user_phone,
        user_email,
        user_unique_name,
        user_password,
        user_account_request,
    ];

    try {
        const result = await pool.query(query, values);
        res.status(201).json({ status: 'OK', data: result.rows[0] });
    } catch (err) {
        res.status(500).json({ status: 'ERROR', message: err.message });
    }
};

exports.createGroup = async (req, res) => {
    const {
        group_name,
        group_users,
        group_admins,
        group_balance,
        group_status_request,
        created_by
    } = req.body;

    if (!group_name || !group_users || !group_admins) {
        return res.status(400).json({ status: 'ERROR', message: 'group_name, group_users and group_admins are required' });
    }

    if (!Array.isArray(group_users) || !Array.isArray(group_admins)) {
        return res.status(400).json({ status: 'ERROR', message: 'group_users and group_admins must be arrays' });
    }

    const query = `
        INSERT INTO groups (
            group_name,
            group_users,
            group_admins,
            group_balance,
            group_status,
            created_by
        ) VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *
    `;

    const values = [
        group_name,
        group_users,
        group_admins,
        group_balance,
        group_status_request,
        created_by,
    ];

    try {
        const result = await pool.query(query, values);
        res.status(201).json({ status: 'OK', data: result.rows[0] });
    } catch (err) {
        res.status(500).json({ status: 'ERROR', message: err.message });
    }
};