const express = require('express');
const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');
const router = express.Router();

const DATA_PATH = path.join(__dirname, '../../../data/items.json');

// Cache em memória
let cachedStats = null;
let lastUpdated = null;

// Função que calcula os stats e salva no cache
async function updateStats() {
  try {
    const raw = await fsPromises.readFile(DATA_PATH, 'utf-8');
    const items = JSON.parse(raw);

    cachedStats = {
      total: items.length,
      averagePrice: items.reduce((acc, cur) => acc + cur.price, 0) / items.length,
    };

    lastUpdated = new Date();
    console.log('✅ Stats cache updated:', cachedStats);
  } catch (err) {
    console.error('❌ Failed to update stats cache:', err);
  }
}

// Atualiza o cache uma vez na inicialização
updateStats();

// Observa mudanças no arquivo e atualiza cache
fs.watchFile(DATA_PATH, { interval: 500 }, () => {
  console.log('📝 items.json has changed, updating stats...');
  updateStats();
});

// GET /api/stats
router.get('/', (req, res) => {
  if (cachedStats) {
    res.json({ ...cachedStats, cachedAt: lastUpdated });
  } else {
    res.status(503).json({ error: 'Stats not ready yet' });
  }
});

module.exports = router;
