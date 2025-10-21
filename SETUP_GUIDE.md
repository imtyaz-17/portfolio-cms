# Portfolio CMS - Complete Setup Guide

This guide will walk you through setting up your portfolio website from scratch.

## Table of Contents
1. [Initial Setup](#initial-setup)
2. [Sanity Configuration](#sanity-configuration)
3. [Email Configuration](#email-configuration)
4. [Adding Content](#adding-content)
5. [Deployment](#deployment)

---

## Initial Setup

### Step 1: Install Dependencies

The dependencies are already installed. If you need to reinstall:

```bash
npm install
```

### Step 2: Create Sanity Project

Visit [sanity.io](https://www.sanity.io) and create a free account if you don't have one.

**Option A: Create a new Sanity project via CLI**

```bash
npm create sanity@latest -- --project-plan free --create-project "My Portfolio" --dataset production --output-path ./sanity-project
```

This will give you a **Project ID**. Save it!

**Option B: Create via Sanity Dashboard**

1. Go to [sanity.io/manage](https://sanity.io/manage)
2. Click "Create new project"
3. Name it "My Portfolio"
4. Note your **Project ID**

### Step 3: Get API Token

1. Go to [sanity.io/manage](https://sanity.io/manage)
2. Select your project
3. Navigate to **API** → **Tokens**
4. Click **Add API token**
5. Name it "Portfolio Website"
6. Set permissions to **Editor** or **Administrator**
7. Copy the token (you won't see it again!)

### Step 4: Configure Environment Variables

1. Copy the example env file:
   ```bash
   cp env.example .env.local
   ```

2. Open `.env.local` and fill in your details:

```env
# Sanity Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=abc123xyz  # Your Sanity Project ID
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=sk1234567890abcdef      # Your API Token

# Email Configuration (we'll set this up next)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
CONTACT_EMAIL=your_contact_email@gmail.com

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

---

## Sanity Configuration

### Deploy the Studio

Your Sanity Studio is already configured and embedded at `/studio`. No additional deployment needed!

### CORS Setup

Allow your domain to access Sanity:

1. Go to [sanity.io/manage](https://sanity.io/manage)
2. Select your project
3. Navigate to **API** → **CORS Origins**
4. Click **Add CORS Origin**
5. Add these origins:
   - `http://localhost:3000` (for development)
   - Your production URL (e.g., `https://yourportfolio.com`)
6. Enable **Allow credentials**

---

## Email Configuration

### Option 1: Gmail (Recommended for personal use)

1. **Enable 2-Factor Authentication**:
   - Go to [myaccount.google.com/security](https://myaccount.google.com/security)
   - Turn on 2-Step Verification

2. **Generate App Password**:
   - Go to [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
   - Select "Mail" and your device
   - Click "Generate"
   - Copy the 16-character password

3. **Update `.env.local`**:
   ```env
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your.email@gmail.com
   SMTP_PASS=abcd efgh ijkl mnop  # The 16-char password
   CONTACT_EMAIL=your.email@gmail.com
   ```

### Option 2: SendGrid (Recommended for production)

1. Sign up at [sendgrid.com](https://sendgrid.com)
2. Create an API key
3. Update `.env.local`:
   ```env
   SMTP_HOST=smtp.sendgrid.net
   SMTP_PORT=587
   SMTP_USER=apikey
   SMTP_PASS=SG.your_api_key_here
   CONTACT_EMAIL=your@email.com
   ```

### Option 3: Other SMTP Services

Any SMTP service works (Mailgun, AWS SES, etc.). Just update the SMTP settings accordingly.

---

## Adding Content

### Step 1: Start the Development Server

```bash
npm run dev
```

### Step 2: Access Sanity Studio

Navigate to [http://localhost:3000/studio](http://localhost:3000/studio)

### Step 3: Add Personal Information

1. Click "Personal Info" in the sidebar
2. Fill in all fields:
   - **Name**: Your full name
   - **Headline**: Your professional title (e.g., "Full-Stack Developer")
   - **Profile Image**: Upload a professional photo
   - **Short Bio**: 1-2 sentences about you
   - **Detailed Bio**: Write a longer description
   - **Resume**: Upload your resume PDF
   - **Social Links**: Add your GitHub, LinkedIn, etc.
3. Click **Publish**

### Step 4: Add Skills

1. Click "Skills" in the sidebar
2. Click **Create new document**
3. Fill in:
   - **Skill Name**: e.g., "React"
   - **Icon**: Upload a logo (optional)
   - **Category**: Choose from dropdown
4. Click **Publish**
5. Repeat for all your skills

### Step 5: Add Projects

1. Click "Projects" in the sidebar
2. Click **Create new document**
3. Fill in:
   - **Title**: Project name
   - **Slug**: Auto-generates (or customize)
   - **Cover Image**: Upload project screenshot
   - **Summary**: Brief description
   - **Description**: Detailed write-up (supports rich text)
   - **Technologies**: Add tags (e.g., "React", "Node.js")
   - **Links**: GitHub and live demo URLs
   - **Display Order**: Lower numbers show first (0, 1, 2, etc.)
4. Click **Publish**
5. Repeat for all projects

### Step 6: Add Work Experience

1. Click "Experience" in the sidebar
2. Click **Create new document**
3. Fill in:
   - **Company**: Company name
   - **Role**: Your job title
   - **Start Date**: When you started
   - **End Date**: When you left (leave empty if current)
   - **Description**: What you did (supports rich text)
   - **Display Order**: Lower numbers show first
4. Click **Publish**
5. Repeat for all positions

### Step 7: View Your Portfolio

Navigate to [http://localhost:3000](http://localhost:3000) to see your portfolio!

---

## Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio setup"
   git remote add origin your-repo-url
   git push -u origin main
   ```

2. **Deploy to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Select your GitHub repository
   - Configure:
     - **Framework Preset**: Next.js
     - **Build Command**: `npm run build`
     - **Output Directory**: `.next`

3. **Add Environment Variables**:
   - In Vercel project settings, go to "Environment Variables"
   - Add all variables from your `.env.local`:
     - `NEXT_PUBLIC_SANITY_PROJECT_ID`
     - `NEXT_PUBLIC_SANITY_DATASET`
     - `SANITY_API_TOKEN`
     - `SMTP_HOST`
     - `SMTP_PORT`
     - `SMTP_USER`
     - `SMTP_PASS`
     - `CONTACT_EMAIL`
     - `NEXT_PUBLIC_SITE_URL` (use your Vercel URL)

4. **Deploy**:
   - Click "Deploy"
   - Wait for deployment to complete
   - Your site is live! 🎉

### Update Sanity CORS

Don't forget to add your production URL to Sanity CORS origins:
1. Go to [sanity.io/manage](https://sanity.io/manage)
2. API → CORS Origins
3. Add your Vercel URL (e.g., `https://yourportfolio.vercel.app`)

---

## Post-Deployment

### Update Site URL

In your `.env.local` and Vercel environment variables:
```env
NEXT_PUBLIC_SITE_URL=https://yourportfolio.vercel.app
```

### Custom Domain (Optional)

In Vercel:
1. Go to your project settings
2. Click "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions

---

## Testing

### Test Contact Form

1. Fill out the contact form on your site
2. Check your email inbox
3. Verify you received the message

### Test Content Updates

1. Edit content in Sanity Studio
2. Wait 1-2 minutes (revalidation time)
3. Refresh your site to see changes

---

## Troubleshooting

### "Project not found" in Studio

- Check `NEXT_PUBLIC_SANITY_PROJECT_ID` in `.env.local`
- Ensure you've published the Sanity Studio

### Images not loading

- Verify Sanity CDN is in `next.config.js`
- Check that images are published in Sanity

### Email not sending

- Verify SMTP credentials
- Check that 2FA is enabled (Gmail)
- Look for errors in Vercel logs
- Test SMTP credentials with a simple script

### "Module not found" errors

```bash
rm -rf node_modules .next
npm install
npm run dev
```

### Build fails on Vercel

- Check all environment variables are set
- Review build logs for specific errors
- Ensure all dependencies are in `package.json`

---

## Next Steps

1. **Customize Styling**: Edit colors in `tailwind.config.js`
2. **Add Analytics**: Integrate Google Analytics or Plausible
3. **SEO Optimization**: Add meta descriptions and structured data
4. **Performance**: Optimize images and enable caching
5. **Custom Domain**: Set up your own domain name

---

## Support & Resources

- **Next.js Docs**: [nextjs.org/docs](https://nextjs.org/docs)
- **Sanity Docs**: [sanity.io/docs](https://www.sanity.io/docs)
- **Tailwind Docs**: [tailwindcss.com/docs](https://tailwindcss.com/docs)
- **Framer Motion**: [framer.com/motion](https://www.framer.com/motion/)

---

## Congratulations! 🎉

Your portfolio is now live! Update your content anytime through the Sanity Studio without touching any code.

Happy coding!

