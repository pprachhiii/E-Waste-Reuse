# 🌍 Component Reusability Platform (E-Waste Reuse Prototype)

## 🔑 Scope

- **Roles**:

  1. **Consumer** → disposes e-waste responsibly
  2. **Business Owner** → acquires verified reusable components

- Fully **componentized** (React pages + reusable components)
- Clear, **debug-friendly setup** (props, comments)
- End-to-end flow **complete for both roles**

---

## Pages & Components

### 1. Common

- **Login / Signup Page** → role selection (Consumer / Business Owner)
- **Navigation Bar** → role-based navigation
- **Dashboard Layout** → reusable shell for both roles
- **Chat Component** → secure in-app messaging
- **Notification Component** → role-specific alerts
- **Impact Tracker Component** → environmental impact summary

---

### 2. Consumer Role

**Pages:**

1. **Consumer Dashboard**

   - Summary of active listings
   - Impact stats preview

2. **Upload Component Page**

   - Upload photo
   - Form → description, condition, location
   - Categorization suggestion

3. **My Listings Page**

   - Table/grid of uploaded components
   - Actions: edit / delete
   - Viewed-by counter

4. **Matches & Notifications Page**

   - Shows interested businesses
   - Suggested alternatives

5. **Chat Page**

   - Consumer ↔ Business communication

6. **Impact Dashboard**

   - Cards showing: total e-waste saved, CO₂ reduction, successful reuses

---

### 3. Business Owner Role

**Pages:**

1. **Business Dashboard**

   - Recent searches, wishlist preview
   - Impact summary

2. **Marketplace / Search Page**

   - Browse components
   - Search + filters (location, condition)
   - Suggested items

3. **Wishlist Page**

   - Saved component interests
   - Notifications for new items

4. **Chat Page**

   - Negotiations with consumers
   - Pickup/shipping coordination

5. **Transaction History Page**

   - Past purchases
   - Export receipts (placeholder)

6. **Impact Dashboard**

   - Environmental savings summary

---

## ⚡ User Flows (End-to-End)

### Consumer Flow

1. Login → Consumer
2. Upload component → categorized
3. Listing goes live
4. Notification → interest from businesses
5. Secure chat → arrange pickup
6. Transaction completed → dashboard updates

### Business Owner Flow

1. Login → Business Owner
2. Search marketplace → relevant listings
3. Express interest → consumer notified
4. Secure chat → finalize pickup
5. Receipt generated
6. Dashboard updates → impact summary

---
