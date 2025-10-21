# Quick Start Guide - Get Your Portfolio Running in 5 Minutes

Follow these steps to get your portfolio up and running quickly.

## Prerequisites
- Node.js 18+ installed
- A Sanity account (free at [sanity.io](https://www.sanity.io))

## 5-Minute Setup

### 1. Create Sanity Project (2 minutes)

Visit [sanity.io/manage](https://sanity.io/manage) and:
1. Click "Create new project"
2. Name it (e.g., "My Portfolio")
3. Note your **Project ID** (looks like: `abc123xyz`)

### 2. Get API Token (1 minute)

In your Sanity project:
1. Go to **API** → **Tokens**
2. Click "Add API token"
3. Name it "Portfolio" and set permissions to **Editor**
4. **Copy the token immediately** (you won't see it again!)

### 3. Configure Environment (1 minute)

```bash
# Copy the example file
cp env.example .env.local

# Edit .env.local with your favorite editor
# Add your Sanity Project ID and API Token
```

Minimum required variables:
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_token_here
```

### 4. Setup CORS (1 minute)

In Sanity dashboard:
1. Go to **API** → **CORS Origins**
2. Add: `http://localhost:3000`
3. Enable "Allow credentials"

### 5. Start Development Server

```bash
npm run dev
```

Visit:
- **Website**: [http://localhost:3000](http://localhost:3000)
- **CMS Studio**: [http://localhost:3000/studio](http://localhost:3000/studio)

## Add Your First Content

### In Sanity Studio (http://localhost:3000/studio):

1. **Personal Info** (Required):
   - Add your name and headline
   - Upload a profile picture
   - Add a short bio
   - Click **Publish**

2. **Add a Project**:
   - Click "Projects" → "Create"
   - Fill in title, summary, and details
   - Set display order to `0`
   - Click **Publish**

3. **Add a Skill**:
   - Click "Skills" → "Create"
   - Add skill name and category
   - Click **Publish**

Refresh [http://localhost:3000](http://localhost:3000) and see your content!

## Setup Email (Optional, for contact form)

### Quick Gmail Setup:

1. Enable 2FA on your Google account
2. Generate App Password: [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
3. Add to `.env.local`:
   ```env
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your.email@gmail.com
   SMTP_PASS=your_16_char_app_password
   CONTACT_EMAIL=your.email@gmail.com
   ```
4. Restart the dev server

## Deploy to Vercel (5 minutes)

1. Push to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin your-repo-url
   git push -u origin main
   ```

2. Go to [vercel.com](https://vercel.com) and click "Import"

3. Select your repository

4. Add environment variables from your `.env.local`

5. Click "Deploy"

Done! Your portfolio is live! 🎉

## Next Steps

- Read the full [SETUP_GUIDE.md](./SETUP_GUIDE.md) for detailed instructions
- Read the [README.md](./README.md) for customization options
- Add more projects, skills, and experience in the Studio

## Need Help?

- Check [SETUP_GUIDE.md](./SETUP_GUIDE.md) for troubleshooting
- Review the Sanity docs: [sanity.io/docs](https://www.sanity.io/docs)
- Review the Next.js docs: [nextjs.org/docs](https://nextjs.org/docs)

---

**Pro Tip**: Bookmark the Studio URL (`http://localhost:3000/studio` or your production URL + `/studio`) for easy access to update your portfolio anytime!

