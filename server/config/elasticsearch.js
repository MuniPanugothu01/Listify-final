/**
 * Elasticsearch Configuration
 *
 * Connects to Elasticsearch (Elastic Cloud, AWS OpenSearch, or local)
 * when ELASTICSEARCH_URL env var is set.
 *
 * If not configured, the app falls back to MongoDB $text search.
 *
 * Env vars:
 *   ELASTICSEARCH_URL   — e.g. https://my-deployment.es.us-east-1.aws.elastic.cloud:9243
 *   ELASTICSEARCH_API_KEY — API key for Elastic Cloud (recommended)
 *   ELASTICSEARCH_USERNAME — basic auth username (alternative)
 *   ELASTICSEARCH_PASSWORD — basic auth password (alternative)
 */

const { Client } = require('@elastic/elasticsearch');
const { logger } = require('../utils/logger');

let client = null;
let isConnected = false;

const initElasticsearch = async () => {
  const url = process.env.ELASTICSEARCH_URL;

  if (!url) {
    console.log('ℹ️  ELASTICSEARCH_URL not set — using MongoDB text search as fallback');
    return null;
  }

  try {
    const config = { node: url };

    // Auth: prefer API key, fallback to basic auth
    if (process.env.ELASTICSEARCH_API_KEY) {
      config.auth = { apiKey: process.env.ELASTICSEARCH_API_KEY };
    } else if (process.env.ELASTICSEARCH_USERNAME && process.env.ELASTICSEARCH_PASSWORD) {
      config.auth = {
        username: process.env.ELASTICSEARCH_USERNAME,
        password: process.env.ELASTICSEARCH_PASSWORD,
      };
    }

    // TLS: disable verification in dev (not recommended for prod)
    if (process.env.NODE_ENV !== 'production') {
      config.tls = { rejectUnauthorized: false };
    }

    // Timeouts & retries
    config.requestTimeout = 30000;
    config.maxRetries = 3;
    config.sniffOnStart = false;

    client = new Client(config);

    // Ping to verify connection
    await client.ping();
    isConnected = true;
    console.log('✅ Elasticsearch connected successfully');

    // Create indices if they don't exist
    await ensureIndices();

    return client;
  } catch (error) {
    console.error('❌ Elasticsearch connection failed:', error.message);
    console.log('ℹ️  Falling back to MongoDB text search');
    isConnected = false;
    return null;
  }
};

/**
 * Create Elasticsearch indices with proper mappings
 */
const ensureIndices = async () => {
  if (!client) return;

  const indices = {
    'listify_electronics': {
      mappings: {
        properties: {
          title: { type: 'text', analyzer: 'standard', boost: 2 },
          description: { type: 'text', analyzer: 'standard' },
          price: { type: 'float' },
          category: { type: 'keyword' },
          subcategory: { type: 'keyword' },
          condition: { type: 'keyword' },
          location: { type: 'text', fields: { keyword: { type: 'keyword' } } },
          sellerName: { type: 'text', fields: { keyword: { type: 'keyword' } } },
          sellerId: { type: 'keyword' },
          status: { type: 'keyword' },
          features: { type: 'text' },
          images: { type: 'keyword', index: false },
          phone: { type: 'keyword', index: false },
          views: { type: 'integer' },
          createdAt: { type: 'date' },
          updatedAt: { type: 'date' },
        },
      },
      settings: {
        number_of_shards: 1,
        number_of_replicas: 0,
        analysis: {
          analyzer: {
            standard: {
              type: 'standard',
              stopwords: '_english_',
            },
          },
        },
      },
    },
    'listify_vehicles': {
      mappings: {
        properties: {
          title: { type: 'text', analyzer: 'standard', boost: 2 },
          description: { type: 'text', analyzer: 'standard' },
          price: { type: 'float' },
          category: { type: 'keyword' },
          subcategory: { type: 'keyword' },
          condition: { type: 'keyword' },
          location: { type: 'text', fields: { keyword: { type: 'keyword' } } },
          brand: { type: 'text', fields: { keyword: { type: 'keyword' } } },
          model: { type: 'text', fields: { keyword: { type: 'keyword' } } },
          variant: { type: 'text' },
          year: { type: 'keyword' },
          kmDriven: { type: 'keyword' },
          fuelType: { type: 'keyword' },
          transmission: { type: 'keyword' },
          ownership: { type: 'keyword' },
          color: { type: 'keyword' },
          sellerName: { type: 'text', fields: { keyword: { type: 'keyword' } } },
          sellerId: { type: 'keyword' },
          status: { type: 'keyword' },
          features: { type: 'text' },
          images: { type: 'keyword', index: false },
          phone: { type: 'keyword', index: false },
          views: { type: 'integer' },
          createdAt: { type: 'date' },
          updatedAt: { type: 'date' },
        },
      },
      settings: {
        number_of_shards: 1,
        number_of_replicas: 0,
        analysis: {
          analyzer: {
            standard: {
              type: 'standard',
              stopwords: '_english_',
            },
          },
        },
      },
    },
  };

  for (const [indexName, config] of Object.entries(indices)) {
    try {
      const exists = await client.indices.exists({ index: indexName });
      if (!exists) {
        await client.indices.create({ index: indexName, body: config });
        console.log(`✅ Created Elasticsearch index: ${indexName}`);
      } else {
        console.log(`ℹ️  Elasticsearch index already exists: ${indexName}`);
      }
    } catch (err) {
      logger.error(`Error creating index ${indexName}:`, err.message);
    }
  }
};

const getClient = () => client;
const getIsConnected = () => isConnected;

module.exports = {
  initElasticsearch,
  getClient,
  getIsConnected,
  ensureIndices,
};
