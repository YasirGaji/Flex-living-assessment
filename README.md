# Flex Living Reviews Dashboard - Developer Assessment

This project implements a Full-Stack Reviews Dashboard and public-facing Review Display Page to help property managers curate and assess guest feedback from the Hostaway API (mocked).

## 1. Local Setup & Running Version

This project is fully containerized using **Docker Compose**, allowing the entire application (PostgreSQL Database, Fastify API, and React Frontend) to run with a single command.

### Prerequisites
* **Docker Desktop** (Running)
* `git` and `npm` installed.

### Installation & Startup

1.  **Clone the Repository:**
    ```bash
    git clone https://github.com/YasirGaji/Flex-living-assessment
    cd Flex-living-assessment
    ```

2.  **Setup Environment Files:**
    Create a `.env` file in the **`server`** directory. (Credentials must match `docker-compose.yml`).
    ```bash
    # File: server/.env
    DATABASE_URL="postgres://flexuser:fl3xus3RAss355men8@localhost:5433/flex_reviews"
    HOSTAWAY_ACCOUNT_ID=61148
    HOSTAWAY_API_KEY=f94377ebbbb479490bb3ec364649168dc443dda2e4830facaf5de2e74ccc9152
    PORT=3001
    ```

3.  **Run the Full Stack:**
    The following command builds all services, starts PostgreSQL, runs the migrations, and launches the API/Frontend:
    ```bash
    docker compose up --build -d
    ```

4.  **Database Seeding (Critical Step):**
    The database must be seeded by executing the required normalization API route once.
    * Open your browser to: `http://localhost:3001/api/reviews/hostaway`
    * Wait for the API response (`"success": true`). This loads and normalizes mock review data.

### Access Points
| Service | URL | Note |
| :--- | :--- | :--- |
| **Reviews Dashboard** | `http://localhost:3000/dashboard` | Requires running the normalization step above. |
| **Public Homepage** | `http://localhost:3000/` | Entry point reflecting Flex Living brand. |
| **Fastify API** | `http://localhost:3001/api/reviews` | Direct access to the normalized data endpoint. |

---

## 2. Brief Documentation & Design Decisions

### Tech Stack Used

| Layer | Technology | Rationale |
| :--- | :--- | :--- |
| **Backend** | **Fastify (Node.js/TS) + Prisma** | Chosen for performance, explicit architecture (Controller/Service), and type-safe database access (Prisma). |
| **Database** | **PostgreSQL (Docker)** | Provides a robust, production-ready data persistence layer for manager state. |
| **Frontend** | **React + Vite + Chakra UI v3** | Modern stack for complex UI, focusing on modularity and high-quality component design. |

### Key Design and Logic Decisions

1.  **Data Normalization (Backend):** The `ReviewService` calculates a unified `overallRating` (1-10 scale) by averaging the Hostaway category scores. This creates a clean metric for the dashboard's analysis.
2.  **Separation of Concerns (DRY):** The `GlobalAppLayout` component was used to ensure the `NavBar` and global background styling are defined only once, wrapping all main routes.
3.  **UX Focus: Curation:** The `isApproved: boolean` flag is independently persisted in the database and is updated via a dedicated `POST` endpoint. This separation ensures the manager's action is maintained, even if the raw data is refetched.
4.  **Aesthetic Consistency:** Custom color tokens (e.g., `flexPrimary`) were defined using direct hex codes for guaranteed resolution, ensuring the UI accurately reflects the sophisticated, dark-teal aesthetic of the Flex Living brand.

### API Behaviors

| Endpoint | Method | Function | Note |
| :--- | :--- | :--- | :--- |
| **`/api/reviews/hostaway`** | `GET` | `normalizeHostawayDataController` | **MANDATORY ROUTE.** Triggers data mock ingest, normalization, persistence, and aggregate calculation (idempotent). |
| `/api/reviews` | `GET` | `getReviewsController` | Fetches all normalized, persisted reviews (used for dashboard filters/table). |
| `/api/reviews/approval` | `POST` | `updateApprovalController` | Endpoint for the manager's action: updating the `isApproved` status. |

### Google Reviews Findings

Google Reviews integration is **feasible** via the Google Places API (Places Details endpoint). Implementation would require a secure backend proxy (to protect the API key) and a new normalization function on the server to convert the 5-star rating scale to the required 10-point internal scale.

---

## 3. Senior Engineer Trade-Offs (Time Constraints)

If not for the strict time constraint of the assessment, the following features would be implemented to elevate the solution:

* **Testing:** Comprehensive Jest/Vitest tests for core logic (`ReviewService.ts`) and critical components.
* **Advanced UI:** Utilizing a dedicated library like **AG Grid** for the review table to enable native drag-and-drop column filtering, complex sorting, and row grouping features.
* **CI/CD:** Implementation of a simple **GitHub Actions** pipeline to automate Docker image builds and deployment steps.
* **Deployment:** would have deployed the project to AWS using CDK

---

Your project is now wrapped, documented, and ready to be assessed.