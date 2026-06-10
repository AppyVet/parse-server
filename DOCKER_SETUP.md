# Docker Setup

This setup starts Parse Server with MongoDB by default.

## 1) Start containers

```bash
docker compose up -d --build
```

## 2) Check status

```bash
docker compose ps
docker compose logs -f parse-server
```

## 3) Stop containers

```bash
docker compose down
```

## 4) Reset all data

```bash
docker compose down -v
```

## Optional: Use Postgres instead of Mongo

1. Start with Postgres profile:

```bash
docker compose --profile postgres up -d --build
```

2. Edit `.env.docker` and set:

```bash
PARSE_SERVER_DATABASE_URI=postgres://postgres:password@postgres:5432/parse
```

3. Restart Parse Server:

```bash
docker compose restart parse-server
```

## Optional: Enable Redis (cache / pubsub test support)

Start Redis profile:

```bash
docker compose --profile redis up -d
```

Start Postgres + Redis profiles together:

```bash
docker compose --profile postgres --profile redis up -d --build
```

## Coverage in Docker

MongoDB coverage:

```bash
npm run coverage:mongodb
```

MongoDB coverage with Redis cache enabled:

```bash
PARSE_SERVER_TEST_CACHE=redis npm run coverage:mongodb
# or
npm run coverage:mongodb:redis
```

Postgres coverage:

```bash
PARSE_SERVER_TEST_DB=postgres \
PARSE_SERVER_TEST_DATABASE_URI=postgres://postgres:password@localhost:5432/parse_server_postgres_adapter_test_database \
npm run coverage
# or
npm run coverage:postgres
```

## Notes

- Parse API endpoint: `http://localhost:1337/parse`
- Default app id: `app`
- Default master key: `master`
- `Dockerfile` builds the Parse Server image.
- `docker-compose.yml` runs the full stack (Parse Server + database containers) together.
