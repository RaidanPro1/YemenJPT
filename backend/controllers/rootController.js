
const jwt = require('jsonwebtoken');
const db = require('../models/db'); // Mock DB interface
const { notificationService } = require('../services/notifications');

/**
 * rootController: High-Privilege Orchestrator
 * Handles system-wide operations across isolated tenants.
 */
class RootController {
  
  /**
   * GET /api/root/tenants
   * Aggregates real-time health and resource metrics for all nodes.
   */
  async getTenants(req, res) {
    try {
      const tenants = await db.query(`
        SELECT t.*, tr.*, 
        (SELECT count(*) FROM users WHERE tenant_id = t.id) as journalist_count
        FROM tenants t
        JOIN tenant_resources tr ON t.id = tr.tenant_id
      `);
      
      // Simulate real-time data jitter for the dashboard NOC view
      const liveData = tenants.map(t => ({
        ...t,
        liveMetrics: {
          cpuLoad: Math.min(100, t.cpu_usage_current + (Math.random() * 5)),
          ddosStatus: Math.random() > 0.95 ? 'under_attack' : 'stable',
          aiThroughput: Math.floor(Math.random() * 1000)
        }
      }));

      res.json(liveData);
    } catch (error) {
      res.status(500).json({ error: 'Grid telemetry failure' });
    }
  }

  /**
   * POST /api/root/impersonate
   * Ghost Login Protocol: Generates a limited-scope shadow token for a tenant.
   * SECURITY: This never exposes user passwords. It verifies Root identity first.
   */
  async impersonate(req, res) {
    const { tenantId } = req.body;
    const rootUser = req.user; // Provided by auth middleware

    if (rootUser.role !== 'root_admin') {
      return res.status(403).json({ error: 'Sovereign bypass unauthorized.' });
    }

    try {
      const tenant = await db.query('SELECT * FROM tenants WHERE id = ?', [tenantId]);
      
      // Create a short-lived "Shadow JWT" with the tenant context
      const shadowToken = jwt.sign({
        id: rootUser.id,
        name: `[ROOT] ${rootUser.name}`,
        role: 'tenant_admin',
        tenantId: tenantId,
        isImpersonated: true
      }, process.env.JWT_SECRET, { expiresIn: '15m' });

      console.log(`[Audit] Root Admin ${rootUser.id} ghost-logged into Tenant ${tenantId}`);
      
      res.json({ token: shadowToken, redirectUrl: `https://${tenant.slug}.raidan.pro` });
    } catch (error) {
      res.status(500).json({ error: 'Protocol handshake failed' });
    }
  }

  /**
   * POST /api/root/panic-mode
   * Master Kill-Switch: Locks DB writes and enables frontend camouflage.
   */
  async triggerPanicMode(req, res) {
    const { tenantId, action } = req.body; // action: 'enable' | 'disable'
    
    try {
      const status = action === 'enable' ? 'maintenance' : 'active';
      const camouflage = action === 'enable';

      await db.query('UPDATE tenants SET status = ?, is_camouflaged = ? WHERE id = ?', 
        [status, camouflage, tenantId]);

      // Broadcast alert to secure channels
      await notificationService.notify(`🚨 EMERGENCY: Panic Mode ${action}d for Tenant ID: ${tenantId}`);

      res.json({ success: true, newState: status });
    } catch (error) {
      res.status(500).json({ error: 'Emergency switch malfunction' });
    }
  }

  /**
   * POST /api/root/resource-arbitrage
   * ERP Logic: Dynamic transfer of CPU/RAM credits between tenant nodes.
   */
  async rebalanceResources(req, res) {
    const { fromId, toId, credits } = req.body;
    
    try {
      await db.transaction(async (tx) => {
        await tx.query('UPDATE tenant_resources SET cpu_limit = cpu_limit - ? WHERE tenant_id = ?', [credits, fromId]);
        await tx.query('UPDATE tenant_resources SET cpu_limit = cpu_limit + ? WHERE tenant_id = ?', [credits, toId]);
      });

      res.json({ success: true, message: 'Resource rebalancing synchronized.' });
    } catch (error) {
      res.status(400).json({ error: 'Arbitrage failed: Insufficient resources.' });
    }
  }
}

module.exports = new RootController();
