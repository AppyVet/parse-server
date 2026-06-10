# Parse Server Route Report

## Overview

This report documents the API and web routes exposed by this Parse Server codebase.

Base route behavior:
- Parse API routes are mounted under the server mountPath (commonly /parse).
- Route examples in this report are shown as relative paths, such as /users. Effective URL is mountPath + route.
- Health route is mounted directly on the Parse API app at /health (also under mountPath).

Reference entry points:
- Route assembly: src/ParseServer.js
- Router implementations: src/Routers/*.js
- File endpoints: src/Routers/FilesRouter.js

---

## 1) Core and Platform Routes

| Method | Path | Purpose | Access | Source |
|---|---|---|---|---|
| GET | /health | Server health and startup state | Public | src/ParseServer.js |
| GET | /serverInfo | Feature capability and version info | Master key | src/Routers/FeaturesRouter.js |
| GET | /scriptlog | Query server logs | Master key | src/Routers/LogsRouter.js |
| GET | /security | Run security check report | Master key + security.enableCheck | src/Routers/SecurityRouter.js |

---

## 2) Generic Data Routes (Dynamic Classes)

| Method | Path | Purpose | Access | Source |
|---|---|---|---|---|
| GET | /classes/:className | Query objects by class | ACL and CLP enforced | src/Routers/ClassesRouter.js |
| GET | /classes/:className/:objectId | Get one object by id | ACL and CLP enforced | src/Routers/ClassesRouter.js |
| POST | /classes/:className | Create object | ACL and CLP enforced, idempotency middleware | src/Routers/ClassesRouter.js |
| PUT | /classes/:className/:objectId | Update object | ACL and CLP enforced, idempotency middleware | src/Routers/ClassesRouter.js |
| DELETE | /classes/:className/:objectId | Delete object | ACL and CLP enforced | src/Routers/ClassesRouter.js |
| GET | /aggregate/:className | Aggregate pipeline query | Master key | src/Routers/AggregateRouter.js |

---

## 3) User and Auth Routes

| Method | Path | Purpose | Access | Source |
|---|---|---|---|---|
| GET | /users | Query users | ACL and CLP enforced | src/Routers/UsersRouter.js |
| POST | /users | Sign up user | Public, idempotency middleware | src/Routers/UsersRouter.js |
| GET | /users/me | Current user from session | Session required | src/Routers/UsersRouter.js |
| GET | /users/:objectId | Get user by id | ACL and CLP enforced | src/Routers/UsersRouter.js |
| PUT | /users/:objectId | Update user | ACL and CLP enforced, idempotency middleware | src/Routers/UsersRouter.js |
| DELETE | /users/:objectId | Delete user | ACL and CLP enforced | src/Routers/UsersRouter.js |
| GET | /login | Login (query params) | Public | src/Routers/UsersRouter.js |
| POST | /login | Login (body params) | Public | src/Routers/UsersRouter.js |
| POST | /loginAs | Login as another user | Master key flow | src/Routers/UsersRouter.js |
| POST | /logout | Logout current session | Session token flow | src/Routers/UsersRouter.js |
| POST | /requestPasswordReset | Trigger password reset email | Public | src/Routers/UsersRouter.js |
| POST | /verificationEmailRequest | Resend verification email | Public | src/Routers/UsersRouter.js |
| GET | /verifyPassword | Verify password | Public or auth context | src/Routers/UsersRouter.js |
| POST | /verifyPassword | Verify password | Public or auth context | src/Routers/UsersRouter.js |
| POST | /challenge | MFA or auth challenge flow | Public/auth flow depending provider | src/Routers/UsersRouter.js |

---

## 4) Sessions and Roles

### Sessions

| Method | Path | Purpose | Access | Source |
|---|---|---|---|---|
| GET | /sessions/me | Get current session details | Session token required | src/Routers/SessionsRouter.js |
| GET | /sessions | Query sessions | ACL/CLP and auth checks | src/Routers/SessionsRouter.js |
| GET | /sessions/:objectId | Get session by id | ACL/CLP and auth checks | src/Routers/SessionsRouter.js |
| POST | /sessions | Create session | Auth flow | src/Routers/SessionsRouter.js |
| PUT | /sessions/:objectId | Update session | Auth flow | src/Routers/SessionsRouter.js |
| DELETE | /sessions/:objectId | Delete session | Auth flow | src/Routers/SessionsRouter.js |
| POST | /upgradeToRevocableSession | Convert to revocable session token | Authenticated user | src/Routers/SessionsRouter.js |

### Roles

| Method | Path | Purpose | Access | Source |
|---|---|---|---|---|
| GET | /roles | Query roles | ACL and CLP enforced | src/Routers/RolesRouter.js |
| GET | /roles/:objectId | Get role by id | ACL and CLP enforced | src/Routers/RolesRouter.js |
| POST | /roles | Create role | ACL and CLP enforced | src/Routers/RolesRouter.js |
| PUT | /roles/:objectId | Update role | ACL and CLP enforced | src/Routers/RolesRouter.js |
| DELETE | /roles/:objectId | Delete role | ACL and CLP enforced | src/Routers/RolesRouter.js |

---

## 5) Installations, Push, Audiences, Analytics

### Installations

| Method | Path | Purpose | Access | Source |
|---|---|---|---|---|
| GET | /installations | Query installations | ACL and CLP enforced | src/Routers/InstallationsRouter.js |
| GET | /installations/:objectId | Get installation by id | ACL and CLP enforced | src/Routers/InstallationsRouter.js |
| POST | /installations | Create installation | Public/auth, idempotency middleware | src/Routers/InstallationsRouter.js |
| PUT | /installations/:objectId | Update installation | Public/auth, idempotency middleware | src/Routers/InstallationsRouter.js |
| DELETE | /installations/:objectId | Delete installation | ACL and CLP enforced | src/Routers/InstallationsRouter.js |

### Push and Audience Management

| Method | Path | Purpose | Access | Source |
|---|---|---|---|---|
| POST | /push | Send push notification | Master key | src/Routers/PushRouter.js |
| GET | /push_audiences | List audiences | Master key | src/Routers/AudiencesRouter.js |
| GET | /push_audiences/:objectId | Get audience | Master key | src/Routers/AudiencesRouter.js |
| POST | /push_audiences | Create audience | Master key | src/Routers/AudiencesRouter.js |
| PUT | /push_audiences/:objectId | Update audience | Master key | src/Routers/AudiencesRouter.js |
| DELETE | /push_audiences/:objectId | Delete audience | Master key | src/Routers/AudiencesRouter.js |

### Analytics

| Method | Path | Purpose | Access | Source |
|---|---|---|---|---|
| POST | /events/AppOpened | Track app open event | Public/auth | src/Routers/AnalyticsRouter.js |
| POST | /events/:eventName | Track custom analytics event | Public/auth | src/Routers/AnalyticsRouter.js |

---

## 6) Functions, Jobs, Hooks, Purchases

### Cloud Functions and Jobs

| Method | Path | Purpose | Access | Source |
|---|---|---|---|---|
| POST | /functions/:functionName | Execute Cloud Function | Public/auth context, trigger validators apply | src/Routers/FunctionsRouter.js |
| POST | /jobs/:jobName | Execute named Cloud Job | Master key + idempotency middleware | src/Routers/FunctionsRouter.js |
| POST | /jobs | Execute job by body payload | Master key | src/Routers/FunctionsRouter.js |

### Scheduled Cloud Code Jobs

| Method | Path | Purpose | Access | Source |
|---|---|---|---|---|
| GET | /cloud_code/jobs | List scheduled jobs | Master key | src/Routers/CloudCodeRouter.js |
| GET | /cloud_code/jobs/data | Job usage metadata | Master key | src/Routers/CloudCodeRouter.js |
| POST | /cloud_code/jobs | Create scheduled job | Master key | src/Routers/CloudCodeRouter.js |
| PUT | /cloud_code/jobs/:objectId | Update scheduled job | Master key | src/Routers/CloudCodeRouter.js |
| DELETE | /cloud_code/jobs/:objectId | Delete scheduled job | Master key | src/Routers/CloudCodeRouter.js |

### Webhooks and Triggers Management

| Method | Path | Purpose | Access | Source |
|---|---|---|---|---|
| GET | /hooks/functions | List function hooks | Master key | src/Routers/HooksRouter.js |
| GET | /hooks/functions/:functionName | Get function hook | Master key | src/Routers/HooksRouter.js |
| GET | /hooks/triggers | List trigger hooks | Master key | src/Routers/HooksRouter.js |
| GET | /hooks/triggers/:className/:triggerName | Get trigger hook | Master key | src/Routers/HooksRouter.js |
| POST | /hooks/functions | Create function hook | Master key | src/Routers/HooksRouter.js |
| POST | /hooks/triggers | Create trigger hook | Master key | src/Routers/HooksRouter.js |
| PUT | /hooks/functions/:functionName | Update or delete function hook | Master key | src/Routers/HooksRouter.js |
| PUT | /hooks/triggers/:className/:triggerName | Update or delete trigger hook | Master key | src/Routers/HooksRouter.js |

### In-App Purchase Validation

| Method | Path | Purpose | Access | Source |
|---|---|---|---|---|
| POST | /validate_purchase | Validate purchase receipt | Auth and purchase config dependent | src/Routers/IAPValidationRouter.js |

---

## 7) Schema, Config, GraphQL, Purge

### Schemas

| Method | Path | Purpose | Access | Source |
|---|---|---|---|---|
| GET | /schemas | List all schemas | Master key | src/Routers/SchemasRouter.js |
| GET | /schemas/:className | Get schema by class | Master key | src/Routers/SchemasRouter.js |
| POST | /schemas | Create schema/class | Master key | src/Routers/SchemasRouter.js |
| POST | /schemas/:className | Create or evolve class schema | Master key | src/Routers/SchemasRouter.js |
| PUT | /schemas/:className | Modify class schema | Master key | src/Routers/SchemasRouter.js |
| DELETE | /schemas/:className | Delete class schema | Master key | src/Routers/SchemasRouter.js |

### Config and GraphQL Config

| Method | Path | Purpose | Access | Source |
|---|---|---|---|---|
| GET | /config | Read global config | Public or scoped by config visibility | src/Routers/GlobalConfigRouter.js |
| PUT | /config | Update global config | Master key (read-only master key blocked) | src/Routers/GlobalConfigRouter.js |
| GET | /graphql-config | Read GraphQL config | Master key | src/Routers/GraphQLRouter.js |
| PUT | /graphql-config | Update GraphQL config | Master key (read-only master key blocked) | src/Routers/GraphQLRouter.js |

### Maintenance

| Method | Path | Purpose | Access | Source |
|---|---|---|---|---|
| DELETE | /purge/:className | Delete all objects in class | Master key | src/Routers/PurgeRouter.js |

---

## 8) File Routes

These are mounted before parse header middleware in ParseServer app setup.

| Method | Path | Purpose | Access | Source |
|---|---|---|---|---|
| GET | /files/:appId/:filename | Download file | AppId required | src/Routers/FilesRouter.js |
| GET | /files/:appId/metadata/:filename | Fetch file metadata | AppId required | src/Routers/FilesRouter.js |
| POST | /files | Reject upload without filename | Public/auth | src/Routers/FilesRouter.js |
| POST | /files/:filename | Upload file bytes | Public/auth/master based on fileUpload policy | src/Routers/FilesRouter.js |
| DELETE | /files/:filename | Delete file | Master key | src/Routers/FilesRouter.js |

---

## 9) Public and Custom Pages Routes

Two routers support these flows:
- PublicAPIRouter default pages behavior
- PagesRouter extended customizable behavior

### Public API Pages

| Method | Path | Purpose | Access | Source |
|---|---|---|---|---|
| GET | /apps/:appId/verify_email | Verify email link | Public | src/Routers/PublicAPIRouter.js |
| POST | /apps/:appId/resend_verification_email | Resend verification email | Public | src/Routers/PublicAPIRouter.js |
| GET | /apps/choose_password | Serve password chooser page | Public | src/Routers/PublicAPIRouter.js |
| POST | /apps/:appId/request_password_reset | Submit password reset | Public | src/Routers/PublicAPIRouter.js |
| GET | /apps/:appId/request_password_reset | Open reset page by token | Public | src/Routers/PublicAPIRouter.js |

### Custom Pages Router (when pages.enableRouter is true)

| Method | Path Pattern | Purpose | Access | Source |
|---|---|---|---|---|
| GET | /{pagesEndpoint}/:appId/verify_email | Verify email via customizable pages system | Public | src/Routers/PagesRouter.js |
| POST | /{pagesEndpoint}/:appId/resend_verification_email | Resend verification via customizable pages system | Public | src/Routers/PagesRouter.js |
| GET | /{pagesEndpoint}/choose_password | Password chooser page via customizable pages system | Public | src/Routers/PagesRouter.js |
| POST | /{pagesEndpoint}/:appId/request_password_reset | Submit password reset via customizable pages system | Public | src/Routers/PagesRouter.js |
| GET | /{pagesEndpoint}/:appId/request_password_reset | Open reset page by token via customizable pages system | Public | src/Routers/PagesRouter.js |
| Dynamic | /{pagesEndpoint}/:appId/{customRoutePath} | User-defined custom pages route handlers | Public/app-specific | src/Routers/PagesRouter.js |
| GET | /{pagesEndpoint}/(*)? | Static pages fallback route | Public | src/Routers/PagesRouter.js |

---

## 10) Data Model Surface Exposed by Routes

This route set maps to Parse classes. Most are dynamic custom classes via /classes/:className.

Common system classes touched by these routes:

| Class | Typical Route Families |
|---|---|
| _User | /users, /login, /challenge |
| _Session | /sessions, /upgradeToRevocableSession |
| _Role | /roles |
| _Installation | /installations |
| _PushStatus | /push |
| _JobStatus | /jobs |
| _JobSchedule | /cloud_code/jobs |
| _Hooks | /hooks |
| _GlobalConfig | /config |
| _GraphQLConfig | /graphql-config |
| _Audience | /push_audiences |
| _Idempotency | write routes using idempotency middleware |

Schema defaults and system class definitions are maintained in src/Controllers/SchemaController.js.

---

## Notes for Implementation Teams

- Write endpoints commonly use idempotency middleware on classes, users, installations, and functions/jobs.
- Master key is required for schema mutation, logs, security checks, purge, push, hooks management, and some cloud job operations.
- File upload policy can restrict public, anonymous, or authenticated uploads.
- Effective final URL always includes your Parse mount path, for example /parse/classes/MyClass when mountPath is /parse.
