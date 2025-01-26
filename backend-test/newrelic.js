// newrelic.js

require('dotenv').config(); // Load environment variables

exports.config = {
  app_name: [process.env.NEW_RELIC_APP_NAME || 'DefaultAppName'], // Use default if not defined
  license_key: process.env.NEW_RELIC_LICENSE_KEY, // Fetch from .env
  logging: {
    level: 'info' // Log level for New Relic (info, debug, etc.)
  }
};
