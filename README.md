# Doctor Directory Web App (React Version)

A responsive and fully client-side searchable, filterable, and sortable doctor directory built with React and styled using Tailwind CSS. This project fetches data from a mock API and allows users to search for doctors, apply multiple filters, and sort results. URL query parameters are maintained to ensure back/forward browser navigation retains state.

## Features

- **Autocomplete Search**
  - Search by doctor name.
  - Shows top 3 suggestions.
  - Press Enter or click suggestion to filter list.

- **Filter Panel**
  - **Consultation Type**: Single-select radio (Video Consult, In Clinic).
  - **Specialties**: Multi-select checkboxes (General Physician, Dermatologist, etc.).
  - **Sort Options**: 
    - Fees (ascending).
    - Experience (descending).
    
- **Doctor List**
  - Shows name, specialty, experience, and consultation fee.
  - Rendered dynamically from API.
  
- **Client-side Filtering**
  - All search, filter, and sort logic handled on the client.
  - Query parameters reflect current filters.
  - Browser navigation retains state.

## Tech Stack

- React 18
- Tailwind CSS
- Vite (build tool)
- [Mock API](https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json)

## How to Run

1. Run `npm install` to install dependencies.
2. Run `npm run dev` to start the development server.
3. Open the URL shown in the terminal (usually http://localhost:5173).
4. Start searching and filtering doctors!
