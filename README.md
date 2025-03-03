# Events Platform

A platform for creating, managing, and signing up for community events.

## 🛠 Project Summary

This is a Next.js project for managing and displaying events. The project includes features such as event creation, filtering, pagination and add them directly to their Google Calendar. It also includes an admin dashboard for event management.

### Key Features:

- 📅 Event Browsing: View a list of events with details like date, time, location, and description.
- ✅ Event Sign-Up: Register for events with a single click.
- 📅 Google Calendar Integration: Add signed-up events to Google Calendar seamlessly.
- 🔒 Admin Dashboard: Create, update, or delete events (admin-only).
- 🔍 Search and Pagination: Efficiently browse events with search and paginated views.

## Usage

### Event Creation

To create an event, navigate to the /admin/create page. Fill in the event details and upload images. Click the "Submit" button to create the event.

### Event Management

To manage events, navigate to the /admin/manage page. You can view, edit, and delete events from this page.

### Event Filtering

Use the search bar on the home page to filter events by title.

### Pagination

Navigate through the events using the pagination controls at the bottom of the event list.

### Features

Event creation with image upload
Event management (view, edit, delete)
Event filtering by title
Pagination for event list

## 🎥 Demo Video

Check out the video walkthrough of the Events Platform: https://www.youtube.com/watch?v=3AFh6Lyxztk

## 🚀 Getting Started Locally

⚙️ Requirements:
Node.js: v22.2.0 or higher
npm: v9.6.7 or higher

### 🔄 Step 1: Clone the Repository

```
bash

git clone https://github.com/your-username/events-platform.git
cd events-platform
```

### 📦 Step 2: Install Dependencies

```
npm install
```

### 🛠 Step 3: Set Up Environment Variables

Create a .env.local file in the root directory with the following content:

```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
```

### Database Setup (Optional)

If you need to set up the Supabase database locally:

```
supabase init
supabase start
```

### 🏃‍♂️ Step 4: Run the Development Server

```
npm run dev
```

### ⚙️ Build for Production

```
npm run build
```

### 🚀Deploy on Vercel

- Push your code to GitHub.
- Connect your GitHub repository to Vercel.
- Set up environment variables in Vercel dashboard.
- Deploy!

### 💡 Tech Stack

- Frontend: React, Next.js, Tailwind CSS, Shadcn UI
- Backend: Supabase (PostgreSQL + Auth)
- Calendar: add-to-calendar-button-react
- State Management: Jotai
- Notifications: Sonner

### 📧 Contact

If you have any questions, feel free to open an issue or contact us at: eunwoo.k@icloud.com
