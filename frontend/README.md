# Graphic Design Order Management

Responsive React frontend for managing graphic design orders through the existing Spring Boot API.

## Run locally

From this directory:

```powershell
npm install
npm run dev
```

Run the Spring Boot backend separately on port `8080`. The frontend uses:

```text
http://localhost:8080/graphicdesignorder
```

To use a different API base URL, create a `.env.local` file in this directory:

```text
VITE_API_BASE_URL=http://localhost:8080/graphicdesignorder
```

The backend must allow browser requests from the Vite origin (`http://localhost:5173`). If the browser reports a CORS error, configure the existing backend's CORS policy to allow that origin; this frontend does not change backend configuration.

## Verify

```powershell
npm run lint
npm run build
```

The frontend calls the existing `/add`, `/displayall`, `/display?id=...`, `/update`, and `/delete/{id}` endpoints. It does not provide authentication or modify the backend.
