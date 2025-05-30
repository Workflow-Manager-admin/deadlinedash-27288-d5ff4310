# DeadlineDash Main Container Requirements

## 1. Product Vision and Objective

DeadlineDash is a lightweight, client-side application designed to help students manage and visualize upcoming deadlines for exams and assignments. The main container aims to present an intuitive interface where users can add, view, edit, and delete deadlines, each of which is shown as a card with a live countdown timer and related information. The overall goal is to provide a focused, distraction-free experience to maximize clarity and productivity, using a clean dark-themed UI that works seamlessly across devices.

## 2. User Stories

- **As a student**, I want to add deadlines for exams and assignments with a title, due date, and optional note, so that I can keep track of all my upcoming deliverables in one place.
- **As a student**, I want to see each deadline presented with a live countdown showing days remaining, so I always know what’s urgent.
- **As a student**, I want to be able to edit or delete my deadlines easily, so I can keep my list accurate and up-to-date.
- **As a student**, I want to use the application without signing up or logging in, so I can instantly use it whenever I need to.
- **As a student**, I want the app to look modern and readable in both bright and dark conditions, so I can use it comfortably any time of day.
- **As a student**, I want the application to be fast and responsive on both desktop and mobile devices.

## 3. Functional Specifications

### 3.1 Add Deadline
- Users can open an "Add Deadline" modal using a floating action button (FAB) located at a prominent screen corner.
- The form requires:
    - Title (text, required)
    - Due Date (date picker, required)
    - Note (text area, optional)
- On submission, the deadline appears immediately in the list.

### 3.2 View Deadlines
- The main container shows deadlines as cards in a list view.
    - Each card displays:
        - Title
        - Due date (in readable format)
        - Countdown (days/hours remaining, dynamically updated)
        - Note (if present)
        - Edit and Delete controls (icons/buttons)
- The list is sorted so the soonest deadline appears first.

### 3.3 Edit Deadline
- Users can edit an existing deadline by clicking the edit button on its card, opening a modal pre-filled with the current information.
- Adjusted data is saved upon submission and reflects instantly.

### 3.4 Delete Deadline
- Users can delete a deadline from the list.
- Deletion removes the deadline immediately, with an optional confirmation prompt.

### 3.5 Live Countdown
- Each deadline card displays a live countdown showing time remaining until the deadline’s date/time.
- The countdown updates dynamically without requiring a page reload.

