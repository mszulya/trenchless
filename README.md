
# Trenchless Project

## Overview
This project is a web-based application built with **Vue 3** and **Tailwind CSS**, designed to assist users in selecting trenchless methods, crossing options, and materials.

---

## Features
- Fetches methods dynamically from an API (`https://apidev.borely.com/v1/methods`).
- Includes a clean and responsive UI with Tailwind CSS.
- Interactive tabs to guide users through selections.
- Real-time loading indicators and dynamic data updates.

---

## Requirements
- A modern web browser (e.g., Google Chrome, Firefox, Safari).
- An internet connection (required for API calls).

---

## Setup Instructions

### 1. Download or Clone the Repository
```bash
git clone https://github.com/your-repository/trenchless.git
cd trenchless
```

### 2. Open the Application
- Locate the `index.html` file in the project folder.
- Open `index.html` in your browser by:
  - Dragging the file into the browser window.
  - Or right-clicking on the file and selecting **"Open With" > Your Browser**.

### 3. View the Application
- Once the file is open in your browser, the app will load.
- If the API data doesn’t load, ensure your internet connection is active.

---

## Notes

- **Local Development Server**: For better development, you can serve the project with a local HTTP server (e.g., `http-server`).
  ```bash
  npm install -g http-server
  http-server
  ```
  Open the link provided in the terminal (usually `http://localhost:8080`).

- **API Issues**: If the API (`https://apidev.borely.com/v1/methods`) is down or unavailable, mock data can be used for testing.

---

## Dependencies
- **Vue.js**: Included via CDN.
- **Tailwind CSS**: For styling.

---

## Screenshots
*Include screenshots of the app here if needed for documentation.*

---

## Future Improvements
- Add more robust error handling.
- Enhance UI/UX for better user interaction.
- Integrate more backend features.

---
