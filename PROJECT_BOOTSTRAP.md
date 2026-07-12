# PROJECT_BOOTSTRAP.md

# Travel Companion

You are the Lead Software Engineer for this project.

Your responsibility is to build and maintain a production-quality Progressive Web Application (PWA) called **Travel Companion**.

This is NOT a Singapore travel website.

It is a reusable travel platform.

Singapore is only the first trip.

You are expected to make architectural decisions that improve maintainability, scalability and user experience.

Whenever a requested implementation can be improved, explain why and implement the better solution.

---

# Repository

GitHub

https://github.com/girishprasannamk/travel-companion

Current Branch

main

---

# Current Status

Already completed

✔ Next.js 16

✔ TypeScript

✔ Tailwind CSS

✔ App Router

✔ ESLint

✔ React Compiler

✔ GitHub repository

✔ Initial landing page

✔ Basic folder structure

✔ Documentation started

---

# Development Environment

Mac Mini M1

Node.js installed

npm installed

Git configured

SSH configured

GitHub connected

---

# Development Commands

Run locally

npm install

npm run dev

Open

http://localhost:3000

Build

npm run build

Lint

npm run lint

---

# Deployment

Deployment target

GitHub Pages

Every push to main should automatically deploy.

If GitHub Actions are not configured, create them.

Deployment workflow

Developer

↓

Commit

↓

Push

↓

GitHub Actions

↓

Build

↓

Deploy GitHub Pages

↓

PWA Updates

↓

iPhone refreshes automatically

---

# Future Deployment

Architecture should support

GitHub Pages

Vercel

Firebase Hosting

without changing application code.

---

# Technology Stack

Next.js 16

TypeScript

Tailwind CSS

shadcn/ui

Framer Motion

Zustand

React Hook Form

Zod

date-fns

Lucide React

Recharts

next-themes

PWA

---

# Project Vision

Build the best offline-first travel companion.

The app should help users

Plan

Travel

Track expenses

Manage tickets

Navigate

Store documents

Capture memories

Relive trips

It should eventually support unlimited trips.

---

# Core Principles

Offline First

Mobile First

Apple-quality UI

Reusable

Fast

Accessible

Beautiful

Minimal

No unnecessary complexity

No backend for Version 1

---

# Folder Structure

Use feature-based architecture.

features/

dashboard

trip

budget

tickets

journal

transport

restaurants

weather

settings

ai

components/

ui

layout

common

data/

trips/

services/

hooks/

types/

store/

docs/

scripts/

---

# Coding Standards

Strict TypeScript

No any

No hardcoded values

Reusable components

Small focused files

Prefer composition over inheritance

Prefer server components unless client components are required

Maximum component size

300 lines

Maximum function size

50 lines

Document public utilities

---

# Git Workflow

main

Stable

develop

Integration

feature/*

Feature branches

Use conventional commits

Examples

feat:

fix:

refactor:

docs:

build:

test:

style:

Never commit broken code.

---

# UI Guidelines

Inspired by

Apple Wallet

Apple Maps

Apple Calendar

Linear

Notion

Design principles

Rounded corners

Large whitespace

Smooth animations

Minimal borders

Subtle shadows

Premium feel

Dark mode first

Responsive

iPhone optimized

---

# Navigation

Bottom navigation

Home

Trips

Timeline

Budget

Journal

Settings

---

# Trip Engine

Never hardcode Singapore.

Everything must be driven by data.

Trips are stored separately.

Current structure

data/

trips/

singapore-2026/

trip.json

hotel.json

budget.json

itinerary.json

tickets.json

restaurants.json

expenses.json

journal.json

---

# Data Model

Trip

Hotel

Flight

Day

Event

Expense

Ticket

Restaurant

JournalEntry

PackingItem

Document

EmergencyContact

---

# Expense Module

Support

Food

Transport

Grab

Taxi

MRT

Tickets

Shopping

Misc

Each expense stores

Date

Time

Amount

Currency

Exchange Rate

INR Amount

Category

Merchant

Location

Payment Method

Receipt

Notes

Tags

Analytics

Daily

Weekly

Trip Total

Category Totals

Planned vs Actual

---

# Ticket Module

Each ticket stores

Official Price

Purchase Price

Vendor

Purchase Date

Booking ID

QR Code

PDF

Refund Policy

Validity

Support comparison

Official

Klook

KKday

Pelago

Go City

Mandai Bundles

Sentosa Bundles

Automatically recommend cheapest combination.

---

# Journal Module

Every day

Photos

Videos

Notes

Weather

Expenses

Favourite Memory

Rating

Location

---

# Documents

Store

Flights

Hotel

Insurance

Passport copies

Tickets

Emergency contacts

Offline accessible

---

# Maps

Support

Google Maps

Apple Maps

Offline later

---

# AI (Future)

Trip-aware assistant.

Knows

Current trip

Budget

Weather

Location

Purchased tickets

Timeline

Can recommend itinerary changes.

---

# Singapore Trip

Trip

Singapore

Dates

12 August 2026

to

19 August 2026

Travellers

2 Adults

1 Child

---

# Flight

Arrival

12 Aug

5:40 PM

Singapore

Departure

19 Aug

7:40 PM

Singapore

---

# Hotel

Hotel Mi Rochor

Stay

12 Aug

to

19 Aug

No Sentosa hotel stay.

Return to hotel every night.

---

# Transport

Prefer MRT

Use Grab when necessary

Sentosa

Use Boardwalk while entering

Sentosa Express while returning if tired

---

# Attractions

Gardens by the Bay

Cloud Forest

Flower Dome

Marina Bay Sands

Spectra

Universal Studios

SEA Aquarium

Madame Tussauds

Sentosa

Siloso Beach

Wings of Time

Singapore Zoo

River Wonders

Night Safari

Jewel

Mustafa

Little India

Chinatown

Merlion

Orchard Road

---

# Itinerary

Already decided

Arrival

12 Aug evening

Hotel check-in

Little India dinner

13 Aug

Gardens by the Bay

Marina Bay

14 Aug

Universal Studios

15 Aug

Sentosa

16 Aug

Marina Bay

Spectra

17 Aug

Zoo

River Wonders

Night Safari

18 Aug

Shopping

Jewel

19 Aug

Checkout

Jewel

Airport

Flight

Return

---

# Budget

Hotel budget

Approx ₹50,000

Track

Flights

Hotel

Tickets

Food

Transport

Shopping

Misc

---

# Future Features

Cloud Sync

Firebase

Family Sharing

Photo Timeline

AI

Travel Replay

Trip Export

Trip Import

Widgets

Apple Watch

---

# Immediate Tasks

1.

Configure GitHub Actions

2.

Configure GitHub Pages deployment

3.

Configure PWA

4.

Create Design System

5.

Create Dashboard

6.

Create Trip Engine

7.

Load Singapore Trip

8.

Budget Module

9.

Tickets Module

10.

Journal Module

---

# Working Rules

Always keep documentation updated.

Always update README.

Always explain architectural changes.

Always preserve reusable architecture.

Prefer quality over speed.

Never break existing functionality.

Always ensure application builds successfully before committing.

You are responsible for making this a production-quality open-source project.
