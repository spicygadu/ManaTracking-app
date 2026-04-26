# ProTracker MVP - Couple Expense Tracker

Free, open-source expense tracking for couples with income-weighted splitting.

## What It Does

- **Budget Planning** — Set monthly budgets (Needs/Wants/Saving)
- **Expense Tracking** — Automatic sync from Nordic banks (SEB, Bank Norwegian)
- **Smart Splitting** — Income-weighted settlement (who owes whom)
- **Trends** — See spending patterns over months
- **No Subscription** — Completely free forever

## Quick Start (30 minutes)

### 1. Fork/Clone This Repo
```bash
git clone https://github.com/YOUR_USERNAME/ManaTracking-app.git
cd ManaTracking-app
```

### 2. Set Up Google Sheet
- Create Budgets sheet in your existing ProTracker sheet
- Export Transactions, Income Log, Settings as CSV URLs

### 3. Deploy Apps Script
- Copy `ProTracker_Backend.gs` into Apps Script editor
- Deploy as Web app
- Copy deployment URL

### 4. Deploy React App
- Update `.env` with your Apps Script URL
- Update `src/ProTracker.jsx` with your names/income
- Push to GitHub
- Deploy to Vercel (free)

### 5. Share URL
- Send Vercel URL to your partner
- Both see the same dashboard

**Full instructions:** See `DEPLOYMENT_GUIDE.md`

---

## Architecture

```
Google Sheet (data storage + bank sync)
    ↓
Apps Script (backend API)
    ↓
React App (frontend UI) → Vercel
    ↓
Browser → PWA (install on home screen)
```

## Features

### Budget
- Set Needs/Wants/Saving monthly
- Save templates
- Compare to previous months

### Dashboard
- Real-time progress bars
- Category breakdown
- Spending trends

### Settlement
- Income-weighted fairness
- Who paid what
- Who owes whom

### "My Money" View
- Your personal spending
- Your share of household
- Your partner's allocation

## MVP vs. Full Version

This is **MVP** (minimum viable product):
- ✅ Budget input (3 numbers)
- ✅ Dashboard with progress bars
- ✅ Settlement calculation
- ✅ Spending trends
- ❌ Transaction editing (use Sheet for now)
- ❌ Collaborative proposals
- ❌ Notifications

**Future versions** can add these features.

---

## Configuration

Update your data in `src/ProTracker.jsx`:

```javascript
const CONFIG = {
  P1_NAME: 'Dheeraj',
  P1_INCOME: 42000,
  P2_NAME: 'Srestha',
  P2_INCOME: 32000,
  APPS_SCRIPT_URL: 'https://...'
};
```

---

## Deployment URLs

- **Vercel App:** `https://your-app.vercel.app`
- **Apps Script:** `https://script.google.com/macros/d/.../usercodeapp`

---

## Files Included

```
ProTracker_Backend.gs      — Apps Script backend
ProTracker_App.jsx         — React frontend
package.json               — Dependencies
.env                       — Configuration
DEPLOYMENT_GUIDE.md        — Full setup instructions
```

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| "API Error" | Check `.env` has correct Apps Script URL |
| Budget not saving | Hard refresh (Ctrl+Shift+R) |
| No transactions | Bank sync may not have run yet |
| Partner can't access | Share the Vercel URL (not localhost) |

---

## Privacy

- CSV URLs are "secret link" public (unguessable but technically accessible)
- No data is sent to third parties
- Everything stored in your Google Drive

If privacy is critical:
- Add a password gate (optional)
- Run locally only (no Vercel deployment)

---

## Costs

- **GitHub:** Free (code storage)
- **Vercel:** Free tier (hosting, ~3 deployments/month limit)
- **Google Sheets:** Free (data storage)
- **Apps Script:** Free (backend)

**Total cost: $0/month**

---

## Development

### Run locally

```bash
npm install
npm start
```

Open `http://localhost:3000`

### Build for production

```bash
npm run build
```

### Deploy changes

```bash
git add .
git commit -m "Your message"
git push origin main
```

(Vercel auto-deploys on push)

---

## Future Features (Optional)

- [ ] Add/edit transactions from app
- [ ] Collaborative budget proposals
- [ ] Push notifications
- [ ] Detailed category budgets
- [ ] Multi-couple support
- [ ] Mobile app (Capacitor)

---

## License

MIT — Use freely, modify, share

---

## Questions?

See `DEPLOYMENT_GUIDE.md` for full setup guide.

---

**Built for couples who want to manage shared finances without stress.** 💰👫
