# Advanced Babysteps Appointment Booking System

A full-stack application for managing prenatal care appointments, built with **Node.js/Express** (backend), **MongoDB** (database), and **React** (frontend). Doctors can define working hours, and patients can book appointments in available time slots.

## Deployment Links
- **Backend Deployed Link:** [https://doctor-appointment-owms.onrender.com]
- **Frontend Deployed Link:** [https://doctor-appointment-seven-blue.vercel.app/]

## Features
- **Doctor Management**
  - View all doctors
  - Define working hours
- **Appointment Booking**
  - Real-time slot availability
  - Prevent double bookings
  - 30-minute appointment intervals
- **Patient Features**
  - Book/edit/cancel appointments
  - View appointment history
- **Responsive UI**
  - Built with Material-UI
  - Mobile-friendly design

## Tech Stack
**Backend**
- Node.js 18.x
- Express 4.x
- MongoDB 7.x

**Frontend**
- React 18.x
- Material-UI 5.x

## API Endpoints

### Get all doctors
```
GET http://localhost:5000/doctors
Content-Type: application/json
```

### Get available slots for a doctor on a specific date
```
GET http://localhost:5000/doctors/67b798c251c84d3b77e554c7/slots?date=2023-10-15
Content-Type: application/json
```

### Get all appointments
```
GET http://localhost:5000/appointments
Content-Type: application/json
```

### Get a specific appointment by ID
```
GET http://localhost:5000/appointments/67b824b94e5e63f07fd7ec08
Content-Type: application/json
```

### Create a new appointment
```
POST http://localhost:5000/appointments
Content-Type: application/json

{
  "doctorId": "64f1b1b1b1b1b1b1b1b1b1b1",
  "date": "2023-10-15T09:00:00Z",
  "duration": 30,
  "appointmentType": "Routine Check-Up",
  "patientName": "John Doe",
  "notes": "First-time visit"
}
```

### Update an existing appointment
```
PUT http://localhost:5000/appointments/64f1b1b1b1b1b1b1b1b1b1b1
Content-Type: application/json

{
  "doctorId": "64f1b1b1b1b1b1b1b1b1b1b1",
  "date": "2023-10-15T10:00:00Z",
  "duration": 60,
  "appointmentType": "Ultrasound",
  "patientName": "John Doe",
  "notes": "Updated appointment"
}
```

### Delete an appointment
```
DELETE http://localhost:5000/appointments/64f1b1b1b1b1b1b1b1b1b1b1
Content-Type: application/json
```

## Installation
### Backend Setup
1. Clone repository:
   ```bash
   git clone [your-repo-link]
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install express mongoose date-fns cors dotenv
   ```
3. Create .env file:
   ```
   MONGODB_URI=mongodb://localhost:27017/babysteps
   PORT=5000
   ```
4. Start server:
   ```bash
   node server.js
   ```

### Frontend Setup
1. Navigate to frontend:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install @mui/material @emotion/react @emotion/styled axios react-router-dom
   ```
3. Start development server:
   ```bash
   npm start
   ```

## Deployment
### Backend
Deploy to Render or Heroku:
- Set environment variables:
  - `MONGODB_URI` (MongoDB Atlas connection string)
  - `PORT` (Default: 5000)

### Frontend
Deploy to Vercel or Netlify:
- Set environment variables:
  - `REACT_APP_API_URL` (Backend API URL)

## Future Enhancements
- Real-time updates with WebSocket
- Patient authentication
- SMS/Email notifications
- Calendar integration

## License
MIT License

Created by [Your Name]

