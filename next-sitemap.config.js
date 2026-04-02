/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://astroladyluna.com",
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [{ userAgent: "*", allow: "/" }],
  },
  exclude: ["/api/*"],
};
