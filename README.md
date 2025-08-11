OpenLMS Monorepo

Apps
- frontend: Next.js 14 App Router, TailwindCSS, Framer Motion, next-themes
- backend: NestJS 10, TypeORM (PostgreSQL)

Setup
1. Node.js 18+
2. In each app folder, run: `npm install`
3. Backend env: copy `backend/ormconfig.sample.env` to `.env` and set `DATABASE_URL`

Run
- Frontend: `cd frontend && npm run dev`
- Backend: `cd backend && npm run start:dev`

Notes
- Public catalog is fully open; SCORM playback will be unauthenticated.
- Admin panel lives at `/admin` (UI only for now). Auth endpoints to be added.


