# Velora

An e-commerce fashion store built using **Next.js**, **React**, **Sanity.io**, **ShadCN**, **NextAuth**, **TailwindCSS**, **Stripe**, and **Zustand** for managing state. This project includes features like shopping bag management, wishlist functionality, user authentication, order management, and enhanced product filtering.

## Features

- **Product Browsing**: Filter products by categories, sizes, and search terms.
- **Shopping Bag & Wishlist**: Add/remove products to/from the shopping bag and wishlist.
- **Authentication**: User login via **NextAuth**.
- **Orders**: Manage orders, including viewing previous orders and Stripe integration for payments.
- **Skeleton Loading**: Skeleton components implemented for all product pages.
- **Responsive Design**: Tailored to work seamlessly across devices.

## Tech Stack

- **Frontend**: 
  - [Next.js](https://nextjs.org) – Server-side rendering and React framework.
  - [React](https://reactjs.org) – Component-based UI library.
  - [TailwindCSS](https://tailwindcss.com) – Utility-first CSS framework for responsive design.
  - [ShadCN](https://shadcn.dev) – UI components and patterns.

- **Backend**:
  - [Sanity.io](https://www.sanity.io) – Headless CMS for managing content.
  - [NextAuth](https://next-auth.js.org) – Authentication and authorization.
  - [Stripe](https://stripe.com) – Payment processing.

- **State Management**:
- [Zustand](https://zustand.pmnd.rs) – State management for handling the shopping bag and wishlist.

## Screenshots

### Home Page
<img src="https://github.com/MuhamedGamall/velora-ecommerce/blob/main/public/readme/velora-readme-image%20(4).png" width="400px" />

### Product Page
<img src="https://github.com/MuhamedGamall/velora-ecommerce/blob/main/public/readme/velora-readme-image%20(2).png" width="400px" /> 

### Shopping Bag
<img src="https://github.com/MuhamedGamall/velora-ecommerce/blob/main/public/readme/velora-readme-image%20(1).png" width="400px" /> 

### Explore Page - Search page
<img src="https://github.com/MuhamedGamall/velora-ecommerce/blob/main/public/readme/velora-readme-image%20(3).png" width="400px" /> 


## Getting Started

### Setup .env file

```env
# sanity
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=
NEXT_PUBLIC_SANITY_TOKEN=

# google
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# next auth
NEXTAUTH_URL=
NEXTAUTH_SECRET=

# stripe
STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SIGNING_SECRET_KEY=


```

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/en/download/)
- [Yarn](https://yarnpkg.com/getting-started/install) (or use npm)
- Sanity CLI for managing content: 
  ```bash
  npm install -g @sanity/cli
  ```

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/MuhamedGamall/velora-ecommerce.git
   cd velora-ecommerce
   ```

2. **Install dependencies**:

   ```bash
   yarn install
   # or
   npm install
   ```

3. **Set up environment variables**:

   Create a `.env.local` file at the root of the project and fill in your specific environment variables.

4. **Run Sanity Studio**:

   If you're using Sanity for content management, navigate to your Sanity folder and start the studio:

   ```bash
   cd sanity
   sanity start
   ```

5. **Run the Next.js development server**:

   Start the Next.js development server:

   ```bash
   yarn dev
   # or
   npm run dev
   ```

   Your app should now be running at [http://localhost:3000](http://localhost:3000).

## Functionality

### Shopping Bag

- Add products to the shopping bag, and remove products using Zustand for state management.

### Wishlist

- Add products to the wishlist, and remove products using Zustand for state management.

### Orders

- Manage order status, Stripe integration for payments, and view order history.

### Product Filtering

- Search products by name, filter by category, and apply additional filters to refine results.

---

## License

This project is licensed under the MIT License.
