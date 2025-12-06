'use strict';

/**
 * website controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::website.website', ({ strapi }) => ({
  async create(ctx) {
    const { data } = ctx.request.body;
    
    // Generate domain if publishing
    if (data.published && !data.domain) {
      const count = await strapi.entityService.count('api::website.website');
      data.domain = `site-${count + 1}.example.com`;
    }

    const response = await super.create(ctx);
    return response;
  },

  async update(ctx) {
    const { id } = ctx.params;
    const { data } = ctx.request.body;

    // Generate domain if publishing for the first time
    if (data.published && !data.domain) {
      const existing = await strapi.entityService.findOne('api::website.website', id);
      if (!existing.domain) {
        const count = await strapi.entityService.count('api::website.website');
        data.domain = `site-${count + 1}.example.com`;
      }
    }

    const response = await super.update(ctx);
    return response;
  },
}));

