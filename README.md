# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/07b9dbe4-1727-41ba-a8b9-82e31c45780d

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/07b9dbe4-1727-41ba-a8b9-82e31c45780d) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/07b9dbe4-1727-41ba-a8b9-82e31c45780d) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)

## How to deploy to GitHub Pages

1. **Build your project**:
   ```sh
   npm run build
   ```

2. **Install gh-pages package**:
   ```sh
   npm install --save-dev gh-pages
   ```

3. **Add deployment scripts to package.json**:
   ```json
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   }
   ```

4. **Update vite.config.ts** - Add base URL (replace `your-repo-name` with your actual repository name):
   ```typescript
   export default defineConfig({
     base: '/your-repo-name/',
     // ... rest of config
   })
   ```

5. **Deploy to GitHub Pages**:
   ```sh
   npm run deploy
   ```

6. **Enable GitHub Pages**:
   - Go to your repository on GitHub
   - Navigate to Settings → Pages
   - Under "Source", select the `gh-pages` branch
   - Save and wait for deployment (usually 1-2 minutes)

Your site will be available at: `https://your-username.github.io/your-repo-name/`

## Connecting Namecheap domain to GitHub Pages

1. **Get your GitHub Pages URL** (e.g., `your-username.github.io/your-repo-name`)

2. **Configure DNS in Namecheap**:
   - Log in to your Namecheap account
   - Go to Domain List → Manage → Advanced DNS
   - Add the following records:

   **For root domain (yourdomain.com)**:
   - Type: `A Record`, Host: `@`, Value: `185.199.108.153`, TTL: Automatic
   - Type: `A Record`, Host: `@`, Value: `185.199.109.153`, TTL: Automatic
   - Type: `A Record`, Host: `@`, Value: `185.199.110.153`, TTL: Automatic
   - Type: `A Record`, Host: `@`, Value: `185.199.111.153`, TTL: Automatic

   **For www subdomain**:
   - Type: `CNAME Record`, Host: `www`, Value: `your-username.github.io`, TTL: Automatic

3. **Configure custom domain in GitHub**:
   - Go to your repository → Settings → Pages
   - Under "Custom domain", enter your domain (e.g., `yourdomain.com`)
   - Click Save
   - Check "Enforce HTTPS" once DNS propagates (may take 24-48 hours)

4. **Add CNAME file to your project**:
   - Create a file named `CNAME` in your `public` folder
   - Add your domain name: `yourdomain.com`
   - Commit and redeploy

**Note**: DNS propagation can take up to 48 hours. You can check status at [dnschecker.org](https://dnschecker.org)

## Deploy to Namecheap cPanel (Alternative to GitHub Pages)

If you prefer to host on Namecheap's cPanel instead of GitHub Pages:

1. **Build your project**:
   ```sh
   npm run build
   ```

2. **Update vite.config.ts** - Remove or comment out the base URL:
   ```typescript
   export default defineConfig({
     // base: '/your-repo-name/',  // Comment this out for cPanel
     // ... rest of config
   })
   ```

3. **Access cPanel File Manager**:
   - Log in to your Namecheap account
   - Go to Hosting List → Manage → cPanel
   - Open **File Manager**

4. **Upload your build files**:
   - Navigate to `public_html` folder (or your domain's root folder)
   - Delete existing files if doing a fresh deployment
   - Upload all contents from your local `dist` folder
   - You can compress `dist` folder to `.zip`, upload, then extract in cPanel

5. **Configure .htaccess for SPA routing**:
   - Create or edit `.htaccess` file in `public_html` with:
   ```apache
   <IfModule mod_rewrite.c>
     RewriteEngine On
     RewriteBase /
     RewriteRule ^index\.html$ - [L]
     RewriteCond %{REQUEST_FILENAME} !-f
     RewriteCond %{REQUEST_FILENAME} !-d
     RewriteCond %{REQUEST_FILENAME} !-l
     RewriteRule . /index.html [L]
   </IfModule>
   ```

6. **Enable SSL (HTTPS)**:
   - In cPanel, go to **SSL/TLS Status** or **AutoSSL**
   - Enable SSL for your domain
   - Namecheap provides free SSL with hosting

7. **Verify deployment**:
   - Visit your domain (e.g., `https://yourdomain.com`)
   - Test navigation to ensure SPA routing works

**Tips for cPanel deployment**:
- Clear browser cache if you see old content
- Use cPanel's **Terminal** for command-line access if available
- Set up a deployment script or use Git integration in cPanel for automated deployments
