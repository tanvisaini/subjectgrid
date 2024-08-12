# subjectgrid

## Overview

This project is a web-based dynamic grid display developed using Next.js with Typescript and is styled with Mantine and Tailwind CSS. This application fetches and displays static subject data through a mocked API call using Next.js API routes. Additionally, there is a testing suite for the API handler ensuring secure data handling and error management. The goal here was to create a user-friendly interface with custom filtering and sorting capability.  

## Key Features

- Interactive data grid with custom sorting and filtering capabilities
- Responsive design for mobile and desktop views
- Paginated data display
- Search functionality on data
- Next.js API route integration

## Technologies Stack

- **Frontend:**
  - Next.js
  - TypeScript
  - Mantine UI
  - Tailwind CSS
  - Axios
  - Jest
  - Node Mocks HTTP

## Deployment

This project is hosted on Vercel, providing seamless deployment and excellent performance. https://subjectgrid.vercel.app/

## Local Installation and Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Run the development server: `npm run dev`
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Assumptions

This application was assumed to be handled by admin within clinical trials so categories such as subjectId were kept on the grid display. It was also assumed that the static data only contains specific fields such as Subject ID, Name, Age, Gender, Diagnosis Date and Status. This allows for focused development on the application's functionalities. Lastly considering secure biodata, it was assumed that the API could not have any POST, PUT or DELETE endpoints on the database. 

## Conclusion

This project demonstrates a complete implementation of a subject grid display application with essential features like filtering, sorting and searching. The use of modern web technologies ensure a maintainable and scalable codebase. 
