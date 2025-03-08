## Google Calendar Clone

A modern, responsive web application that replicates the core functionality of Google Calendar using Next.js and React.
📅 Overview
This project is a front-end implementation of a Google Calendar-like interface, focusing on providing a seamless user experience for managing events and schedules. Built with Next.js 15 and React 19, it leverages modern web technologies to create a responsive and interactive calendar application.

### ✨ Features

Interactive calendar interface
Day, week, and month views
Event creation and management
Drag and drop functionality for events
Responsive design for all device sizes
Real-time UI updates using Framer Motion animations

### 🛠️ Technology Stack

Next.js 15: React framework with file-based routing
React 19: For building the user interface
TypeScript: For type safety and better developer experience
Tailwind CSS: For styling and responsive design
Radix UI: For accessible UI components
Zustand: For state management
dayjs: For date manipulation and formatting
Framer Motion: For smooth animations and transitions
Lucide React & React Icons: For UI icons

## 📱 Screenshots

![Calendar View](./screenshots/calendar-view.png)
![Add Event](./screenshots/Add-Event.png)
![Event Details Popover](./screenshots/Event-Details.png)
![Event List Popover](./screenshots/Event-List.png)
![Mobile View](./screenshots/Mobile-View.png)

### 🚀 Getting Started

#### Prerequisites

Node.js 18.x or higher
npm or yarn

#### Installation

1. Clone the repository:
   git clone https://github.com/yourusername/google-calendar-clone.git
   cd google-calendar-clone

2. Install dependencies:
   npm install

   # or

   yarn install

3. Start the development server:
   npm run dev

   # or

   yarn dev

4. Open http://localhost:3000 in your browser to see the application.

#### 🔧 Scripts

- npm run dev: Starts the development server with Turbopack

### 🏗️ Project Structure

```
src/
├── components/           🧩 UI Building Blocks
│   ├── Calendar/         📅 Calendar Components
│   ├── Header/           🎯 App Navigation
│   ├── Popovers/         💬 Interactive Dialogs
│   └── Forms/            📝 Input Components
├── lib/
    ├── hooks/             🪝 Custom Logic
    ├── store/            📦 State Management
    └── utils/            🛠️ Helper Functions
```

#### Development Notes

This is a front-end only implementation without backend integration
UI components are built with Radix UI for accessibility
State management is handled with Zustand
The project uses the App Router feature of Next.js 15

### 🧩 Key Components

Calendar Views: Implements day, week, and month views similar to Google Calendar
Event Management: Create, edit, and delete events
Time Grid: Visual representation of time slots
Navigation: Easy navigation between dates and views
Event Modals: Interactive modals for event details

### 🎨 UI/UX

Clean, minimal design inspired by Google Calendar
Responsive layout that works on desktop, tablet, and mobile
Smooth animations for transitions and user interactions
Accessible components following WCAG guidelines

### 🏗️ Future Improvements

Add authentication system
Implement recurring events
Add notifications and reminders
Enable calendar sharing functionality
Add dark mode support
Implement time zone support

### 📄 License

This project is for educational purposes. All rights reserved.
