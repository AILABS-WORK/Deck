# DECK'D - AI-Powered University Auction Platform

🌐 **Live Demo**: [https://AILABS-WORK.github.io/Deck](https://AILABS-WORK.github.io/Deck)

## 🚀 GitHub Pages Setup Instructions

### Current Status Check
Your repository: `https://github.com/AILABS-WORK/Deck`

### Step 1: Verify Repository Settings
1. Go to your repo: [https://github.com/AILABS-WORK/Deck](https://github.com/AILABS-WORK/Deck)
2. Click **Settings** tab
3. Scroll down to **Pages** section
4. **Source** should be set to: **GitHub Actions** (NOT "Deploy from a branch")

### Step 2: Check GitHub Actions
1. Go to **Actions** tab in your repository
2. Look for the "Deploy to GitHub Pages" workflow
3. If it shows ❌ (failed), click on it to see the error
4. If it shows ✅ (success), your site should be live

### Step 3: Access Your Live Site
After the workflow completes successfully:
**Your URL**: [https://AILABS-WORK.github.io/Deck](https://AILABS-WORK.github.io/Deck)

### Step 4: If Site Still Not Working

#### Check These Common Issues:

1. **Repository Must Be Public** ✅
   - Private repos need GitHub Pro for Pages

2. **Workflow Must Complete Successfully**
   - Check the Actions tab for any errors
   - Green checkmark = working
   - Red X = needs fixing

3. **Pages Settings**
   - Settings → Pages → Source: "GitHub Actions"
   - NOT "Deploy from a branch"

4. **Wait Time**
   - Can take 5-10 minutes after workflow completes
   - Try hard refresh (Ctrl+F5 or Cmd+Shift+R)

### Step 5: Manual Trigger (If Needed)
If the workflow didn't run automatically:
1. Go to **Actions** tab
2. Click "Deploy to GitHub Pages" workflow
3. Click "Run workflow" button
4. Select "main" branch
5. Click green "Run workflow" button

## 🔧 Troubleshooting Commands

If you need to update your repository:

```bash
# Make sure you're in your project folder
git add .
git commit -m "Update for GitHub Pages"
git push origin main
```

## ✅ Success Indicators

Your site is working when:
- ✅ Actions tab shows green checkmark for latest workflow
- ✅ Settings → Pages shows "Your site is live at..."
- ✅ URL loads without 404 error

## 🎯 Features

### Core Platform
- **Live Auctions** - Real-time bidding with countdown timers
- **AI Style Matching** - Upload room photos for personalized recommendations
- **AR Visualization** - Place auction items in your room virtually
- **Smart Notifications** - Get alerts for style matches and ending auctions

### Monetization Features
- **Listing Boosts** - $2.99-$7.99 to feature listings
- **Featured Placement** - Top of search results
- **Spotlight Promotion** - Homepage visibility
- **Premium Analytics** - Detailed performance metrics

### Social Features
- **Community Feed** - Share room transformations
- **Leaderboards** - Campus sustainability rankings
- **Achievements** - Badges for eco-friendly actions
- **Challenges** - Weekly sustainability goals

## 🛠 Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Deployment**: GitHub Pages + GitHub Actions

## 📱 Mobile Optimized

- Responsive design for all screen sizes
- Touch-friendly interactions
- Bottom navigation for mobile
- Progressive Web App features

## 🎨 Design System

### Colors
- **Sage Green**: Primary brand color (#7A8471)
- **Cream**: Secondary accent (#F5F1E8)
- **Charcoal**: Dark backgrounds (#2C2C2C)
- **Accent Orange**: Call-to-action (#f97316)

### Typography
- **Display**: Space Grotesk (headings)
- **Body**: Inter (content)
- **Weights**: 300, 400, 500, 600, 700, 800

## 🚀 Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📊 Key Metrics to Track

- **User Engagement**: Time on platform, pages per session
- **Auction Performance**: Bid rates, completion rates
- **Boost Revenue**: Conversion from free to paid listings
- **Social Activity**: Posts, shares, community engagement
- **Sustainability Impact**: Waste diverted, CO2 saved

## 🎯 Target Audience

- **Primary**: University students (18-24)
- **Secondary**: Recent graduates, campus communities
- **Geographic**: Major university cities (Boston, NYC, SF, etc.)

## 💡 Future Enhancements

- **Real-time Chat**: Buyer-seller messaging
- **Video Auctions**: Live streaming for high-value items
- **Campus Partnerships**: Official university integrations
- **Mobile App**: Native iOS/Android applications
- **AI Pricing**: Dynamic pricing recommendations

---

Built with ❤️ for sustainable student communities

## 🔧 Technical Notes

- Uses relative paths (`./`) for GitHub Pages compatibility
- Includes `_redirects` file for SPA routing
- GitHub Actions workflow for automatic deployment
- Optimized build configuration for production

## 🆘 Still Having Issues?

1. **Check your exact repository URL**: https://github.com/AILABS-WORK/Deck
2. **Verify the Actions tab**: Look for successful workflow runs
3. **Confirm Pages settings**: Should be "GitHub Actions" not "Deploy from branch"
4. **Try the direct URL**: https://AILABS-WORK.github.io/Deck
5. **Wait and refresh**: Sometimes takes 10+ minutes to propagate

If none of these work, the issue might be:
- Repository permissions
- GitHub Pages not enabled for your account
- Workflow file not in the correct location