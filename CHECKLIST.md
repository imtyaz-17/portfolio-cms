# Portfolio Setup Checklist

Use this checklist to ensure your portfolio is fully configured and ready to deploy.

## Pre-Launch Checklist

### 🔧 Initial Setup

- [ ] Node.js 18+ installed
- [ ] Dependencies installed (`npm install`)
- [ ] Sanity account created
- [ ] Sanity project created
- [ ] Project ID obtained
- [ ] API token generated
- [ ] `.env.local` file created from `env.example`
- [ ] Environment variables configured

### 🎨 Sanity Configuration

- [ ] CORS origins added in Sanity dashboard
  - [ ] `http://localhost:3000` for development
  - [ ] Production URL (when available)
- [ ] CORS credentials enabled
- [ ] API token has Editor/Administrator permissions
- [ ] Studio accessible at `/studio`

### 📧 Email Setup (for contact form)

- [ ] SMTP service chosen (Gmail, SendGrid, etc.)
- [ ] SMTP credentials obtained
- [ ] Email environment variables set
- [ ] Test email sent successfully
- [ ] Spam folder checked

### 📝 Content Added

#### Personal Information (Required)
- [ ] Name filled in
- [ ] Professional headline added
- [ ] Profile image uploaded (high quality)
- [ ] Short bio written (1-2 sentences)
- [ ] Detailed bio written (multiple paragraphs)
- [ ] Resume PDF uploaded (optional)
- [ ] Social links added (GitHub, LinkedIn, etc.)
- [ ] Personal info published

#### Projects (Recommended: at least 3)
- [ ] Project 1 created and published
  - [ ] Title and slug
  - [ ] Cover image
  - [ ] Summary and description
  - [ ] Technologies/tags
  - [ ] GitHub link (if applicable)
  - [ ] Live demo link (if applicable)
  - [ ] Display order set
- [ ] Project 2 created and published
- [ ] Project 3 created and published
- [ ] Additional projects added

#### Skills (Recommended: 10-20)
- [ ] Frontend skills added
- [ ] Backend skills added
- [ ] Database skills added
- [ ] Tools & platforms added
- [ ] Design skills added (if applicable)
- [ ] Skill icons uploaded (optional)
- [ ] Skills categorized correctly
- [ ] All skills published

#### Work Experience (Recommended: 2-5)
- [ ] Current/most recent position added
- [ ] Previous positions added
- [ ] Company names and roles correct
- [ ] Dates accurate
- [ ] Job descriptions written
- [ ] Display order set (most recent first)
- [ ] All experiences published

### 🎯 Development Testing

- [ ] Development server starts without errors
- [ ] Home page loads correctly
- [ ] All sections display with content
- [ ] Dark mode toggle works
- [ ] Theme persists on refresh
- [ ] Project cards display properly
- [ ] Skills grid shows correctly
- [ ] Experience timeline renders
- [ ] Contact form displays
- [ ] Footer shows

#### Individual Project Pages
- [ ] Project pages generate for all projects
- [ ] Images display correctly
- [ ] Rich text content renders
- [ ] Technology tags show
- [ ] External links work
- [ ] Back navigation works

#### Responsive Design
- [ ] Mobile view (< 640px) looks good
- [ ] Tablet view (640px - 1024px) looks good
- [ ] Desktop view (> 1024px) looks good
- [ ] All sections responsive
- [ ] Images scale properly
- [ ] Navigation works on mobile

#### Contact Form
- [ ] Form displays correctly
- [ ] All fields required
- [ ] Email validation works
- [ ] Submit button functions
- [ ] Loading state shows
- [ ] Success message appears
- [ ] Error handling works
- [ ] Email received successfully

### 🚀 Pre-Deployment

- [ ] All content reviewed for typos
- [ ] All images optimized
- [ ] All links tested
- [ ] Console has no errors
- [ ] Build completes successfully (`npm run build`)
- [ ] Production build runs locally (`npm run start`)
- [ ] Environment variables documented

### 📦 Deployment (Vercel)

- [ ] Code pushed to GitHub
- [ ] Repository connected to Vercel
- [ ] Project imported in Vercel
- [ ] All environment variables added
  - [ ] `NEXT_PUBLIC_SANITY_PROJECT_ID`
  - [ ] `NEXT_PUBLIC_SANITY_DATASET`
  - [ ] `SANITY_API_TOKEN`
  - [ ] `SMTP_HOST`
  - [ ] `SMTP_PORT`
  - [ ] `SMTP_USER`
  - [ ] `SMTP_PASS`
  - [ ] `CONTACT_EMAIL`
  - [ ] `NEXT_PUBLIC_SITE_URL` (production URL)
