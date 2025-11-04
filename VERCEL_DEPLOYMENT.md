# Vercel Deployment Guide

## Recent Optimizations

This document outlines the fixes applied to resolve Vercel deployment issues.

### Changes Made

1. **Node Version Specification**
   - Added `engines` field to `package.json` specifying Node.js >=18.0.0
   - Created `.nvmrc` file with Node.js version 18
   - Added runtime specification in `vercel.json` for Node.js 18.x

2. **Build Configuration**
   - Verified `vercel.json` is correctly configured
   - Build command: `npm run build`
   - Install command: `npm ci --prefer-offline --no-audit`
   - Output directory: `dist`

### Environment Variables Required

Make sure these are set in your Vercel dashboard (Settings → Environment Variables):

- `VITE_SUPABASE_URL` - Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY` - Your Supabase anonymous/public key

**Note:** The app has fallback services if these are missing, but functionality will be limited.

### Deployment Checklist

Before deploying to Vercel:

- [ ] Verify environment variables are set in Vercel dashboard
- [ ] Ensure `package-lock.json` is committed to git
- [ ] Check that build works locally (`npm run build`)
- [ ] Verify all dependencies are listed in `package.json`

### Troubleshooting

If deployment still fails:

1. **Check Vercel Build Logs**
   - Go to your Vercel project → Deployments → Click on failed deployment
   - Review the build logs for specific error messages

2. **Common Issues**
   - **Missing environment variables**: Check Vercel dashboard settings
   - **Node version mismatch**: Should be resolved with `.nvmrc` and `engines` in `package.json`
   - **Dependency issues**: Run `npm ci` locally to ensure `package-lock.json` is up to date

3. **Verify Build Locally**
   ```bash
   npm ci
   npm run build
   ```

4. **Check TypeScript Errors**
   ```bash
   npm run lint
   ```

### Files Modified

- `package.json` - Added engines specification
- `vercel.json` - Added Node.js runtime specification
- `.nvmrc` - Created for Node version consistency

