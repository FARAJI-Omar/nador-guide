PHASE 0 – PROJECT FOUNDATION (Setup & Architecture)
0.1 Project Initialization


Install core dependencies:

react-router-dom

redux-toolkit + react-redux

axios

react-hook-form + yup

react-toastify
0.2 Folder Structure (Very Important)

Define this early to avoid chaos later:
src/
 ├── app/            // redux store config
 ├── features/
 │    ├── auth/
 │    ├── places/
 │    └── categories/
 ├── pages/
 │    ├── visitor/
 │    └── admin/
 ├── components/
 │    ├── common/
 │    ├── layout/
 │    └── ui/
 ├── routes/
 ├── services/       // axios & API calls
 ├── types/
 ├── utils/
 └── hooks/

 0.3 Routing Strategy

Define routes before coding pages:

Public routes (visitor)

Protected routes (admin)

PHASE 1 – DATA MODELING & FAKE BACKEND
1.1 Define Core Entities (Typescript Interfaces)

Place:
Place {
  id: number
  name: string
  category: Category
  description: string
  images: string[]
  openingHours?: OpeningHours
  price?: string
  address?: string
  transport?: Transport[]
  isActive: boolean
  createdAt: string
  updatedAt: string
}
Category:
Category {
  id: number
  name: string
  slug: string
}

1.2 JSON Server Setup

Create:

db.json

Seed with:

Categories

Places (active + inactive)
Endpoints:

GET /places

GET /places/:id

POST /places

PUT /places/:id

DELETE /places/:id

👉 This allows frontend to move fast.
PHASE 2 – VISITOR SPACE (Public Area)
2.1 Visitor Layout

Header

Footer

Main content area

This layout wraps all visitor pages.
2.2 Home Page

Purpose:

Introduce Nador

Entry point to categories & places

Implementation:

Static hero section

Categories list (clickable)

CTA to explore places
2.3 Places Listing Page

Core business feature.

Features to implement step by step:

    1.Fetch only active places

    2.Display cards:

Image

Name

Category

Short description

    3.Loading state

    4.Empty state

2.4 Filtering by Category

Fetch categories

Multi-select filtering

Client-side filtering (JSON Server friendly)

2.6 Place Details Page

Very important UX page.

Sections:

Image gallery

Full description

Category

Opening hours

Price

Address

Transport & accessibility

Rules:

Missing data → hide section or show “Not available”

Back button to list

PHASE 3 – AUTHENTICATION & SECURITY
3.1 Authentication Flow

Using DummyJSON Auth API.

Steps:

1.Login form (email + password)

2.On success:

Store JWT in localStorage

Update Redux auth state

3.Axios interceptor:

Attach token to requests

4.Logout:

Clear token

Reset Redux auth state

3.2 Protected Routes

Create:

PrivateRoute component

Rules:

If not authenticated → redirect to /admin/login

After login → redirect back to intended page

PHASE 4 – ADMIN SPACE (Core Management)
4.1 Admin Layout

Separate UI from visitor:

Sidebar

Topbar

Content area
4.2 Admin Dashboard

First admin page after login.

Display:

Total places

Active vs inactive

Places per category

(No charts needed at first, numbers are enough)

4.3 Admin Places List

Advanced table view.

Features:

Show all places

Status badge (Active / Inactive)

Sorting

Filtering by:

Category

Status

Actions:

Edit

Activate / Deactivate

Delete

4.4 Create Place

Form-driven page.

Steps:

1.React Hook Form + Yup

2.Required fields validation

3.Image upload (mock URLs for now)

4.Submit → POST to JSON Server

5.Toast success

6.Redirect to list

4.5 Edit Place

Same form, but:

Prefilled data

PUT request

Update updatedAt

4.6 Activate / Deactivate Place

Toggle isActive

Visitor sees changes immediately

No deletion from visitor side
4.7 Delete Place

Confirmation modal

DELETE request

Redirect with feedback
PHASE 5 – STATE MANAGEMENT (Redux Toolkit)
5.1 Slices to Create

authSlice

placesSlice

categoriesSlice

5.2 Async Thunks

fetchPlaces

fetchPlaceById

createPlace

updatePlace

deletePlace

togglePlaceStatus
5.3 Global UI States

loading

error

success feedback

PHASE 6 – UX, POLISH & QUALITY
6.1 Error Handling

API errors

Empty states

Unauthorized access

6.2 Notifications

Success

Error

Warning (confirmations)

6.3 Responsive Design

Mobile first

Cards grid adapts

Admin tables scrollable
PHASE 7 – CLEANUP & PREPARATION FOR NEXT FEATURES
7.1 Code Refactoring

Extract reusable components

Custom hooks

Clean services layer

7.2 Prepare for Newsletter (But Don’t Implement)

Leave extension points

Do NOT couple logic with places