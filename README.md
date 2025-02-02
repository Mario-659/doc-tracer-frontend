# Document Analysis App

A sample full-stack application for managing document analysis measurements, samples, spectra, and user administration. Project made in scope of engineering thesis. Backend part available at [doc-tracer-backend](https://github.com/Mario-659/doc-tracer-backend).

---

## Table of Contents
1. [Overview](#overview)
2. [Features](#features)
3. [Technology Stack](#technology-stack)
4. [Prerequisites](#prerequisites)
5. [Setup Instructions](#setup-instructions)
    1. [Install Dependencies](#install-dependencies)
    2. [Run the Mock Server](#run-the-mock-server)
    3. [Run the Angular App](#run-the-angular-app)

---

## 1. Overview

This project demonstrates a Document Analysis App allowing users to:
- Register/login (authentication)
- Manage measurements and samples (create/read/update/delete)
- Explore measurement details, sample details, and spectral data
- Visualize spectral data in a chart
- Administer users and roles (in an Admin Panel)

The **mock server** provides local endpoints simulating user authentication and example data for measurements, samples, and spectra. The **Angular frontend** consumes these endpoints and renders the UI.

---

## 2. Features

1. **User Authentication**:
    - Login and registration pages
    - Role-based access control (viewer, editor, admin)

2. **Measurements Management**:
    - Create, edit, view, and delete measurements
    - Assign materials, device, conditions, and additional comments

3. **Samples Management**:
    - Create and edit sample data, including spectral data (JSON or CSV import)
    - Sample details with chart visualization

4. **Admin Panel**:
    - Manage users (active status, roles) via a grid interface

5. **Spectral Data Comparison**:
    - Compare multiple samples’ spectral data on a chart with zoom and pan features

---

## 3. Technology Stack

- **Frontend**: Angular (standalone components, TypeScript)
- **Backend (Mock)**: Node.js + Express
- **Styling**: Bootstrap, SCSS
- **Charting**: [Chart.js](https://www.chartjs.org/) with `ng2-charts` and zoom plugin
- **Data Grid**: [AG Grid](https://www.ag-grid.com/)

---

## 4. Prerequisites

- **Node.js** >= 16.x
- **npm** >= 8.x (or **yarn** >= 1.22.x)
- A modern browser (Chrome, Firefox, Edge) for viewing the app

---

## 5. Setup Instructions

### 5.1 Install Dependencies
From the root of the repository (where `package.json` might live for the Angular app), install the required dependencies:
```bash
npm install
```
> If you have a separate `package.json` for the mock server, also run `npm install` in `mock-server/`. However, this project can usually run the mock server with only **express**, **cors**, **body-parser**, and **morgan** installed — which are already in the snippet.

### 5.2 Run the Mock Server

1. Navigate to the `mock-server/` directory:
   ```bash
   cd mock-server
   ```
2. Start the server:
   ```bash
   node server.js
   ```
    - The server runs by default on **port 8080**.
    - Available endpoints are prefixed by `/api/...`.

### 5.3 Run the Angular App

In another terminal, from the main project directory, run:
```bash
npm start
```
Or to serve in development mode:
```bash
ng serve --open
```
- By default, Angular will serve at **`http://localhost:4200`**.

> **Note**: Ensure your **`environment.development.ts`** (or **`environment.ts`**) `apiUrl` property points to the mock server base URL: `http://localhost:8080/api`.
