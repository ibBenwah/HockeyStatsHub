# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Stack

- **Frontend**: React 19 (Create React App) in `frontend/`
- **Backend**: ASP.NET Core Web API (.NET 10) in `backend/`

## Commands

### Frontend (`frontend/`)
```bash
npm start          # Dev server on http://localhost:3000
npm test           # Jest + React Testing Library (watch mode)
npm test -- --watchAll=false   # Run tests once (CI mode)
npm run build      # Production bundle
```

### Backend (`backend/`)
```bash
dotnet run                        # HTTP on :5132 and HTTPS on :7157
dotnet run --launch-profile https # Explicit HTTPS profile
dotnet build                      # Compile only
dotnet watch run                  # Hot-reload dev mode
```

## Architecture

The app is a two-process system: the React SPA calls the ASP.NET Core API over HTTP(S). They must run concurrently during development.

**Frontend → Backend communication**
- Dev: frontend fetches from `https://localhost:7157` (hardcoded in `App.js`)
- The backend CORS policy (`"AllowReactApp"`) whitelists `http://localhost:3000`

**Backend structure**
- Controllers live in `backend/Controllers/` and use attribute routing (`[Route("[controller]")]`), so a controller named `FooController` is reachable at `/foo`
- Data models are plain C# records/classes at the `backend/` root alongside `Program.cs`
- OpenAPI (Swagger) is mapped at `/openapi/v1.json` in Development — accessible once the backend is running
- Namespace: `backend`

**Frontend structure**
- All source in `frontend/src/`; `App.js` is the single component today
- No TypeScript — plain JavaScript with Create React App defaults (no ejected webpack config)
- Tests sit alongside source files as `*.test.js`

## Current State

The project is early-stage scaffolding. `WeatherForecastController` and `WeatherForecast.cs` are placeholder boilerplate from the .NET template and should be replaced with actual hockey statistics endpoints and models. `App.js` currently only tests API connectivity.
