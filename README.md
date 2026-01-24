# 📦 StockMaster

StockMaster is a modern inventory and business management system built for small to medium-sized businesses.
It enables secure product, sales, and staff management with strict multi-tenant data isolation and role-based access control designed for real operational use.

## Features

- **Enterprise-Grade Security**
  Multi-tenant data isolation, JWT authentication, and role-based access control.

- **Business Onboarding**
  Fast business registration with automatic owner account creation.

- **Staff Management**
  Owners can create staff accounts and assign granular roles and permissions.

- **Inventory Management**
  Create, update, and manage products with full audit history.

- **Sales Processing**
  Automatic stock deductions upon completed sales.

- **Audit Logs**
  Complete history tracking for product adds, updates, and sales.

## Technology Stack

- **Frontend:** Next.js TypeScript, Tailwind CSS

- **Backend:** Next.js API Routes

- **Database:** PostgreSQL

- **ORM:** Prisma

- **Authentication:** Custom JWT Implementation

- **Environment:** Docker (Local Database)

## Getting Started

### Prerequisites

- Node.js 18+

- Docker (for PostgreSQL)

### Installation

1. Clone the repository:
   `git clone https://github.com/PatrickNandom/stock_master.git`

2. Install dependencies:
   `npm install`

## Configure environment variables in a .env file:

- DATABASE_URL=[insert it here]
- JWT_SECRET=[insert it here]
- NEXT_PUBLIC_API_URL=[insert it here]

## Initialize the database:

- npx prisma migrate dev --name init

- Run the application:
- npm run dev

- Visit [https://stock-master-ehfe.vercel.app/] to access the dashboard.

## Permissions Overview

- **Owner**
- Full business settings, staff management, inventory control, audit logs.

- **Admin**
- Manage staff, products, sales, and view audit logs.

- **Staff**
- Create sales only.

## Roadmap

- Analytics dashboard for sales trends

- Inventory export to CSV / PDF

- Low stock email alerts

## License

- MIT License © Nandom Patrick Molshakat

## Contact

- For questions or support, open an issue or reach out at[patricknandom82@gmail.com].
