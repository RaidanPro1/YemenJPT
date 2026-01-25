
const axios = require('axios');
const { exec } = require('child_process');
const db = require('../models/db');

/**
 * ProvisioningEngine: المسؤول عن دورة حياة المستأجر
 */
class ProvisioningEngine {
  
  async provisionTenant(req, res) {
    const { name, slug, domain, type } = req.body;

    try {
      // 1. CLOUDFLARE AUTOMATION: إضافة سجل DNS
      await this.createDnsRecord(slug);

      // 2. DB ISOLATION: إنشاء مخطط بيانات معزول (Schema)
      await db.query(`CREATE SCHEMA IF NOT EXISTS tenant_${slug}`);
      
      // 3. NGINX REFRESH: تحديث المسارات
      await this.reloadGateway();

      // 4. PERSISTENCE
      const tenant = await db.query(
        'INSERT INTO tenants (name, slug, domain, type, status) VALUES (?, ?, ?, ?, "active") RETURNING *',
        [name, slug, domain, type]
      );

      res.status(201).json({ success: true, tenant: tenant[0] });
    } catch (error) {
      console.error('[Provisioning Error]', error);
      res.status(500).json({ error: 'Failed to provision infrastructure' });
    }
  }

  async createDnsRecord(slug) {
    const url = `https://api.cloudflare.com/client/v4/zones/${process.env.CF_ZONE_ID}/dns_records`;
    return axios.post(url, {
      type: 'CNAME',
      name: `${slug}.ai`,
      content: 'gateway.raidan.pro',
      proxied: true
    }, {
      headers: { 'Authorization': `Bearer ${process.env.CF_TOKEN}` }
    });
  }

  async reloadGateway() {
    return new Promise((resolve, reject) => {
      exec('docker exec raidan-gateway nginx -s reload', (err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  }
}

module.exports = new ProvisioningEngine();
