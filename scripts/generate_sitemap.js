const fs = require('fs');

const BASE_URL = 'https://raidan.pro';
const PAGES = [
    { url: '/', priority: '1.0' },
    { url: '/docs/technical-whitepaper.html', priority: '0.8' },
    { url: '/docs/ethical-charter.html', priority: '0.8' },
    { url: '/docs/privacy-policy.html', priority: '0.8' }
];

const generateSitemap = () => {
    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

    PAGES.forEach(page => {
        xml += `  <url>
    <loc>${BASE_URL}${page.url}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <priority>${page.priority}</priority>
  </url>
`;
    });

    xml += '</urlset>';
    
    fs.writeFileSync('./landing_page/sitemap.xml', xml);
    console.log('✅ sitemap.xml generated successfully in /landing_page');
};

generateSitemap();