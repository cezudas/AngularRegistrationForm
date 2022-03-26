# Frontend Interview Task

## Task

### Functional Requirements

- Prepare a simple registration form based on the `@angular/material` UI component library containing following fields:
  - Email (required; proper email form)
  - Username (required; minimum 8 alphanumerical characters)
  - Password (required; minimum 8 characters)
  - Full name (optional)
  - Country (required):
    - Available countries should be loaded from the `/countries` API endpoint
    - Use `flag-icons` package to display country flag alongside the name (it is already part of the `package.json`)
- Make sure that the form meets other requirements:
  - There is a submit button that gets disabled if the form is invalid
  - There is a form reset button that restores the form to the default state
  - There are error messages displayed when field validation fails
  - There are field requirements described as field hints
  - After clicking a submit button:
    - Send a POST request to the `/employees` API endpoint to create a new employee (use the form fields to create an Employee object)
    - Country code should be saved instead of country name as a part of the Employee object
    - Small spinner should be displayed to indicate the process
- After submit user should receive feedback in the next view:
  - Display a newly created user details
  - Show a spinner while loading the data from the GET request to the `/employees` endpoint

### Non-functional Requirements

- Prepare unit tests
- Make sure that `npm test` and `npm run check` pass
- Do not use any new packages, see [package.json](package.json) for the list of available packages

## Development

### Serve

Run `npm start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Build

Run `npm build` to build the project. The build artifacts will be stored in the `dist/` directory.

### Test

Run `npm test` to execute the unit tests.

### Check

Run `npm run check` to make sure that code meets defined standards.

### Fix

Run `npm run fix` to fix some issues reported by the `npm run fix`.