### 3.6 Theming and Visual Design
- The application uses a dark theme as default, with the following palette:
    - Primary: var(--kavia-orange) [#E87A41]
    - Background: var(--kavia-dark) [#1A1A1A]
    - Text: var(--text-color) [#FFFFFF]
    - Secondary Text: var(--text-secondary) [rgba(255,255,255,0.7)]
    - Accent/Border: var(--border-color) [rgba(255,255,255,0.1)]
- All major layouts and component stylings use these CSS variables (see `src/App.css`).

### 3.7 Navigation Bar
- A persistent top navigation bar displays the application name/logo.
- The nav bar sits above the main list and remains visible on scroll.

### 3.8 Floating Action Button (FAB)
- A circular ‘+’ button floats above the main content, used to add new deadlines.
- FAB style matches the brand coloring and positioning conventions.

## 4. Technical Stack

- **Framework:** React 18+
- **Styling:** Vanilla CSS, CSS Variables (see `src/App.css`)
- **Build Tooling:** Create React App / react-scripts (no UI libraries/frameworks)
- **Data Storage:** Local client state (memory only, no backend, no persistence across reloads in current MVP)
- **No Backend:** Application is strictly frontend; all data and logic are managed in the browser.
- **Key Files:**
    - Source code under: `deadline_dash/src/`
    - App styling in: `deadline_dash/src/App.css`
- **Color Palette:** Defined as CSS vars for easy adaptation and future theme extension.

## 5. Constraints

- No backend: The entire application runs client-side. Data loss occurs upon page reload (future persistence may be considered).
- No login or account management.
- Minimal dependencies: Only React and related build tools are used; no third-party UI libraries or state management packages.
- Must be simple to read and modify, enabling quick onboarding for contributors.

## 6. Non-Functional Requirements

- **Responsiveness:** Interface adapts gracefully to different device sizes, maintaining usability and aesthetics on phones, tablets, and desktops.
- **Accessibility:** Sufficient color contrast, meaningful button labels/ARIA attributes, navigable via keyboard.
- **Performance:** Fast initial load-time; smooth UI interactions; countdown timers are efficient and do not cause jank.
- **Cross-browser compatibility:** Works in the latest versions of all major browsers (Chrome, Firefox, Safari, Edge).

## 7. Acceptance Criteria

- The app loads with a clear navbar and an empty main list if no deadlines exist.
- Users can add deadlines via the FAB; new deadlines appear immediately.
- Each deadline is shown as a card with title, formatted due date, note (if any), and a live-updating countdown timer.
- Edit and delete controls are present and function as expected.
- The floating action button remains visible and accessible regardless of scroll position.
- All text and controls are readable under the dark theme using the provided color palette.
- The navigation bar is fixed at the top and displays the app name/logo.
- The app is fully usable with only React, JavaScript, and CSS; no backend, no login, no libraries like Redux or Material-UI.
- The layout remains fully functional and visually appealing on desktop and mobile screens.
- Appropriate ARIA attributes and labels are present for accessibility.
- No major UI or logic feature described above is missing or broken.

## 8. Design and UX Considerations

- **Simplicity:** The UI avoids clutter; only essential information and controls are displayed at once.
- **Visual Hierarchy:** Countdown and title are prominent for quick scanning.
- **Feedback:** Button and form actions give instant feedback (visual or via state change).
- **Consistency:** Uses the same color palette, spacing, and typography throughout.
- **Navigation:** All actions are discoverable and require no more than two clicks/taps.
- **Modals:** Add and edit forms appear in modals centered over the list.
- **Touch Support:** Controls are large enough for comfortable use on touch devices.

---

_Last updated: {{date}}_
# DeadlineDash Main Container Requirements

## 1. Product Vision and Objective

DeadlineDash is a lightweight, client-side application designed to help students manage and visualize upcoming deadlines for exams and assignments. The main container aims to present an intuitive interface where users can add, view, edit, and delete deadlines, each of which is shown as a card with a live countdown timer and related information. The overall goal is to provide a focused, distraction-free experience to maximize clarity and productivity, using a clean dark-themed UI that works seamlessly across devices.

## 2. User Stories

- **As a student**, I want to add deadlines for exams and assignments with a title, due date, and optional note, so that I can keep track of all my upcoming deliverables in one place.
- **As a student**, I want to see each deadline presented with a live countdown showing days remaining, so I always know what’s urgent.
- **As a student**, I want to be able to edit or delete my deadlines easily, so I can keep my list accurate and up-to-date.
- **As a student**, I want to use the application without signing up or logging in, so I can instantly use it whenever I need to.
- **As a student**, I want the app to look modern and readable in both bright and dark conditions, so I can use it comfortably any time of day.
- **As a student**, I want the application to be fast and responsive on both desktop and mobile devices.

## 3. Functional Specifications

### 3.1 Add Deadline
- Users can open an "Add Deadline" modal using a floating action button (FAB) located at a prominent screen corner.
- The form requires:
    - Title (text, required)
    - Due Date (date picker, required)
    - Note (text area, optional)
- On submission, the deadline appears immediately in the list.

### 3.2 View Deadlines
- The main container shows deadlines as cards in a list view.
    - Each card displays:
        - Title
        - Due date (in readable format)
        - Countdown (days/hours remaining, dynamically updated)
        - Note (if present)
        - Edit and Delete controls (icons/buttons)
- The list is sorted so the soonest deadline appears first.

### 3.3 Edit Deadline
- Users can edit an existing deadline by clicking the edit button on its card, opening a modal pre-filled with the current information.
- Adjusted data is saved upon submission and reflects instantly.

### 3.4 Delete Deadline
- Users can delete a deadline from the list.
- Deletion removes the deadline immediately, with an optional confirmation prompt.

### 3.5 Live Countdown
- Each deadline card displays a live countdown showing time remaining until the deadline’s date/time.
- The countdown updates dynamically without requiring a page reload.

### 3.6 Theming and Visual Design
- The application uses a dark theme as default, with the following palette:
    - Primary: var(--kavia-orange) [#E87A41]
    - Background: var(--kavia-dark) [#1A1A1A]
    - Text: var(--text-color) [#FFFFFF]
    - Secondary Text: var(--text-secondary) [rgba(255,255,255,0.7)]
    - Accent/Border: var(--border-color) [rgba(255,255,255,0.1)]
- All major layouts and component stylings use these CSS variables (see `src/App.css`).

### 3.7 Navigation Bar
- A persistent top navigation bar displays the application name/logo.
- The nav bar sits above the main list and remains visible on scroll.

### 3.8 Floating Action Button (FAB)
- A circular ‘+’ button floats above the main content, used to add new deadlines.
- FAB style matches the brand coloring and positioning conventions.

## 4. Technical Stack

- **Framework:** React 18+
- **Styling:** Vanilla CSS, CSS Variables (see `src/App.css`)
- **Build Tooling:** Create React App / react-scripts (no UI libraries/frameworks)
- **Data Storage:** Local client state (memory only, no backend, no persistence across reloads in current MVP)
- **No Backend:** Application is strictly frontend; all data and logic are managed in the browser.
- **Key Files:**
    - Source code under: `deadline_dash/src/`
    - App styling in: `deadline_dash/src/App.css`
- **Color Palette:** Defined as CSS vars for easy adaptation and future theme extension.

## 5. Constraints

- No backend: The entire application runs client-side. Data loss occurs upon page reload (future persistence may be considered).
- No login or account management.
- Minimal dependencies: Only React and related build tools are used; no third-party UI libraries or state management packages.
- Must be simple to read and modify, enabling quick onboarding for contributors.

## 6. Non-Functional Requirements

- **Responsiveness:** Interface adapts gracefully to different device sizes, maintaining usability and aesthetics on phones, tablets, and desktops.
- **Accessibility:** Sufficient color contrast, meaningful button labels/ARIA attributes, navigable via keyboard.
- **Performance:** Fast initial load-time; smooth UI interactions; countdown timers are efficient and do not cause jank.
- **Cross-browser compatibility:** Works in the latest versions of all major browsers (Chrome, Firefox, Safari, Edge).

## 7. Acceptance Criteria

- The app loads with a clear navbar and an empty main list if no deadlines exist.
- Users can add deadlines via the FAB; new deadlines appear immediately.
- Each deadline is shown as a card with title, formatted due date, note (if any), and a live-updating countdown timer.
- Edit and delete controls are present and function as expected.
- The floating action button remains visible and accessible regardless of scroll position.
- All text and controls are readable under the dark theme using the provided color palette.
- The navigation bar is fixed at the top and displays the app name/logo.
- The app is fully usable with only React, JavaScript, and CSS; no backend, no login, no libraries like Redux or Material-UI.
- The layout remains fully functional and visually appealing on desktop and mobile screens.
- Appropriate ARIA attributes and labels are present for accessibility.
- No major UI or logic feature described above is missing or broken.

## 8. Design and UX Considerations

- **Simplicity:** The UI avoids clutter; only essential information and controls are displayed at once.
- **Visual Hierarchy:** Countdown and title are prominent for quick scanning.
- **Feedback:** Button and form actions give instant feedback (visual or via state change).
- **Consistency:** Uses the same color palette, spacing, and typography throughout.
- **Navigation:** All actions are discoverable and require no more than two clicks/taps.
- **Modals:** Add and edit forms appear in modals centered over the list.
- **Touch Support:** Controls are large enough for comfortable use on touch devices.

---

_Last updated: {{date}}_
