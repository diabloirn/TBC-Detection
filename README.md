# TBC-Detection

A web-based tuberculosis detection system using a FastAPI backend and a React frontend.

## Overview

This project provides a simple interface for uploading chest X-ray images and analyzing them with a machine learning model to predict whether the image shows tuberculosis or a normal condition.

## Features

- Upload X-ray images from the browser
- FastAPI backend for inference
- TensorFlow model for tuberculosis detection
- CORS enabled for cross-origin requests
- File upload history stored in `backend/uploads`

## Repository structure

- `backend/` - FastAPI application, model, dataset, and training script
- `frontend` / `src/` - React UI for image upload and display results
- `public/` - React static assets
- `package.json` - frontend dependencies and scripts
- `backend/requirements.txt` - Python backend dependencies

## Setup

### Backend

1. Install Python dependencies:
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

2. Start the backend server:
   ```bash
   uvicorn main:app --reload
   ```

3. The backend will run at `http://localhost:8000`.

### Frontend

1. Install Node dependencies:
   ```bash
   npm install
   ```

2. Start the React app:
   ```bash
   npm start
   ```

3. The frontend will run at `http://localhost:3000`.

## Usage

- Open the React app in your browser.
- Choose or drag-and-drop an X-ray image.
- Fill in optional patient name and notes.
- Click the analysis button to get the prediction.

## Notes

- The model file is located in `backend/model/efficientnet_tb.h5`.
- Uploaded images are saved in `backend/uploads`.
- The current detection threshold is `0.5`.

## License

This repository is intended for educational use and prototype demonstration.
