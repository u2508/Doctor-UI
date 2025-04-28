# Doctor Directory Web App

A responsive and fully client-side searchable, filterable, and sortable doctor directory. This project fetches data from a mock API and allows users to search for doctors, apply multiple filters, and sort results. URL query parameters are maintained to ensure back/forward browser navigation retains state.

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

- HTML, CSS (Vanilla/Bootstrap)
- JavaScript (Vanilla JS)
- [Mock API](https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json)

## How to Run

1. Clone or download the repository.
2. Open `index.html` in any browser.
3. Start searching and filtering doctors!
