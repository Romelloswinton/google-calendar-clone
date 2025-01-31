Google Calendar Clone
This project is a simplified clone of Google Calendar, built using TypeScript, React, and CSS/Tailwind for styling. The goal of this project is to recreate core features of Google Calendar, including event management, month navigation, and modal interactions.

Features
Monthly View: A calendar that displays the current month by default with buttons for navigation.
Event Creation: Add new events with name, time, and color selection.
Edit Events: Modify event details or delete them through a modal.
Event Overflow Handling: If a day has too many events, a "More" button appears to view all events for that day.
Persistence: Events are stored in localStorage to persist data on page refresh.
Responsive Design: The calendar adapts well to mobile and desktop screen sizes.
Modal Animations: Smooth transitions for opening and closing modals.

Project Breakdown
Technologies Used
TypeScript: Type-safe JavaScript for better code quality and tooling.
React: UI library to build reusable components and manage state.
Next.js: React framework to simplify building React applications.
Tailwind CSS: Utility-first CSS framework for styling.
Day.js: A lightweight date manipulation library.

Features Implemented
Rendering the Current Month: Displays the current month's calendar with a button to navigate between months and to return to the current month.
Event Management: Allows adding, editing, and deleting events.
Event Modal: The modal has fields for the event name, start time, end time, color, and whether it's an all-day event.
Event Overflow: Displays a "More" button when the events for a day exceed the calendar’s space.
Persistent Storage: Events are saved in localStorage, ensuring that they persist across page reloads.
Accessibility: Focuses on ensuring that all elements are keyboard-navigable and screen-reader friendly.
Getting Started
To run the project locally, follow these steps:

Prerequisites
Ensure that you have Node.js and npm installed. You can download them from the official site: https://nodejs.org.

Installation
Clone the repository to your local machine:
git clone https://github.com/Romelloswinton/google-calendar-clone.git
cd google-calendar-clone
Install dependencies:
npm install
Run the project:
npm start
This will launch the development server and open the app in your default browser.

Directory Structure
app/: Contains all the project’s source code.
components/: Includes reusable components like the calendar, modal, and event elements.
lib/: Stores the hooks used for event and date management.
styles/: Contains the styling files (Tailwind CSS, custom styles).
public/: Holds static assets like images and the index.html file.

Features to Be Implemented
Drag-and-drop events: Drag events to a different day or time.
Recurring events: Add functionality for recurring events.
Google Calendar API Sync: Integration to sync events with Google Calendar.
Known Issues
Mobile responsiveness may require additional adjustments in certain breakpoints.
Contributing
Feel free to fork this project and submit issues or pull requests. Contributions are always welcome!

License
This project is licensed under the MIT License - see the LICENSE file for details.

Acknowledgments
Special thanks to the course instructor and community resources for guidance throughout this project.
