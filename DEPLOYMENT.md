# TicketRush Trainer - Deployment Guide

## Vercel Deployment (Recommended)

### Option 1: Deploy via GitHub (Easiest)

1. **Push to GitHub**
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/ticketnoob.git
   git branch -M main
   git push -u origin main
   ```

2. **Import in Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with GitHub
   - Click "Add New..." → "Project"
   - Select the `ticketnoob` repository
   - Vercel auto-detects Next.js
   - Click "Deploy"

3. **Environment Variables**
   - Project Settings → Environment Variables
   - Add the following:
     ```
     NEXT_PUBLIC_APP_NAME=TicketRush Trainer
     NEXT_PUBLIC_DIFFICULTY_MODE=normal
     NEXT_PUBLIC_SOUND_ENABLED=true
     ```
   - Click "Save"

4. **Done!**
   - Your site is live at `https://ticketnoob.vercel.app` (or custom domain)

### Option 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow the prompts
# Choose organization and project name
```

### Option 3: Manual Build & Deploy

```bash
# Build locally
npm run build

# Deploy to Vercel
vercel --prod
```

## Environment Setup

### Production Variables
Set these in Vercel Dashboard → Settings → Environment Variables:

```
NEXT_PUBLIC_APP_NAME=TicketRush Trainer
NEXT_PUBLIC_DIFFICULTY_MODE=normal
NEXT_PUBLIC_SOUND_ENABLED=true
```

### Local Development
Create `.env.local`:
```
NEXT_PUBLIC_APP_NAME=TicketRush Trainer
NEXT_PUBLIC_DIFFICULTY_MODE=normal
NEXT_PUBLIC_SOUND_ENABLED=true
```

## Custom Domain

1. Vercel Dashboard → Project Settings
2. Domains → Add Domain
3. Choose "Use External DNS" or "Use Vercel DNS"
4. Follow domain registrar instructions
5. DNS changes propagate in 24-48 hours

## Performance Optimization

### Image Optimization
- Already configured with Next.js Image component
- Vercel CDN automatically optimizes delivery

### Caching Strategy
- Static pages cached at edge
- Dynamic content cached with ISR (Incremental Static Regeneration)

### Build Optimization
```bash
# Build size analysis
npm run build

# Typical size: ~2.5MB gzipped
```

## Monitoring

### Vercel Analytics
- Automatic performance monitoring
- Web Vitals tracking
- Real-time traffic insights

Enable in Vercel Dashboard:
1. Project Settings → Analytics
2. Enable "Web Analytics"
3. View metrics in Analytics tab

## SSL/TLS Certificate

- **Automatic**: Vercel provides free SSL certificates
- Valid for all domains (primary + subdomains)
- Auto-renewal handled by Vercel

## Troubleshooting

### Build Fails
```bash
# Check for TypeScript errors locally
npm run build

# Check logs
vercel logs --follow
```

### Slow Performance
- Check Vercel Analytics dashboard
- Enable "Edge Functions" for faster processing
- Verify image optimization is working

### Environment Variables Not Loading
- Vercel Dashboard → Settings → Environment Variables
- Rebuild deployment (Vercel → Redeploy)
- Clear browser cache (Ctrl+Shift+Del)

### Popups Not Working After Deploy
- Check browser console for errors
- Verify no Content Security Policy blocks
- Test in incognito mode

## Rollback

If deployment has issues:

1. Vercel Dashboard → Deployments
2. Find previous working deployment
3. Click "..." → "Promote to Production"

## Local vs Production

### Run Production Build Locally
```bash
npm run build
npm start
```

This mimics the production environment exactly.

## Advanced Configuration

### Custom Redirects (vercel.json)
```json
{
  "redirects": [
    {
      "source": "/old-path",
      "destination": "/new-path"
    }
  ]
}
```

### Headers
```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        }
      ]
    }
  ]
}
```

## Scaling

TicketRush Trainer automatically scales with Vercel:
- **0-100 users**: Covered by free tier
- **100-10k users**: Standard pricing applies
- **10k+ users**: Enterprise plan recommended

## Security

### What's Protected
- SSL/TLS encryption for all traffic
- DDoS protection via Vercel
- No real payment data stored
- No user authentication system

### Security Headers
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`

## Backup & Recovery

### Code Backup
```bash
git push origin main
```

All code is backed up on GitHub automatically.

### Database/Data
- No persistent database used
- Stats stored client-side only
- No data loss possible

## Maintenance

### Update Dependencies
```bash
npm update
npm audit fix
git push origin main
```

Vercel will auto-deploy on push.

### Monitor Logs
```bash
vercel logs --follow
```

## Support

### Vercel Support
- Free tier: Community support
- Paid tier: Priority support
- Email: support@vercel.com

### TicketRush Trainer Support
- Check README.md
- Review GitHub issues
- Test in local environment

## Deployment Checklist

- [ ] Push to GitHub
- [ ] Create Vercel account
- [ ] Import GitHub repository
- [ ] Set environment variables
- [ ] Deploy
- [ ] Test all features
- [ ] Add custom domain (optional)
- [ ] Enable analytics
- [ ] Monitor performance

## Cost Estimate (Monthly)

- **Free Tier**: $0 (up to 100 concurrent users)
- **Pro**: $20 (better performance, priority support)
- **Enterprise**: Custom pricing

For TicketRush Trainer, **free tier is sufficient** unless you have 100+ concurrent users.

---

**Deployment complete! Your TicketRush Trainer is now live!** 🚀
