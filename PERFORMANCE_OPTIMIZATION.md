# Performance Optimization Guide

## Changes Implemented

### ✅ 1. Database Connection Pooling (Neon PostgreSQL)

**Problem**: Direct database connections have high latency, especially when backend (Azure Southeast Asia) is far from database (Azure East US).

**Solution**: Use Neon's connection pooler (pgBouncer)

#### Azure Environment Variables to Update:

```bash
# CURRENT (Slow - Direct Connection):
DATABASE_URL=postgresql://neondb_owner:npg_K5mw4PaDlihS@ep-little-river-a8dosl5j.eastus2.azure.neon.tech/homequest?sslmode=require

# NEW (Fast - Pooled Connection):
DATABASE_URL=postgresql://neondb_owner:npg_K5mw4PaDlihS@ep-little-river-a8dosl5j-pooler.eastus2.azure.neon.tech/homequest?sslmode=require&connection_limit=10&pool_timeout=10
```

**Key Changes**:
- Change host from `ep-little-river-a8dosl5j.eastus2.azure.neon.tech` to `ep-little-river-a8dosl5j-pooler.eastus2.azure.neon.tech` (add `-pooler`)
- Add `connection_limit=10` - Limit Prisma connections (free tier has 20 connection limit)
- Add `pool_timeout=10` - Connection timeout in seconds

**Expected Improvement**: 40-60% reduction in query latency

---

### ✅ 2. API Response Compression

**Problem**: Large JSON responses (properties with images, reviews, etc.) take time to transfer

**Solution**: Added gzip compression middleware

**Implementation**:
```typescript
// server/src/index.ts
import compression from "compression";

app.use(compression({
  filter: (req, res) => {
    if (req.headers['x-no-compression']) return false;
    return compression.filter(req, res);
  },
  level: 6 // Balance between speed and compression ratio
}));
```

**Expected Improvement**: 60-80% reduction in response payload size

---

### ✅ 3. HTTP Cache-Control Headers

**Problem**: Browser re-fetches same data repeatedly (properties, reviews)

**Solution**: Added cache headers for GET requests

**Implementation**:
```typescript
// Static data (properties, reviews) - Cache 5 minutes
if (req.path.startsWith('/properties') || req.path.startsWith('/reviews')) {
  res.setHeader('Cache-Control', 'public, max-age=300, stale-while-revalidate=60');
}

// User-specific data - Cache 1 minute
else if (req.path.includes('/tenants/') || req.path.includes('/landlords/')) {
  res.setHeader('Cache-Control', 'private, max-age=60');
}
```

**Expected Improvement**: Eliminates redundant API calls for recently fetched data

---

### ✅ 4. RTK Query Cache Optimization

**Problem**: Frontend re-fetches data on every mount/focus

**Solution**: Configured intelligent cache settings

**Implementation**:
```typescript
// client/src/state/api.ts
export const api = createApi({
  keepUnusedDataFor: 300, // Keep data 5 minutes
  refetchOnMountOrArgChange: 60, // Only refetch if data is older than 60 seconds
  refetchOnFocus: false, // Don't refetch when window regains focus
  refetchOnReconnect: true, // Refetch when internet reconnects
  // ... rest
});
```

**Expected Improvement**: 50-70% reduction in API calls

---

### ✅ 5. CORS Configuration for Production

**Problem**: Production Vercel URL not whitelisted in backend CORS

**Solution**: Added production URLs to CORS allowed origins

**Implementation**:
```typescript
const corsOptions = {
  origin: [
    "http://localhost:3000",
    "http://localhost:3001",
    "https://homequest-six.vercel.app", // Production
    "https://homequest-api.azurewebsites.net", // Azure backend
    process.env.CLIENT_URL
  ].filter(Boolean),
  // ... rest
};
```

---

## Additional Optimizations to Consider

### 🔄 6. Database Query Optimization

Review common queries and add:

1. **Select only needed fields**:
```typescript
// Instead of fetching all fields
const properties = await prisma.property.findMany();

// Select only what you need
const properties = await prisma.property.findMany({
  select: {
    id: true,
    title: true,
    price: true,
    photoUrls: true,
    // ... only fields you display
  }
});
```

2. **Add database indexes** for frequently queried fields:
```prisma
model Property {
  id        Int     @id @default(autoincrement())
  price     Float
  city      String  @db.VarChar(100)
  
  @@index([price])
  @@index([city])
  @@index([landlordCognitoId])
}
```

3. **Pagination** for large datasets:
```typescript
// Add to property search
const properties = await prisma.property.findMany({
  take: 20, // Limit to 20 results
  skip: (page - 1) * 20, // Pagination
  // ... rest
});
```

---

### 🔄 7. Image Optimization

**Current Issue**: Full-size images loaded from S3

**Solutions**:

1. **Create thumbnails** during upload:
```typescript
// In verificationControllers.ts, add thumbnail generation
import sharp from 'sharp';

const thumbnail = await sharp(buffer)
  .resize(300, 300, { fit: 'cover' })
  .jpeg({ quality: 80 })
  .toBuffer();

// Upload both original and thumbnail
await uploadToS3(buffer, `verification/${filename}`);
await uploadToS3(thumbnail, `verification/thumbnails/${filename}`);
```

