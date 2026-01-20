const express = require('express');
const router = express.Router();
const db = require('../models/db'); // Mock DB logic

// DASHBOARD OVERVIEW
router.get('/dashboard', async (req, res) => {
    try {
        const stats = {
            totalTenants: 12,
            activeNodes: 84,
            uptime: '99.98%',
            incidentReports: 0
        };

        res.render('admin/dashboard', {
            layout: 'layouts/admin_master',
            activePage: 'dashboard',
            pageTitle: 'غرفة القيادة المركزية',
            breadcrumb: 'نظرة عامة على أداء الشبكة',
            stats
        });
    } catch (err) {
        res.status(500).send("Admin access denied or DB error.");
    }
});

// TOOLS GATEWAY CATEGORY
router.get('/tools/:category', async (req, res) => {
    const { category } = req.params;
    
    // Categorization Mapping
    const categories = {
        verification: { name: 'وحدة التحقق الجنائي', icon: 'fa-shield-halved' },
        osint: { name: 'نظام كشاف (OSINT)', icon: 'fa-magnifying-glass' },
        monitoring: { name: 'الرصد والإنذار المبكر', icon: 'fa-broadcast-tower' },
        security_tools: { name: 'الأمن والخصوصية', icon: 'fa-vault' }
    };

    const currentCat = categories[category] || { name: 'الأدوات', icon: 'fa-layer-group' };

    // Fetch tools of this category from DB (Mocked)
    const tools = [
        { 
            name: 'Meedan Check', 
            slug: 'meedan', 
            vendor: 'Raidan-Node', 
            version: '5.2', 
            icon: 'fa-square-check', 
            status: 'online', 
            tenant: 'verify.',
            description: 'أداة التحقق من الادعاءات والمطابقة مع المصادر المفتوحة.',
            docUrl: '#'
        },
        { 
            name: 'InVID Forensics', 
            slug: 'invid', 
            vendor: 'InVID Team', 
            version: '4.0', 
            icon: 'fa-video', 
            status: 'online', 
            tenant: 'basirah.',
            description: 'وحدة التشريح الجنائي للفيديوهات وكشف عمليات التلاعب الرقمي.',
            docUrl: '#'
        }
    ];

    res.render('admin/tools_portal', {
        layout: 'layouts/admin_master',
        activePage: category,
        pageTitle: currentCat.name,
        breadcrumb: 'بوابات الأدوات الموزعة',
        portalName: currentCat.name,
        categoryIcon: currentCat.icon,
        tools
    });
});

// CMS & BRANDING (GOD MODE)
router.get('/cms', async (req, res) => {
    // Mock settings fetch
    const settings = {
        brand_name: 'RaidanPro',
        logo_url: '/logo.png',
        primary_color: '#0d9488',
        secondary_color: '#0f172a',
        seo_desc: 'الوكالة الرائدة للتحول الرقمي والذكاء الاصطناعي في اليمن.',
        seo_keywords: 'Yemen, AI, RAG, Sovereign Grid'
    };

    res.render('admin/cms_branding', {
        layout: 'layouts/admin_master',
        activePage: 'cms',
        pageTitle: 'الهوية والبصمة السيادية',
        breadcrumb: 'God Mode: Landing Page Control',
        settings
    });
});

// CMS UPDATE LOGIC
router.post('/cms/update', async (req, res) => {
    const data = req.body;
    console.log('[CMS-Control] Publishing new brand settings:', data);
    
    // Logic: Update system_settings table, flush cache, rebuild landing view
    // await db.query('UPDATE system_settings SET value = ? WHERE key = ...', [...]);
    
    res.redirect('/admin/cms?success=published');
});

// TENANT MANAGER
router.get('/tenants', async (req, res) => {
    res.render('admin/tenants', {
        layout: 'layouts/admin_master',
        activePage: 'tenants',
        pageTitle: 'إدارة المستأجرين',
        breadcrumb: 'Multi-Tenant Resource Allocation',
        tenants: [] // Pass actual tenants from DB
    });
});

module.exports = router;