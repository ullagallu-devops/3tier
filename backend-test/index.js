require('dotenv').config();

if (process.env.NEW_RELIC_LICENSE_KEY) {
  console.log('✅ New Relic is enabled.');
  require('newrelic');
} else {
  console.warn('⚠️ NEW_RELIC_LICENSE_KEY is not set. Skipping New Relic initialization.');
}

require('./otel');  

const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const db = require('./db-config'); // Ensure this is properly configured with pooling
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST || '0.0.0.0';
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || '*';

// Middleware
app.use(helmet());
app.use(cors({ origin: ALLOWED_ORIGIN }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

console.log(`CORS: Allowed origin is set to ${ALLOWED_ORIGIN}`);

// Helper function for standardized error responses
const errorResponse = (res, code, message) => res.status(code).json({ error: message });

// Preflight Request Handling
app.options('/api/entries', cors());

// Health Check Route
app.get('/health', (req, res) => {
  res.status(200).send(`
    <html>
      <body style="font-family: Arial, sans-serif; text-align: center; margin-top: 20px;">
        <h1 style="color: green;">Server is healthy</h1>
      </body>
    </html>
  `);
});

// Fetch All Entries with Pagination
app.get('/api/entries', async (req, res) => {
  const limit = parseInt(req.query.limit, 10) || 10;
  const offset = parseInt(req.query.offset, 10) || 0;

  try {
    const [results] = await db.promise().query('SELECT * FROM entries LIMIT ? OFFSET ?', [limit, offset]);
    res.json(results);
  } catch (err) {
    console.error('Database Error:', err);
    errorResponse(res, 500, 'Failed to fetch entries');
  }
});

// Add New Entry
app.post('/api/entries', async (req, res) => {
  const { amount, description } = req.body;

  if (!amount || !description) {
    return errorResponse(res, 400, 'Amount and description are required');
  }

  try {
    const query = 'INSERT INTO entries (amount, description) VALUES (?, ?)';
    const [result] = await db.promise().query(query, [amount, description]);
    console.log('Inserted entry with ID:', result.insertId);
    res.status(201).json({ id: result.insertId, amount, description });
  } catch (err) {
    console.error('Database Insert Error:', err);
    errorResponse(res, 500, 'Failed to insert entry');
  }
});

// Delete Entry by ID
app.delete('/api/entries/:id', async (req, res) => {
  const entryId = req.params.id;

  try {
    const query = 'DELETE FROM entries WHERE id = ?';
    const [result] = await db.promise().query(query, [entryId]);
    if (result.affectedRows === 0) {
      return errorResponse(res, 404, 'Entry not found');
    }
    console.log('Deleted entry with ID:', entryId);
    res.status(200).json({ message: 'Entry deleted successfully' });
  } catch (err) {
    console.error('Database Delete Error:', err);
    errorResponse(res, 500, 'Failed to delete entry');
  }
});

// Graceful Shutdown
process.on('SIGINT', () => {
  console.log('Shutting down server...');
  db.end(() => {
    console.log('Database connection closed.');
    process.exit(0);
  });
});

// Start Server
app.listen(PORT, HOST, () => {
  console.log(`✅ Server is running on http://${HOST}:${PORT}`);
});
