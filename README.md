# DVP – Supabase Article App

Option 2. Frontend with Supabase

A simple frontend application built with HTML, CSS, and JavaScript using Supabase for authentication and database storage.

Users can register, log in, create posts, and browse existing posts.

#

## Features

- User registration with email confirmation
- Secure login/logout functionality
- Create and store posts in Supabase database
- Browse all posts
- UI updates based on authentication state
- Responsive design (mobile, tablet, desktop)
- Error handling and user feedback

#

## Tech Stack

- HTML5
- CSS3 (mobile-first responsive design)
- Vanilla JavaScript (ES Modules)
- Supabase (Auth + Database)

#

## Installation & Setup

### 1. Clone the repository

git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name

#

### 2. Open the project

This project runs directly in the browser.

You can:

- Open index.html manually
  OR
- Use a local development server (recommended)

Example using VS Code Live Server:

- Right-click index.html
- Select "Open with Live Server"

#

### 3. Supabase configuration

The project uses Supabase for backend services.

In js/supabase.js:

const supabaseUrl = 'YOUR_SUPABASE_URL';
const supabaseKey = 'YOUR_SUPABASE_ANON_KEY';

Replace these with your own Supabase project credentials if needed.

#

## Database Setup

Create a table called posts with the following fields:

Column:

#

id - Type: uuid (primary key, default)

#

title - Type: text

#

content - Type: text

#

category - Type: text

#

submitted_by - Type: text

#

user_id - Type: uuid

#

created_at - Type timestamp (default now())

#

## Authentication

Supabase Authentication is used with:

- Email + password login
- Email confirmation enabled

#

## Row Level Security (RLS)

Enable RLS on the posts table and add policies:

### Allow reading posts

true

### Allow insert for authenticated users

auth.uid() = user_id

#

## Usage

### Register

- Go to register.html
- Create an account
- Confirm email

### Login

- Go to login.html
- Enter credentials

### Browse Posts

- All users can view posts on the homepage

### Create Post

- Available only when logged in
- Submit title, content, and optional category

#

## Responsiveness

### The app uses a mobile-first approach:

- Fluid widths (width: 100%)
- Max-width containers
- Media queries:
  - Tablet: min-width: 600px
  - Desktop: min-width: 900px

  #

## Known Limitations

- Supabase anon key is exposed (acceptable for demo purposes only)
- No edit/delete functionality for posts
- Basic styling (focus on functionality)
- No loading spinner (only message feedback)

## Made by

Jørgen Bjørnethun
