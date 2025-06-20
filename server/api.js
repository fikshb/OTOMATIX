const http = require('http');
const url = require('url');
const querystring = require('querystring');
const { Pool } = require('@neondatabase/serverless');

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

const server = http.createServer(async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  const parsedUrl = url.parse(req.url, true);
  
  if (req.method === 'POST' && parsedUrl.pathname === '/api/contact') {
    let body = '';
    
    req.on('data', chunk => {
      body += chunk.toString();
    });
    
    req.on('end', async () => {
      try {
        const data = JSON.parse(body);
        
        // Validate required fields
        if (!data.name || !data.email) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Name and email are required' }));
          return;
        }
        
        // Insert contact into database
        const insertQuery = `
          INSERT INTO contacts (name, email, phone, company, message, interested_package, source)
          VALUES ($1, $2, $3, $4, $5, $6, $7)
          RETURNING id, created_at
        `;
        
        const values = [
          data.name,
          data.email,
          data.phone || null,
          data.company || null,
          data.message || null,
          data.interestedPackage || null,
          'landing_page'
        ];
        
        const result = await pool.query(insertQuery, values);
        
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ 
          success: true, 
          message: 'Terima kasih! Kami akan segera menghubungi Anda.',
          id: result.rows[0].id 
        }));
        
      } catch (error) {
        console.error('Database error:', error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Terjadi kesalahan. Silakan coba lagi.' }));
      }
    });
  } else if (req.method === 'GET' && parsedUrl.pathname === '/api/contacts') {
    try {
      const result = await pool.query(`
        SELECT id, name, email, phone, company, interested_package, created_at
        FROM contacts 
        ORDER BY created_at DESC 
        LIMIT 50
      `);
      
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ contacts: result.rows }));
      
    } catch (error) {
      console.error('Database error:', error);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Failed to fetch contacts' }));
    }
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not found' }));
  }
});

const port = 3001;
server.listen(port, '0.0.0.0', () => {
  console.log(`API server running on port ${port}`);
});