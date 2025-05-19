# Qurb-Grocery-Cart

# 🛒 Qurb Grocery Cart

Qurb Grocery Cart is a fully functional, modern grocery shopping web application built with **Vite**, **React.js**, and **Tailwind CSS**. The app allows users to browse grocery items by category, manage a shopping cart, apply special offers, and proceed to a checkout page with detailed order summary.

---

##  Features

### Product Listing
- Displays products with image, name, price, and category.
- Filter products by category (e.g., drinks, bakery, fruit, etc.).

### Cart Functionality
- Add items to cart from product listing.
- Adjust item quantity directly in the cart.
- Remove individual items from the cart.

### 🎁 Offer Application
- Offers can be applied based on specific logic (e.g., "Buy 1 Get 1", % discount).
- Dynamic subtotal, discount, and total calculation.

### State Persistence
- Cart data and selected offers persist across route changes using React Context API.

### 💳 Checkout Page
- Displays detailed summary: items, subtotal, discount, and final total.
- Finalizes cart with selected offer applied.

### 🔔 Toast Notifications
- Feedback for actions like adding/removing items using `react-toastify`.

---

## 🛠️ Technologies Used

- **React.js** — Frontend framework for building UI components.
- **Vite** — Fast build tool for React development.
- **Tailwind CSS** — Utility-first CSS framework for responsive and modern design.
- **React Router DOM** — Page routing between Home and Checkout.
- **React Toastify** — Lightweight notification library for toast messages.
- **React Context API** — For global cart and offer state management.

---

## 📁 Folder Structure (Brief Overview)
grocery-app/
└── src/
    ├── api/
    │   └── api.ts             # API functions for fetching products using axios
    ├── assets/                
    ├── components/            # Reusable UI components
    │   ├── CheckoutCard.tsx
    │   ├── NavBar.tsx
    │   ├── OfferCarousel.tsx
    │   └── ProductCard.tsx
    ├── context/
    │   └── context.tsx        # React Context for managing cart and offer state
    ├── hooks/                 # Custom hooks
    │   ├── useFilteredProducts.tsx
    │   └── useOffers.tsx
    ├── pages/                 
    │   ├── Checkout.tsx
    │   └── Home.tsx
    ├── App.tsx               
    └── main.tsx               


---

## ⚙️ How to Run Locally

### Prerequisites

- Node.js (v16 or higher recommended)
- npm or yarn

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/Juhi-Pant/Qurb-Grocery-Cart.git
   cd Qurb-Grocery-Cart
   cd grocery-app

2. Install Dependencies
   ```bash
   npm install

2. Start Development Server
   ```bash
   npm run dev

## Vercel Link 
   [Grocery Cart](https://grocerycartjp.vercel.app/)

---

## 👩‍💻 Created By

Made by **Juhi Pant**  
🎓 Pre-final year IT student | 💻 Full-stack Developer  
🔗 [GitHub](https://github.com/Juhi-Pant) • [LinkedIn](https://www.linkedin.com/in/juhi-pant-6b192b16b/)

Feel free to connect or reach out for collaboration opportunities or feedback!