2. **Use CloudFront CDN** in front of S3 for faster delivery

3. **Lazy load images** with Next.js Image component:
```tsx
import Image from 'next/image';

<Image 
  src={photoUrl} 
  width={300} 
  height={200}
  loading="lazy"
  placeholder="blur"
/>
```

---

### 🔄 8. Code Splitting & Bundle Optimization

**Current Issue**: Large initial JavaScript bundle

**Solutions**:

1. **Dynamic imports** for heavy components:
```typescript
// Instead of
import PropertyMap from '@/components/PropertyMap';

// Use
const PropertyMap = dynamic(() => import('@/components/PropertyMap'), {
  loading: () => <LoadingSpinner />,
  ssr: false
});
```

2. **Analyze bundle size**:
```bash
cd client
npm install --save-dev @next/bundle-analyzer
```

Add to `next.config.ts`:
```typescript
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  // ... existing config
});
```

Run: `ANALYZE=true npm run build`

---

## Deployment Steps

### 1. Update Azure Backend

**Option A: Azure Portal**
1. Go to Azure Portal → App Services → homequest-api
2. Configuration → Application settings
3. Update `DATABASE_URL` with pooled connection
4. Save and restart

**Option B: Azure CLI**
```bash
az webapp config appsettings set \
  --name homequest-api \
  --resource-group YourResourceGroup \
  --settings DATABASE_URL="postgresql://neondb_owner:npg_K5mw4PaDlihS@ep-little-river-a8dosl5j-pooler.eastus2.azure.neon.tech/homequest?sslmode=require&connection_limit=10&pool_timeout=10"
```

### 2. Deploy Backend Changes

```bash
cd server
git add .
git commit -m "Add performance optimizations: compression, caching, pooled DB connection"
git push origin main
```

GitHub Actions will automatically deploy to Azure.

### 3. Deploy Frontend Changes

```bash
cd client
git add .
git commit -m "Optimize RTK Query cache settings for better performance"
git push origin main
```

Vercel will automatically deploy.

### 4. Verify Changes

**Test compression**:
```bash
curl -H "Accept-Encoding: gzip" -I https://homequest-api.azurewebsites.net/properties
# Should see: Content-Encoding: gzip
```

**Test caching**:
```bash
curl -I https://homequest-api.azurewebsites.net/properties
# Should see: Cache-Control: public, max-age=300, stale-while-revalidate=60
```

**Test database connection**:
- Monitor Azure Application Insights for query response times
- Should see 40-60% improvement in database query duration

---

## Monitoring Performance

### 1. Frontend Performance (Vercel)

- Go to Vercel Dashboard → homequest → Analytics
- Check:
  - Time to First Byte (TTFB)
  - First Contentful Paint (FCP)
  - Largest Contentful Paint (LCP)

**Target Metrics**:
- TTFB: < 600ms
- FCP: < 1.8s
- LCP: < 2.5s

### 2. Backend Performance (Azure)

- Azure Portal → App Services → homequest-api → Application Insights
- Check:
  - Average response time
  - Request rate
  - Failed requests

**Target Metrics**:
- Average response time: < 500ms
- Failed requests: < 1%

### 3. Database Performance (Neon)

- Neon Console → homequest → Monitoring
- Check:
  - Active connections
  - Query duration
  - Connection rate

**Target Metrics**:
- Active connections: < 10
- Average query duration: < 100ms

---

## Expected Overall Improvement

| Metric | Before | After | Improvement |
|--------|--------|-------|-------------|
| API Response Time | 800-1500ms | 300-600ms | **60-70%** |
| Page Load Time | 3-5s | 1.5-2.5s | **50-60%** |
| Data Transfer Size | 500KB-2MB | 150KB-500KB | **70-80%** |
| API Calls per Session | 20-30 | 8-12 | **60%** |

---

## Troubleshooting

### Issue: "Too many database connections"

**Solution**: Reduce `connection_limit` in DATABASE_URL to 5:
```
?connection_limit=5&pool_timeout=10
```

### Issue: "CORS errors in production"

**Solution**: Verify CLIENT_URL in Azure:
```bash
az webapp config appsettings set \
  --name homequest-api \
  --settings CLIENT_URL="https://homequest-six.vercel.app"
```

### Issue: "Cached data showing old information"

**Solution**: Reduce cache time or force refetch:
```typescript
// In api.ts, reduce keepUnusedDataFor
keepUnusedDataFor: 60, // 1 minute instead of 5

// Or force refetch specific query
const { data, refetch } = useGetPropertiesQuery();
refetch(); // Call when needed
```

---

## Next Steps

After deploying these changes:

1. ✅ Monitor performance metrics for 24 hours
2. 🔄 Implement image optimization (thumbnails + lazy loading)
3. 🔄 Add database indexes for common queries
4. 🔄 Implement pagination for property listings
5. 🔄 Set up CloudFront CDN for S3 assets
6. 🔄 Bundle size optimization with dynamic imports

---

**Need Help?** Check Azure Application Insights logs for detailed performance metrics and error tracking.
