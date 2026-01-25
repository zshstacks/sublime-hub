# SublimeHub

A comprehensive full-stack web platform combining real-time uptime monitoring and live cryptocurrency tracking capabilities.

![SublimeHub Banner](https://img.shields.io/badge/SublimeHub-Workspace-00D9A3?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
- [Modules](#modules)
- [Authentication](#authentication)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)

## Overview

SublimeHub is a modern web application that provides two powerful modules:

1. **Uptime Monitor** - Track the availability and performance of your HTTP services with real-time monitoring
2. **Crypto Tracker** - Monitor cryptocurrency markets with live price updates via WebSocket connections

## Features

### Core Features
- **Secure Authentication** - JWT-based auth with refresh tokens
- **OAuth2 Integration** - Sign in with Google
- **Email Verification** - OTP-based email confirmation on registration
- **Password Recovery** - Forgot password flow with email OTP
- **User Settings** - Account management and customization
- **Modern UI** - Built with Tailwind CSS and Framer Motion animations

### Uptime Monitor Module
- **HTTP Monitoring** - Track website and API uptime
- **Flexible Intervals** - Check intervals from 30 seconds to 60 minutes
- **System Overview** - Dashboard with up/down status and system health percentage
- **Stability Metrics** - Per-monitor stability indicators
- **Response Latency** - 24-hour performance graphs
- **Live Heartbeats** - Real-time monitoring timeline
- **Monitor Management** - Create and delete monitors

### Crypto Tracker Module
- **Live Price Updates** - Real-time data via Binance WebSocket API
- **Favorites System** - Pin your preferred cryptocurrencies
- **Market Statistics** - Market cap, 24h volume, BTC dominance
- **ETH Gas Tracker** - Updated every 10 minutes
- **Trending & Top Gainers** - Sidebar with market movers
- **Asset Explorer** - 450+ coins with advanced filtering
- **Category Filters** - Layer 1, DeFi, AI, Gaming & NFT, Meme, Stablecoins, Layer 2
- **Sorting Options** - Top gainers, new listings
- **Search Functionality** - Find individual coins
- **Smooth Animations** - Price updates with Framer Motion

## Tech Stack

### Frontend
- **Framework:** Next.js with React
- **Language:** TypeScript
- **State Management:** Redux Toolkit
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Real-time:** WebSockets

### Backend
- **Language:** Go (Golang)
- **Framework:** Echo
- **Database:** PostgreSQL
- **Real-time:** WebSockets
- **Authentication:** JWT with refresh tokens
- **OAuth:** Google OAuth2

### External APIs
- **Binance WebSocket API** - Cryptocurrency price feeds
- **Email Service** - OTP delivery system

## Architecture

```
┌─────────────────┐
│   Next.js UI    │
│  (React + TS)   │
└────────┬────────┘
         │
         │ HTTP/WS
         │
┌────────▼────────┐
│   Echo Server   │
│   (Golang)      │
└────────┬────────┘
         │
         │
┌────────▼────────┐
│  PostgreSQL DB  │
└─────────────────┘

External:
┌─────────────────┐
│  Binance WS API │
└─────────────────┘
```

## Getting Started

### Prerequisites

- Node.js (v24+)
- Go (v1.25+)
- PostgreSQL (v18+)
- Git

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/zshstacks/sublime-hub
cd sublime-hub
```

2. **Setup Backend**
```bash
cd server
go mod download
```

3. **Configure Environment Variables**
```bash
# Backend (.env)
APP_ENV=development
PORT=8000

DB_NAME=database_name
DB_PASSWORD=database_password
DB_HOST=localhost
DB_PORT=5432
DB_USER=database_user

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

SMTP_PASS=your_password
SMTP_USERNAME=your_email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_FROM=your_from

JWT_SECRET=your_jwt_secret
JWT_ACCESS_TTL=15
JWT_REFRESH_TTL=7
```

```bash
# Frontend (.env.local)
NEXT_PUBLIC_API_URL=http://localhost:8000
```

4. **Database Migration**
```bash
cd server
go run cmd/migrate/main.go
```

5. **Run the application**

Backend:
```bash
cd server
go run cmd/server/main.go
```

Frontend:
```bash
cd client
npm install
npm run dev
```

6. **Access the application**
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000

## Modules

### Uptime Monitor

Monitor your services with customizable check intervals:

**Configuration Options:**
- Check Interval: 30s, 1m, 2m, 5m, 10m, 15m, 30m, 60m
- Response Timeout: 1s - 30s
- Monitor Type: HTTP/HTTPS

**Metrics Tracked:**
- Response time
- Status code
- Uptime percentage
- Incident history

### Crypto Tracker

Track cryptocurrency markets in real-time:

**Supported Coins:** 450+ cryptocurrencies

**Categories:**
- Layer 1 (Bitcoin, Ethereum, etc.)
- DeFi protocols
- AI tokens
- Gaming & NFT
- Meme coins
- Stablecoins
- Layer 2 solutions

**Market Data:**
- Real-time prices
- 24h change percentage
- Market capitalization
- Trading volume
- ETH gas prices

## Authentication

### Supported Methods

1. **Email/Password**
    - Registration with email verification
    - Password strength validation
    - Secure password hashing

2. **Google OAuth2**
    - One-click sign in
    - Automatic account creation

### Security Features

- JWT access tokens (short-lived)
- Refresh tokens (HTTP-only cookies)
- OTP-based email verification
- Password reset via email OTP
- CSRF protection

## API Documentation

### Authentication Endpoints

```
POST   /register              - Register new user
POST   /login                 - Login user
POST   /auth/refresh          - Refresh access token
POST   /auth/refresh/logout   - Logout user
POST   /auth/verify-email     - Verify email with OTP
POST   /auth/resend-otp       - Resend OTP email
POST   /auth/reset            - Request password reset
POST   /auth/reset/new        - Reset password with OTP
GET    /uth/google            - Google OAuth initiation
GET    /auth/oauth/google     - Google OAuth callback
```

### Uptime Monitor Endpoints

```
GET    /api/monitors           - Get all monitors
POST   /api/monitors           - Create new monitor
GET    /api/monitors/:id       - Get monitor details
DELETE /api/monitors/:id       - Delete monitor
GET    /api/monitors/:id/stats - Get monitor statistics
```

### Crypto Tracker Endpoints

```
GET    /api/crypto/coins            - Get all coins
GET    /api/crypto/user/favorites   - Get user favorites
POST   /api/crypto/user/favorites   - Add to favorites
GET    /api/crypto/categories       - Get coin categories
GET    /api/crypto/market-stats     - Get coin market stats
WS     /ws/crypto                   - WebSocket connection
```

### User Endpoints

```
GET    /user/current                       - Get user profile
PUT    /user/current/change-username       - Update profile
DELETE /user/current/delete                - Delete account
```

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Authors

- **zshstacks** - [GitHub Profile](https://github.com/zshstacks)

## Acknowledgments

- Binance API for cryptocurrency data
- Echo framework for the robust Go backend
- Next.js team for the amazing React framework
- Tailwind CSS for the utility-first CSS framework

