/**
 * Deployment Service Example
 * 
 * This is a reference implementation for deploying published websites.
 * In production, this would be a separate service that:
 * 1. Receives webhook from Strapi when website is published
 * 2. Builds the React application
 * 3. Deploys to hosting service (Vercel, Netlify, AWS, etc.)
 * 4. Configures DNS for custom domain
 */

const axios = require('axios');
const fs = require('fs');
const path = require('path');

class DeploymentService {
  constructor(config) {
    this.config = config;
  }

  /**
   * Deploy a website to hosting service
   * @param {Object} website - Website data from Strapi
   * @returns {Promise<Object>} Deployment result with domain
   */
  async deploy(website) {
    try {
      // Generate project files
      const projectFiles = this.generateProjectFiles(website);

      // Deploy based on provider
      switch (this.config.provider) {
        case 'vercel':
          return await this.deployToVercel(website, projectFiles);
        case 'netlify':
          return await this.deployToNetlify(website, projectFiles);
        case 'aws':
          return await this.deployToAWS(website, projectFiles);
        default:
          throw new Error(`Unknown provider: ${this.config.provider}`);
      }
    } catch (error) {
      console.error('Deployment failed:', error);
      throw error;
    }
  }

  /**
   * Generate project files from website data
   */
  generateProjectFiles(website) {
    const files = {
      'package.json': this.generatePackageJson(),
      'vite.config.js': this.generateViteConfig(),
      'index.html': this.generateIndexHtml(),
      'src/App.jsx': website.generatedCode,
      'src/main.jsx': this.generateMainJsx(),
      'src/index.css': this.generateIndexCss(),
    };

    // Add component files
    const components = this.extractComponents(website.components);
    components.forEach(comp => {
      files[`src/components/${comp}.jsx`] = this.getComponentCode(comp);
      files[`src/components/${comp}.css`] = this.getComponentCss(comp);
    });

    return files;
  }

  /**
   * Deploy to Vercel
   */
  async deployToVercel(website, files) {
    const formData = new FormData();
    
    // Add files to form data
    Object.entries(files).forEach(([path, content]) => {
      formData.append('files', new Blob([content]), path);
    });

    const response = await axios.post(
      'https://api.vercel.com/v13/deployments',
      formData,
      {
        headers: {
          'Authorization': `Bearer ${this.config.vercelToken}`,
          'Content-Type': 'multipart/form-data',
        },
        params: {
          name: website.name.toLowerCase().replace(/\s+/g, '-'),
          projectSettings: JSON.stringify({
            framework: 'vite',
          }),
        },
      }
    );

    // Configure custom domain if provided
    if (website.domain) {
      await this.configureVercelDomain(response.data.id, website.domain);
    }

    return {
      deploymentId: response.data.id,
      url: response.data.url,
      domain: website.domain || response.data.url,
    };
  }

  /**
   * Deploy to Netlify
   */
  async deployToNetlify(website, files) {
    // Create zip file
    const zipPath = await this.createZipFile(files);

    const response = await axios.post(
      'https://api.netlify.com/api/v1/sites',
      fs.createReadStream(zipPath),
      {
        headers: {
          'Authorization': `Bearer ${this.config.netlifyToken}`,
          'Content-Type': 'application/zip',
        },
      }
    );

    // Configure custom domain
    if (website.domain) {
      await this.configureNetlifyDomain(response.data.id, website.domain);
    }

    return {
      deploymentId: response.data.id,
      url: response.data.url,
      domain: website.domain || response.data.url,
    };
  }

  /**
   * Configure Vercel domain
   */
  async configureVercelDomain(deploymentId, domain) {
    await axios.post(
      `https://api.vercel.com/v10/projects/${deploymentId}/domains`,
      { name: domain },
      {
        headers: {
          'Authorization': `Bearer ${this.config.vercelToken}`,
        },
      }
    );
  }

  /**
   * Configure Netlify domain
   */
  async configureNetlifyDomain(siteId, domain) {
    await axios.post(
      `https://api.netlify.com/api/v1/sites/${siteId}/domains`,
      { domain },
      {
        headers: {
          'Authorization': `Bearer ${this.config.netlifyToken}`,
        },
      }
    );
  }

  // Helper methods
  generatePackageJson() {
    return JSON.stringify({
      name: 'generated-website',
      version: '1.0.0',
      type: 'module',
      scripts: {
        dev: 'vite',
        build: 'vite build',
        preview: 'vite preview',
      },
      dependencies: {
        react: '^18.2.0',
        'react-dom': '^18.2.0',
      },
      devDependencies: {
        '@vitejs/plugin-react': '^4.2.0',
        vite: '^5.0.0',
      },
    }, null, 2);
  }

  generateViteConfig() {
    return `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})`;
  }

  generateIndexHtml() {
    return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Generated Website</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>`;
  }

  generateMainJsx() {
    return `import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)`;
  }

  generateIndexCss() {
    return `* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
}`;
  }

  extractComponents(components) {
    const types = new Set();
    const traverse = (comps) => {
      comps.forEach(comp => {
        types.add(comp.type);
        if (comp.children) {
          traverse(comp.children);
        }
      });
    };
    traverse(components);
    return Array.from(types);
  }

  getComponentCode(componentType) {
    // In production, this would fetch from a component library
    // For now, return placeholder
    return `import React from 'react'
import './${componentType}.css'

function ${componentType}(props) {
  return <div>${componentType} Component</div>
}

export default ${componentType}`;
  }

  getComponentCss(componentType) {
    return `/* ${componentType} styles */`;
  }
}

module.exports = DeploymentService;

