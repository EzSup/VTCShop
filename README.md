# VTCShop website

## IMPORTANT: RUN ONLY ON [FIREFOX](https://www.mozilla.org/en-US/firefox/new/) BROWSER 

This repository contains a full-stack application, consisting of a backend API built with ASP.NET Core and a frontend client built with React and Vite.

## Project Structure

The project is organized into two main folders:

- **API**: Contains the backend ASP.NET Core project, responsible for handling data storage, business logic, and API endpoints.
- **Client**: Contains the frontend React project, built with Vite, responsible for the user interface and interaction with the backend API.

## Prerequisites

To run the project, ensure you have the following installed:

- **Backend**:
  - [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)
  - A database PostgreSQL
  - AWS S3 Bucket

- **Frontend**:
  - [Node.js](https://nodejs.org/) (v18 or later)
  - [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) (npm is used in this guide)
  - [Vite](https://vitejs.dev/) (included as part of the React project)

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/EzSup/VTCShop.git
cd API
```
### 2. Run the API
``` bash
dotnet run
```

The API will start at https://localhost:5000 or 5001 (or another port specified in launchSettings.json).

### 3. Navigate to the Client folder
```bash
cd Client
```

### 4. Run the frontend
```bash
npm run dev
```
The Client will start at http://localhost:5173 (or another port specified in launchSettings.json).
