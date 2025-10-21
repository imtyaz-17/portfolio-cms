# 🎨 Portfolio CMS

<div align="center">

A modern, high-performance portfolio website with a powerful headless CMS. Built with Next.js 15, Sanity CMS, Tailwind CSS, and Framer Motion.

[![Next.js](https://img.shields.io/badge/Next.js-15.5.6-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.1.0-61dafb?style=flat-square&logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Sanity](https://img.shields.io/badge/Sanity-4.10.3-f03e2f?style=flat-square&logo=sanity)](https://www.sanity.io/)

[Features](#-features) • [Demo](#-demo) • [Quick Start](#-quick-start) • [Documentation](#-documentation) • [Deployment](#-deployment)

</div>

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Demo](#-demo)
- [Prerequisites](#-prerequisites)
- [Quick Start](#-quick-start)
- [Project Structure](#-project-structure)
- [Configuration](#-configuration)
- [Content Management](#-content-management)
- [Customization](#-customization)
- [Deployment](#-deployment)
- [Environment Variables](#-environment-variables)
- [Troubleshooting](#-troubleshooting)
- [Performance](#-performance)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Features

### 🎯 Core Features
- **Modern Design System** - Beautiful, professional UI with cyan/blue color scheme
- **Dark Mode Support** - Seamless theme switching with smooth transitions
- **Fully Responsive** - Mobile-first design that works on all devices
- **High Performance** - Optimized for speed with Next.js App Router
- **SEO Optimized** - Dynamic metadata, Open Graph, and Twitter Cards
- **Animated UI** - Smooth animations powered by Framer Motion
- **Type-Safe** - TypeScript-ready configuration

### 📝 Content Management
- **Headless CMS** - Full Sanity.io integration with embedded Studio
- **Rich Text Editor** - Portable Text for advanced content formatting
- **Image Management** - Optimized image delivery with Sanity CDN
- **File Uploads** - Resume and document support
- **Real-time Preview** - See changes instantly in the Studio

### 💼 Portfolio Sections
- **Hero Section** - Eye-catching introduction with profile image
- **About Section** - Tell your story with rich text formatting
- **Skills Showcase** - Organized by categories with visual icons
- **Projects Gallery** - Showcase your work with images and details
- **Experience Timeline** - Professional work history with continuous vertical line
- **Contact Form** - Working email integration with validation

### 🚀 Technical Features
- Static Site Generation (SSG)
- Incremental Static Regeneration (ISR)
- API Routes for contact form
- Image optimization
- Code splitting
- Custom 404 pages
- WCAG 2.1 accessibility compliant

---

## 🛠 Tech Stack

### Frontend
- **[Next.js 15.5.6](https://nextjs.org/)** - React framework with App Router
- **[React 19.1.0](https://react.dev/)** - UI library
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Utility-first styling
- **[Framer Motion 12.23](https://www.framer.com/motion/)** - Animation library
- **[next-themes 0.4.6](https://github.com/pacocoursey/next-themes)** - Dark mode

### Backend & CMS
- **[Sanity 4.10.3](https://www.sanity.io/)** - Headless CMS
- **[next-sanity 11.5.5](https://github.com/sanity-io/next-sanity)** - Sanity + Next.js integration
- **[@portabletext/react 4.0.3](https://github.com/portabletext/react-portabletext)** - Rich text rendering
- **[Nodemailer 7.0.9](https://nodemailer.com/)** - Email sending

### Development
- **TypeScript 5** - Type safety
- **ESLint 9** - Code linting
- **PostCSS** - CSS processing

---

## 🎬 Demo

### Live Preview
Visit your deployed site after following the deployment steps below.

### Studio Preview
Access the CMS at `/studio` to manage all content:
- Personal information
- Projects and portfolio items
- Skills and technologies
- Work experience timeline

---

## 📦 Prerequisites

Before you begin, ensure you have:

- **Node.js 18+** and **npm** installed
- A **[Sanity.io](https://www.sanity.io/)** account (free tier available)
- **SMTP credentials** for email (Gmail, SendGrid, Mailgun, etc.)
- **Git** for version control (optional but recommended)

---

## 🚀 Quick Start

### 1. Clone or Download

```bash
# If you have the project locally
cd portfolio-cms

# Or clone from repository
git clone <your-repo-url>
cd portfolio-cms
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Sanity

**Option A: Create a New Sanity Project**

```bash
npm create sanity@latest
```

Follow the prompts to:
- Create a new project
- Choose a dataset name (typically "production")
- Note your Project ID

**Option B: Use Existing Sanity Project**

If you already have a Sanity project:
1. Go to [sanity.io/manage](https://sanity.io/manage)
2. Note your Project ID
3. Create an API token with "Editor" permissions

### 4. Configure Environment Variables

Create a `.env.local` file in the root directory:

```bash
cp env.example .env.local
```

Edit `.env.local` with your credentials:

```env
# Sanity Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_api_token_here

# Email Configuration (Gmail example)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password_here
CONTACT_EMAIL=your_contact_email@gmail.com

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 5. Start Development Server

```bash
npm run dev
```

Your site will be available at:
- **Frontend**: [http://localhost:3000](http://localhost:3000)
- **CMS Studio**: [http://localhost:3000/studio](http://localhost:3000/studio)

### 6. Add Content

1. Navigate to [http://localhost:3000/studio](http://localhost:3000/studio)
2. Sign in with your Sanity account
3. Start adding your portfolio content:
   - Personal info (name, bio, profile picture)
   - Projects
   - Skills
   - Work experience

---

## 📁 Project Structure

```
portfolio-cms/
├── app/                          # Next.js App Router
│   ├── layout.js                 # Root layout with theme provider
│   ├── page.js                   # Home page (all sections)
│   ├── globals.css               # Global styles and theme colors
│   ├── favicon.ico               # Site favicon
│   ├── projects/
│   │   └── [slug]/
│   │       └── page.js           # Dynamic project detail pages
│   ├── studio/
│   │   └── page.jsx              # Embedded Sanity Studio
│   └── api/
│       └── contact/
│           └── route.js          # Contact form API endpoint
│
├── components/                   # React components
│   ├── HeroSection.jsx           # Hero with profile and intro
│   ├── AboutSection.jsx          # About section with rich text
│   ├── SkillsSection.jsx         # Skills grid by category
│   ├── ProjectsSection.jsx       # Projects showcase cards
│   ├── ExperienceTimeline.jsx    # Work experience timeline
│   ├── ContactForm.jsx           # Contact form with validation
│   └── ThemeToggle.jsx           # Dark/light mode toggle
│
├── contexts/                     # React contexts
│   └── ThemeContext.js           # Theme provider logic
│
├── lib/                          # Utility functions
│   ├── sanity.client.js          # Sanity client configuration
│   └── sanity.queries.js         # GROQ queries for data fetching
│
├── sanity/                       # Sanity CMS configuration
│   ├── schema.js                 # Schema registry
│   ├── schemas/                  # Content type schemas
│   │   ├── personalInfo.js       # Personal info schema
│   │   ├── project.js            # Project schema
│   │   ├── skill.js              # Skill schema
│   │   └── experience.js         # Work experience schema
│   ├── env.ts                    # Sanity environment config
│   ├── lib/                      # Sanity helper functions
│   │   ├── client.ts             # Client setup
│   │   ├── image.ts              # Image URL builder
│   │   └── live.ts               # Live preview setup
│   ├── schemaTypes/
│   │   └── index.ts              # Schema type exports
│   └── structure.ts              # Studio structure customization
│
├── public/                       # Static assets
│   └── *.svg                     # SVG icons and images
│
├── studio/                       # Additional Studio pages
│   └── [[...index]]/
│       └── page.jsx              # Studio catch-all route
│
├── .gitignore                    # Git ignore rules
├── env.example                   # Environment variables template
├── eslint.config.mjs             # ESLint configuration
├── next.config.js                # Next.js configuration
├── next.config.ts                # TypeScript Next.js config
├── package.json                  # Project dependencies
├── postcss.config.mjs            # PostCSS configuration
├── sanity.cli.ts                 # Sanity CLI configuration
├── sanity.config.js              # Sanity Studio config (JS)
├── sanity.config.ts              # Sanity Studio config (TS)
├── tailwind.config.js            # Tailwind CSS configuration
├── tsconfig.json                 # TypeScript configuration
│
├── CHECKLIST.md                  # Project checklist
├── CODE_EXAMPLES.md              # Code examples and patterns
├── PROJECT_SUMMARY.md            # Detailed project summary
├── QUICKSTART.md                 # 5-minute quick start guide
├── SETUP_GUIDE.md                # Detailed setup instructions
└── README.md                     # This file
```

---

## ⚙️ Configuration

### Tailwind CSS

Edit `tailwind.config.js` to customize:
- Colors and theme
- Spacing and sizing
- Fonts
- Breakpoints
- Animations

### Global Styles

Edit `app/globals.css` for:
- CSS custom properties (color variables)
- Dark mode colors
- Component styles (cards, buttons)
- Custom animations
- Typography

### Sanity Schemas

Edit schemas in `sanity/schemas/` to:
- Add new fields
- Change validation rules
- Modify field types
- Add custom components

### Email Configuration

Update `app/api/contact/route.js` to:
- Change email template
- Add CC/BCC recipients
- Modify validation rules
- Add spam protection

---

## 📝 Content Management

### Accessing the CMS

The Sanity Studio is embedded at `/studio`. Here's what you can manage:

### 1. Personal Information (Singleton)

**Fields:**
- Name (e.g., "John Doe")
- Headline (e.g., "Full Stack Developer")
- Short bio (plain text, ~150 characters)
- Detailed bio (rich text with formatting)
- Profile image (optimized for web)
- Resume file (PDF upload)
- Social links (GitHub, LinkedIn, Twitter, etc.)

**Usage:** This appears in the Hero and About sections.

### 2. Projects

**Fields:**
- Title (project name)
- Slug (URL-friendly identifier)
- Summary (short description)
- Description (rich text with formatting)
- Cover image (project screenshot/thumbnail)
- Technologies (tags: React, Node.js, etc.)
- GitHub URL (link to repository)
- Live demo URL (link to deployed site)
- Featured (checkbox to highlight)
- Order (number for sorting)

**Usage:** Displays in the Projects section and individual project pages.

### 3. Skills

**Fields:**
- Name (e.g., "React", "Node.js")
- Icon (emoji or text)
- Category (Frontend, Backend, Database, Tools, Design)

**Usage:** Organized by category in the Skills section.

### 4. Work Experience

**Fields:**
- Company name
- Role/position
- Start date
- End date (leave empty for "Current")
- Description (rich text)
- Order (number for timeline sorting)

**Usage:** Displays in the Experience Timeline with continuous vertical line.

### Content Workflow

1. **Login** to `/studio` with your Sanity account
2. **Create/Edit** content using the visual editor
3. **Publish** changes (blue button in top right)
4. **View** changes on your site (may take up to 1 hour with ISR, or redeploy)

### Rich Text Features

The rich text editor supports:
- Headings (H2, H3, H4)
- **Bold** and _italic_ text
- Bullet and numbered lists
- Links (internal and external)
- Block quotes
- Custom formatting

---

## 🎨 Customization

### Change Colors

The project uses a modern **cyan/blue** color scheme. To customize:

**Edit `app/globals.css`:**

```css
:root {
  --color-primary: hsl(199 89% 48%);        /* Main brand color */
  --color-background: hsl(210 40% 98%);     /* Light background */
  --color-foreground: hsl(222 47% 11%);     /* Text color */
  /* ... other colors */
}

.dark {
  --color-primary: hsl(199 89% 48%);        /* Same in dark mode */
  --color-background: hsl(222 47% 11%);     /* Dark background */
  /* ... other colors */
}
```

**Popular color alternatives:**
- **Purple**: `hsl(262 83% 58%)` - Creative, modern
- **Green**: `hsl(142 76% 36%)` - Growth, eco-friendly
- **Orange**: `hsl(25 95% 53%)` - Energetic, bold
- **Indigo**: `hsl(231 48% 48%)` - Professional, trustworthy

### Change Fonts

**Edit `app/layout.js`:**

```javascript
import { Inter, Poppins } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })
const poppins = Poppins({ 
  weight: ['400', '600', '700'],
  subsets: ['latin'] 
})
```

### Modify Animations

Each component has Framer Motion variants. Example in `components/HeroSection.jsx`:

```javascript
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6 }
  }
}
```

Adjust `duration`, `delay`, and `ease` values to customize.

### Add New Sections

1. Create a new component in `components/`
2. Import and add to `app/page.js`
3. Create a Sanity schema if needed
4. Add queries in `lib/sanity.queries.js`

---

## 🌐 Deployment

### Deploy to Vercel (Recommended)

Vercel is the creator of Next.js and offers the best integration.

**Step 1: Push to GitHub**

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-repo-url>
git push -u origin main
```

**Step 2: Deploy on Vercel**

1. Go to [vercel.com](https://vercel.com)
2. Click "Import Project"
3. Select your GitHub repository
4. Configure:
   - Framework Preset: **Next.js**
   - Build Command: `npm run build`
   - Output Directory: `.next`
5. Add **all environment variables** from `.env.local`
6. Click "Deploy"

**Step 3: Update Site URL**

After deployment, update the environment variable:
```
NEXT_PUBLIC_SITE_URL=https://your-site.vercel.app
```

### Deploy to Netlify

1. Build command: `npm run build`
2. Publish directory: `.next`
3. Add environment variables
4. Deploy

### Deploy to Other Platforms

The project works on:
- **AWS Amplify**
- **DigitalOcean App Platform**
- **Railway**
- **Render**
- **Self-hosted** with Node.js

---

## 🔐 Environment Variables

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Sanity project ID | `abc123de` |
| `NEXT_PUBLIC_SANITY_DATASET` | Dataset name | `production` |
| `SANITY_API_TOKEN` | API token with Editor access | `sk...` |
| `SMTP_HOST` | Email server hostname | `smtp.gmail.com` |
| `SMTP_PORT` | Email server port | `587` |
| `SMTP_USER` | Email account username | `you@gmail.com` |
| `SMTP_PASS` | Email account password | `app_password` |
| `CONTACT_EMAIL` | Where to receive messages | `contact@domain.com` |
| `NEXT_PUBLIC_SITE_URL` | Your site URL | `https://yoursite.com` |

### Getting Sanity Credentials

1. Go to [sanity.io/manage](https://sanity.io/manage)
2. Select your project
3. **Project ID**: Found in project settings
4. **API Token**: Tokens → Add API token → Editor permissions

### Gmail Setup

For Gmail to work with the contact form:

1. **Enable 2-Factor Authentication** on your Google account
2. **Generate App Password**:
   - Go to [Google Account Settings](https://myaccount.google.com/)
   - Security → 2-Step Verification → App passwords
   - Select "Mail" and your device
   - Copy the 16-character password
3. Use this password in `SMTP_PASS`

### Other Email Providers

**SendGrid:**
```env
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASS=your_sendgrid_api_key
```

**Mailgun:**
```env
SMTP_HOST=smtp.mailgun.org
SMTP_PORT=587
SMTP_USER=postmaster@your-domain.mailgun.org
SMTP_PASS=your_mailgun_smtp_password
```

---

## 🔧 Troubleshooting

### Images Not Loading

**Problem:** Images from Sanity aren't displaying

**Solutions:**
- ✅ Verify `NEXT_PUBLIC_SANITY_PROJECT_ID` is correct
- ✅ Check that images are published in Sanity Studio
- ✅ Ensure `next.config.js` has the correct CDN domain:
  ```javascript
  images: {
    domains: ['cdn.sanity.io']
  }
  ```
- ✅ Clear cache and rebuild: `rm -rf .next && npm run build`

### Email Not Sending

**Problem:** Contact form submissions aren't being received

**Solutions:**
- ✅ Check all SMTP credentials in `.env.local`
- ✅ For Gmail, ensure you're using an App Password (not your regular password)
- ✅ Check spam/junk folder
- ✅ Verify firewall isn't blocking port 587
- ✅ Test SMTP settings with a tool like [SMTP test](https://www.smtpbucket.com/)
- ✅ Check server logs for error messages

### Build Errors

**Problem:** Build fails with errors

**Solutions:**
- ✅ Delete `.next` and `node_modules`:
  ```bash
  rm -rf .next node_modules
  npm install
  npm run build
  ```
- ✅ Check for TypeScript errors: `npm run lint`
- ✅ Ensure all environment variables are set
- ✅ Update dependencies: `npm update`

### Dark Mode Not Working

**Problem:** Theme toggle doesn't work

**Solutions:**
- ✅ Clear browser cache and cookies
- ✅ Check that `next-themes` is installed
- ✅ Verify `ThemeProvider` is in `app/layout.js`
- ✅ Check browser console for JavaScript errors

### Sanity Studio Not Loading

**Problem:** `/studio` shows blank page or errors

**Solutions:**
- ✅ Check Sanity project ID in `.env.local`
- ✅ Clear Sanity cache: `rm -rf node_modules/.cache`
- ✅ Verify you're logged into Sanity: `npx sanity login`
- ✅ Check CORS settings in Sanity dashboard

### Content Not Updating

**Problem:** Changes in Studio don't appear on site

**Solutions:**
- ✅ Wait up to 1 hour (ISR revalidation time)
- ✅ Force redeploy on Vercel
- ✅ Check if content is published (not just drafted)
- ✅ Clear CDN cache on your hosting provider
- ✅ Use Vercel's "Redeploy" button for immediate update

---

## ⚡ Performance

### Lighthouse Scores (Target)

- **Performance**: 90+ 🟢
- **Accessibility**: 95+ 🟢
- **Best Practices**: 95+ 🟢
- **SEO**: 100 🟢

### Optimization Features

✅ **Automatic Image Optimization** - Next.js Image component
✅ **Code Splitting** - Automatic route-based splitting
✅ **Static Generation** - Pre-rendered pages
✅ **ISR** - Incremental Static Regeneration (1 hour)
✅ **Font Optimization** - next/font with subsetting
✅ **CSS Optimization** - Tailwind purging
✅ **Lazy Loading** - Images and components
✅ **Edge Runtime** - Fast global delivery

### Performance Tips

1. **Optimize Images**: Use WebP format and appropriate sizes
2. **Minimize Content**: Keep rich text concise
3. **Reduce Dependencies**: Only import what you need
4. **Enable Caching**: Configure CDN properly
5. **Monitor**: Use Vercel Analytics or Google PageSpeed Insights

---

## 📚 Documentation

### Additional Resources

- **[QUICKSTART.md](./QUICKSTART.md)** - Get started in 5 minutes
- **[SETUP_GUIDE.md](./SETUP_GUIDE.md)** - Detailed setup instructions
- **[PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md)** - Complete project overview
- **[CODE_EXAMPLES.md](./CODE_EXAMPLES.md)** - Code patterns and examples
- **[CHECKLIST.md](./CHECKLIST.md)** - Development checklist

### External Documentation

- [Next.js Documentation](https://nextjs.org/docs)
- [Sanity Documentation](https://www.sanity.io/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Framer Motion Documentation](https://www.framer.com/motion/)

---

## 🤝 Contributing

Contributions are welcome! Here's how:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Coding Standards

- Use ESLint for code quality
- Follow React best practices
- Write meaningful commit messages
- Add comments for complex logic
- Test thoroughly before submitting

---

## 📄 License

This project is licensed under the **MIT License** - see below for details.

```
MIT License

Copyright (c) 2025 [Your Name]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 🙏 Acknowledgments

Built with these amazing technologies:

- **[Next.js](https://nextjs.org/)** by Vercel
- **[Sanity](https://www.sanity.io/)** for content management
- **[Tailwind CSS](https://tailwindcss.com/)** for styling
- **[Framer Motion](https://www.framer.com/motion/)** for animations
- **[React](https://react.dev/)** by Meta
- **[Nodemailer](https://nodemailer.com/)** for email

---

## 📞 Support

Need help? Here's how to get support:

1. **Check Documentation** - Read the guides in this repo
2. **Search Issues** - Look for similar problems in GitHub Issues
3. **Community** - Ask in Next.js or Sanity Discord servers
4. **Create Issue** - Open a GitHub issue with details

---

## 🚀 What's Next?

After deploying your portfolio:

- [ ] Add all your projects and experience
- [ ] Configure custom domain
- [ ] Set up Google Analytics or Plausible
- [ ] Submit sitemap to Google Search Console
- [ ] Share on LinkedIn and social media
- [ ] Get feedback and iterate
- [ ] Keep content updated regularly

---

<div align="center">

**Built with ❤️ using Next.js, Sanity, Tailwind CSS, and Framer Motion**

⭐ Star this repo if you found it helpful!

[⬆ Back to Top](#-portfolio-cms)

</div>
# portfolio-cms
# portfolio-cms
