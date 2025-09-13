# Local File Upload Setup

This document explains how to set up the local file upload functionality for the Carbon IQ application.

## Overview

The Carbon IQ application includes a feature to upload bills, which are saved to a local folder called `carbon_diposits`. This is handled by a simple Express server that runs alongside the main Vite development server.

## Setup Instructions

1. **Install Dependencies**

   The required dependencies are already in the package.json file. Run:

   ```bash
   npm install
   # or
   yarn install
   # or
   bun install
   ```

2. **Start the File Upload Server**

   In a separate terminal, run:

   ```bash
   npm run server
   # or
   yarn server
   # or
   bun server
   ```

   This will start the Express server on port 3001 and create the `carbon_diposits` folder if it doesn't exist.

3. **Start the Application**

   In another terminal, run:

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   bun dev
   ```

4. **Use the Upload Bill Feature**

   - Navigate to the Upload Bill page
   - Select a bill type
   - Upload a file
   - The file will be saved to the `carbon_diposits` folder in the project root

## How It Works

1. The Express server (server.cjs) creates a local folder called `carbon_diposits`
2. When a user uploads a file through the UploadBill.tsx component:
   - The file is sent to the Express server via a POST request
   - The server saves the file to the carbon_diposits folder with a filename format of `userId_timestamp.extension`
   - The server returns information about the saved file

## Customization

- To change the folder name, modify the `uploadDir` variable in server.cjs
- To change the filename format, modify the `filename` function in the multer storage configuration