- [ ] Deployment successful
- [ ] Production site accessible

### ✅ Post-Deployment Verification

- [ ] Production site loads
- [ ] All sections render correctly
- [ ] Images load from Sanity CDN
- [ ] Dark mode works
- [ ] Contact form sends emails
- [ ] Project pages load
- [ ] Studio accessible at production URL + `/studio`
- [ ] Can edit content in production Studio
- [ ] Content updates appear (within revalidation time)

### 🔍 SEO & Performance

- [ ] Page titles are descriptive
- [ ] Meta descriptions added
- [ ] Open Graph tags working
- [ ] Twitter cards working
- [ ] Images have alt text
- [ ] Lighthouse performance > 90
- [ ] Lighthouse accessibility > 90
- [ ] Lighthouse best practices > 90
- [ ] Lighthouse SEO > 90
- [ ] Mobile-friendly test passes

### 🌐 Domain & SSL (if using custom domain)

- [ ] Custom domain purchased
- [ ] DNS configured
- [ ] Domain added in Vercel
- [ ] SSL certificate active (automatic)
- [ ] HTTPS redirect works
- [ ] www redirect configured (if applicable)
- [ ] Domain added to Sanity CORS

### 📊 Analytics & Monitoring (Optional)

- [ ] Google Analytics / Plausible added
- [ ] Search Console verified
- [ ] Sitemap submitted
- [ ] Error tracking configured
- [ ] Performance monitoring enabled

### 🔒 Security

- [ ] API tokens not exposed in client code
- [ ] Environment variables secured
- [ ] CORS properly configured
- [ ] No sensitive data in repository
- [ ] `.env.local` in `.gitignore`

### 📚 Documentation

- [ ] README.md reviewed
- [ ] SETUP_GUIDE.md bookmarked
- [ ] QUICKSTART.md understood
- [ ] PROJECT_SUMMARY.md read
- [ ] Environment variables documented
- [ ] Deployment notes written

## Post-Launch Maintenance

### Weekly
- [ ] Check for contact form submissions
- [ ] Review analytics (if enabled)
- [ ] Update content as needed

### Monthly
- [ ] Check for package updates
- [ ] Review site performance
- [ ] Backup Sanity dataset
- [ ] Test contact form

### Quarterly
- [ ] Update Next.js version
- [ ] Update dependencies
- [ ] Refresh content
- [ ] Add new projects
- [ ] Update experience section

## Common Issues Checklist

If something isn't working, check:

### Content Not Showing
- [ ] Content published in Sanity Studio
- [ ] Environment variables correct
- [ ] CORS configured properly
- [ ] API token has correct permissions
- [ ] Waited for revalidation (up to 1 hour)

### Images Not Loading
- [ ] Sanity CDN domain in `next.config.js`
- [ ] Images published in Sanity
- [ ] Image URLs generating correctly
- [ ] No CORS errors in console

### Contact Form Not Working
- [ ] SMTP credentials correct
- [ ] Email environment variables set
- [ ] 2FA enabled (for Gmail)
- [ ] App password generated (for Gmail)
- [ ] Port 587 not blocked
- [ ] Checked spam folder

### Build Errors
- [ ] All dependencies installed
- [ ] Environment variables set
- [ ] No TypeScript errors
- [ ] No ESLint errors
- [ ] Cleared `.next` folder
- [ ] Cleared `node_modules` and reinstalled

### Studio Not Loading
- [ ] Project ID correct
- [ ] Dataset name correct
- [ ] CORS origins include site URL
- [ ] Studio path is `/studio`

## Success Criteria

Your portfolio is ready when:

- ✅ All checklist items complete
- ✅ Site loads in < 2 seconds
- ✅ All content accurate and current
- ✅ No console errors
- ✅ Mobile-friendly
- ✅ Dark mode works perfectly
- ✅ Contact form tested
- ✅ All links verified
- ✅ Professional appearance
- ✅ Ready to share with employers/clients!

---

## Need Help?

If you're stuck on any item:
1. Check [SETUP_GUIDE.md](./SETUP_GUIDE.md) for detailed instructions
2. Review [QUICKSTART.md](./QUICKSTART.md) for basics
3. Consult [README.md](./README.md) for troubleshooting
4. Check official documentation:
   - [Next.js Docs](https://nextjs.org/docs)
   - [Sanity Docs](https://www.sanity.io/docs)
   - [Tailwind Docs](https://tailwindcss.com/docs)

---

**Tip**: Print this checklist and check off items as you go! 🎉

