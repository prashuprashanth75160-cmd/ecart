# E-Cart | Premium E-Commerce Responsive Web Application

Welcome to **E-Cart**, a modern, state-of-the-art E-Commerce application designed with visual excellence, fluid micro-interactions, responsive layouts, and robust React.js architecture.

## 🚀 Stellar Key Features
* 💎 **Attractive Navbar**: Glassmorphic styling, sticky header, category navigations, expandable queries, and state counters.
* ⚡ **Visual Hero Banner**: Immersive promotional slides, high-end call-to-actions, and featured collection showcases.
* 📦 **Dynamic Catalog & Filtering**: High-fidelity search parameters, instant category filter toggles, active price ceiling range sliders, and multi-mode sorting.
* 💖 **Integrated Wishlist Drawer**: Persistent bookmarking with one-click migrations to the cart.
* 🛒 **Advanced Shopping Cart**: Increments/decrements, item exclusions, interactive discount coupon deduction (`DISCOUNT10` gives 10% off), tax calculators, and checkout modals.
* 👤 **Simulated User Auth**: Login, Registration, and Forgot Password validations.
* 📝 **Interactive Review Board**: Write custom sessions reviews with stars and comments, instantly updated in the current session.
* 📱 **Hyper-Responsive UX**: Carefully tailored layouts fitting perfectly from widescreen desktop formats to mobile viewports.

---

## 🛠️ Technology Stack
* **Framework**: React.js (Functional Components + Hooks)
* **Build Tool**: Vite (Ultra-fast HMR compilation)
* **Styling**: Modern Custom CSS variables & glassmorphism
* **State Management**: React Context Hook APIs
* **Navigation**: React Router DOM (v6)
* **Icons**: Tailwind Labs Heroicons (SVG icons)

---

## 💻 Local Setup and Dev Server
Ensure you have **Node.js** (v18+) and **npm** installed. Then run the following in your shell:

1. **Install dependencies**:
   ```bash
   npm install
   ```
2. **Launch dev environment**:
   ```bash
   npm run dev
   ```
   *The catalog will open instantly at `http://localhost:3000`.*

3. **Production Build**:
   ```bash
   npm run build
   ```

---

## 📁 Repository Structure
```
├── public/                 # Static assets (images, logos)
├── src/
│   ├── assets/             # CSS & global assets
│   ├── components/         # Shared components (Navbar, Footer, ProductCard)
│   ├── context/            # Global contexts (Auth, Cart, Wishlist)
│   ├── data/               # Mock DB (products.json)
│   ├── pages/              # Primary views (Home, Products, Details, etc.)
│   ├── App.jsx             # Main Router layout
│   └── main.jsx            # Entry mount point
├── package.json            # Dependencies & Scripts
├── vite.config.js          # Vite configs
└── README.md               # Project guide
```

---
*Crafted for visual dominance and perfect functionality.*
