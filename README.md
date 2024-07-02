
# Hospital Blood Donor Management System

A web application for managing patients and blood donors across multiple hospitals. Admins can create hospital accounts, accept or reject patient records, and view all donor details. Hospitals can upload new patient information and search for donors.

## Features

- Admin login and dashboard
  - Create new hospital accounts
  - Accept or reject patient records
  - View and delete patient records
- Hospital login and dashboard
  - Upload new patient information
  - Search for donors by area and blood type
  - View patient records

## Technologies Used

- Node.js
- Express.js
- MongoDB
- EJS (Embedded JavaScript templates)
- CSS (for styling)

## Setup and Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/hospital-blood-donor-management.git
   cd hospital-blood-donor-management
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root directory and add the following:
   ```plaintext
   PORT=3000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```

4. **Start the server:**
   ```bash
   npm start
   ```

5. **Visit the application:**
   Open your browser and go to `http://localhost:3000`.

## Usage

### Admin Login
- URL: `/login`
- Default credentials:
  - Username: `admin`
  - Password: `password`

### Hospital Login
- URL: `/login`
- Default credentials:
  - Username: `hospital`
  - Password: `password`

### Admin Dashboard
- URL: `/admin/dashboard`
- Features:
  - Create new hospital accounts
  - Accept or reject patient records
  - View and delete patient records

### Hospital Dashboard
- URL: `/hospital/dashboard`
- Features:
  - Upload new patient information
  - Search for donors by area and blood type
  - View patient records

## File Structure

```plaintext
hospital-blood-donor-management/
│
├── models/
│   ├── user.js
│   ├── patient.js
│   ├── donor.js
│
├── routes/
│   ├── admin.js
│   ├── hospital.js
│   ├── auth.js
│
├── views/
│   ├── admin/
│   │   ├── dashboard.ejs
│   ├── hospital/
│   │   ├── dashboard.ejs
│   ├── login.ejs
│   ├── index.ejs
│
├── public/
│   ├── css/
│   │   ├── styles.css
│
├── .env
├── server.js
├── package.json
├── package-lock.json
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a pull request

## License

This project is licensed under the MIT License
