# F1 Web Application

A full-stack web application for managing Formula 1 data, built with React and ASP.NET Core for my Webdevelopment Exam in my Third Semester. This application allows users to manage drivers, teams, and race results in a modern, responsive interface.

## 🏎️ Features

- **Drivers Management**
  - Add new drivers with their details (name, team, country)
  - Upload driver profile images
  - Update existing driver information
  - Delete drivers from the system

- **Teams Management**
  - Track team details including base location
  - Record world championship statistics
  - Manage team imagery
  - Full CRUD operations for team data

- **Race Results**
  - Log Grand Prix results
  - Track race winners and lap counts
  - Store race-specific images
  - Comprehensive race history management

## 🛠️ Tech Stack

### Frontend (ReactApp)

- **Core**: React 18 with TypeScript
- **State Management**: React Context API
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **Form Handling**: Native React forms
- **Image Handling**: File API integration

### Backend (F1WebApi)

- **Framework**: ASP.NET Core 6.0
- **Database**: Entity Framework Core with SQLite
- **Architecture**: RESTful API
- **File Storage**: Local file system for images
- **API Documentation**: Swagger/OpenAPI

## 🚀 Getting Started

### Prerequisites

- Node.js (v14+)
- .NET 9.0 SDK
- Git

### Backend Setup

1. Clone the repository:

```bash
git clone [repository-url]
cd F1WebApi
```

2. Install .NET dependencies:

```bash
dotnet restore
```

3. Apply database migrations:

```bash
dotnet ef database update
```

4. Start the API:

```bash
dotnet run
```

The API will be available at `http://localhost:5001`

### Frontend Setup

1. Navigate to the React app:

```bash
cd ReactApp
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm start
```

The application will open at `http://localhost:3000`

## 📁 Project Structure

```
├── F1WebApi/
│   ├── Controllers/         # API endpoints
│   ├── Models/             # Data entities
│   ├── Interfaces/         # Model contracts
│   ├── Contexts/          # EF Core context
│   └── Migrations/        # Database versioning
│
└── ReactApp/
    ├── src/
    │   ├── components/    # UI components
    │   │   └── shared/   # Reusable components
    │   ├── contexts/     # React contexts
    │   └── services/     # API integration
    └── public/           # Static assets
```

## 🔧 API Endpoints

- `GET /api/drivers` - Retrieve all drivers
- `POST /api/drivers` - Create new driver
- `PUT /api/drivers/{id}` - Update driver
- `DELETE /api/drivers/{id}` - Delete driver

Similar endpoints exist for teams and races.

## 💾 Database Schema

The application uses three main entities:

- **Driver**: name, team, country, image
- **Team**: fullTeamName, base, worldChampionships, image
- **Race**: grandPrix, winner, laps, image

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 🛟 Support

For support, please open an issue in the GitHub repository.
