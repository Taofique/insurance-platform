---
name: api-test
description: Thoroughly test the existing backend API of this project - build, start backend, create realistic test data, authenticate, and test CRUD, pagination, filtering, sorting, validation, authorization, and edge cases with an honest final report.
---

# Backend API Testing Skill

## Purpose

Use this skill to thoroughly test the existing backend API of this project.

The workflow is:

```text
Inspect existing code
        ↓
Build
        ↓
Start backend
        ↓
Connect to test database
        ↓
Create realistic test data
        ↓
Authenticate
        ↓
Test API endpoints
        ↓
Test validation / authorization / edge cases
        ↓
Diagnose failures
        ↓
Fix only relevant bugs when appropriate
        ↓
Retest
        ↓
Build again
        ↓
Report results
```

This skill is for **testing and verification**, not for designing or refactoring the backend architecture.

The existing project code is the source of truth.

---

# 1. Project Context

This project uses:

- Express 5
- TypeScript
- MongoDB
- Mongoose
- JWT authentication
- bcrypt
- Express middleware
- ES modules
- strict TypeScript
- `tsx` for development
- `npm run build` for TypeScript compilation

The backend is located in:

```text
backend/
```

The repository root is the parent project directory.

The backend currently follows this architecture:

```text
src/
├── config/
├── controllers/
├── middleware/
├── models/
├── routes/
├── services/
├── validators/
├── types/
├── app.ts
└── server.ts
```

Existing resources may include:

```text
User
InsuranceType
InsurancePolicy
Claim
```

Do not assume these are the only resources. Inspect the current repository.

---

# 2. Core Principle

The purpose of this skill is to test the **actual running API**, not merely inspect source code.

Do not report something as tested merely because the code appears correct.

Distinguish clearly between:

```text
Code inspection
Build verification
Live API test
Database verification
```

For example:

```text
"Sorting appears correctly implemented"
```

is different from:

```text
"Sorting was tested against 43 policies and returned the expected order"
```

Only claim the second when it was actually tested.

---

# 3. Existing Code Is the Source of Truth

Before testing a resource, inspect its actual:

```text
model
service
controller
routes
validators
middleware
```

Also inspect related resources when necessary.

Understand:

- authentication requirements
- authorization rules
- request body structure
- query parameters
- pagination
- filtering
- sorting
- relationships
- status workflows
- soft deletion
- error handling
- validation behavior

Do not assume an older implementation.

---

# 4. Do Not Perform Unrelated Refactors

Testing may reveal bugs.

Only modify code when the problem is:

1. actually reproduced;
2. directly related to the feature being tested;
3. reasonably safe to fix within the existing architecture.

Do not:

- redesign the architecture;
- rename unrelated files;
- reorganize folders;
- replace middleware;
- introduce a new framework;
- replace Mongoose;
- replace authentication;
- rewrite working CRUD;
- modify frontend code;
- perform unrelated cleanup.

Prefer the smallest appropriate fix.

After a fix:

```text
Fix
 ↓
Build
 ↓
Retest
```

---

# 5. Environment Access

The backend may require:

```text
backend/.env
```

for local API testing.

If permission is available, it may be read to:

- obtain the MongoDB connection configuration;
- obtain the backend port;
- start the backend;
- connect to the configured test database.

The `.env` file must NEVER be modified.

Never expose secrets.

Never print:

```text
MONGO_URI
JWT_SECRET
passwords
JWT tokens
API keys
credentials
```

in the final report.

Do not commit `.env`.

---

# 6. Database Safety

The database may be a development/test database.

Even then:

### Never

- drop the database;
- drop all collections;
- delete all users;
- delete unrelated existing records;
- reset the entire database;
- modify production data.

### Allowed

Create test records.

Update records created for testing.

Delete test records created by the agent when cleanup is appropriate.

Use clearly identifiable test data.

For example:

```text
Test Client 001
Test Client 002
Test Agent 001
Test Insurance Type 001
```

Prefer deterministic identifiers in names/emails where useful.

For example:

```text
api-test-client-001@example.test
api-test-client-002@example.test
```

Do not use real people's personal information.

---

# 7. Determine the Test Scope

When the user says:

```text
Use backend-api-testing to test Insurance Policies.
```

test the Insurance Policy API and its dependencies.

When the user says:

```text
Test Claims.
```

test Claims and the related policy/client relationships needed to create valid claims.

When the user says:

```text
Regression-test the backend.
```

inspect all existing backend resources and test their important API behavior.

When the user specifies a particular feature, prioritize that feature while still testing the necessary surrounding functionality.

---

# 8. Build Verification

Before live testing, run:

```bash
cd backend
npm run build
```

If the build fails:

1. determine whether the failure existed before your changes;
2. inspect the relevant code;
3. fix only relevant issues;
4. run the build again.

Never disable TypeScript strictness to make the build pass.

Never use:

```ts
any;
```

as a shortcut.

---

# 9. Start the Backend

Use the existing project scripts.

Normally:

```bash
cd backend
npm run dev
```

Confirm:

- the server starts;
- MongoDB connects;
- the expected port is listening.

Do not expose environment values.

If another backend instance is already running, do not unnecessarily start multiple competing instances.

---

# 10. Authentication Testing

If the API uses authentication, test it through the actual authentication endpoints.

Typical flow:

```text
Register
   ↓
Login
   ↓
Receive JWT
   ↓
Call protected endpoint
```

Never bypass authentication merely to simplify testing.

Use the API's real login flow.

Store tokens only as needed for the current testing session.

Never put tokens in the final report.

---

# 11. Role Testing

Inspect the current roles in:

```text
backend/src/models/User.ts
```

For the current project, roles may include:

```text
admin
agent
claims_officer
client
```

Do not assume every endpoint accepts every role.

Read the actual route authorization.

Test:

```text
authorized role
unauthorized role
unauthenticated request
```

where appropriate.

Expected authorization behavior should normally distinguish:

```text
401 = authentication required / invalid authentication
403 = authenticated but not authorized
```

Do not change authorization rules merely to make tests pass.

---

# 12. Create Test Users

When a resource requires multiple user roles, create enough test users to exercise its relationships.

Use the existing user API where possible.

For a typical insurance workflow, useful test data may include:

```text
clients
agents
claims officers
admin
```

The exact amount should depend on the test.

For paginated resources, create enough records to produce multiple pages.

Unless the user specifies a different amount, use:

```text
at least 30 records
```

for the main paginated resource being tested.

For complex relational resources, create enough related records to meaningfully test relationships.

---

# 13. Create Test Data Through the API

Prefer:

```text
HTTP API
```

over direct MongoDB insertion.

The purpose is to test:

```text
validation
controller
service
business rules
database persistence
authorization
```

together.

Only use direct database operations if the API genuinely cannot create a required testing state and there is a strong reason to do so.

If direct database manipulation is necessary, report it explicitly.

---

# 14. Realistic Test Data

Do not create dozens of identical records.

For paginated/filterable/sortable resources, vary important fields.

For example, Insurance Policies should vary:

```text
client
agent
insuranceType
status
premium
coverageAmount
startDate
endDate
createdAt
```

The exact fields must come from the actual model.

Create enough variation that queries produce visibly different results.

---

# 15. Complete CRUD Testing

Whenever the resource supports CRUD, test the complete CRUD lifecycle.

Do NOT test only creation.

Test:

```text
Create
Read list
Read single
Update
Delete / deactivate
```

where supported.

For example:

```text
POST
GET /
GET /:id
PATCH /:id
DELETE /:id
```

Verify both:

### Successful cases

and:

### Invalid cases

---

# 16. Create Testing

Test:

- valid creation;
- missing required fields;
- invalid field types;
- invalid enum values;
- duplicate unique values;
- invalid relationships;
- unauthorized creation;
- business-rule violations.

Verify:

- HTTP status;
- response structure;
- database persistence;
- returned data.

---

# 17. Read/List Testing

Test:

```text
GET /
GET /:id
```

Verify:

- correct status;
- correct data;
- correct response structure;
- populated relationships where expected;
- nonexistent ID behavior;
- invalid ID behavior;
- authentication;
- authorization.

---

# 18. Update Testing

Test:

```text
PATCH /:id
```

Verify:

- valid partial update;
- multiple fields;
- omitted fields remain unchanged;
- invalid fields are rejected;
- duplicate unique values are rejected;
- invalid relationships are rejected;
- authorization is respected;
- business rules are enforced.

Do not assume PATCH behaves like PUT.

---

# 19. Delete / Deactivation Testing

Inspect whether the project uses:

```text
hard delete
```

or:

```text
soft delete / isActive
```

Follow the existing resource convention.

For resources using:

```ts
isActive;
```

verify that the delete endpoint behaves according to the existing implementation.

Do not introduce hard deletion if the existing resource uses soft deletion.

---

# 20. Pagination Testing

If a resource supports pagination, test:

```text
?page=1&limit=10
?page=2&limit=10
?page=3&limit=10
```

and other appropriate limits.

Verify:

```text
page
limit
total
totalPages
data
```

Test invalid values:

```text
page=0
page=-1
page=abc

limit=0
limit=-1
limit=101
limit=abc
```

Verify validation returns the expected `400`.

---

# 21. Filtering Testing

If a resource supports filters, test each filter independently.

Then test combinations.

For example:

```text
?status=active
?client=<id>
?agent=<id>
?insuranceType=<id>
```

Then:

```text
?status=active&agent=<id>
```

and:

```text
?status=active&client=<id>&agent=<id>
```

Verify filters use the expected AND behavior when combined.

Verify invalid filter values return validation errors.

---

# 22. Sorting Testing

If a resource supports sorting, inspect its allowed fields.

Never assume arbitrary fields are allowed.

Test:

```text
sortBy=<allowed field>&sortOrder=asc
sortBy=<allowed field>&sortOrder=desc
```

Verify the actual returned order.

Test invalid values:

```text
sortBy=invalid
sortOrder=random
```

Verify invalid values are rejected.

Also test the default sorting behavior when no sorting parameters are supplied.

---

# 23. Combined Query Testing

For resources supporting pagination, filtering, and sorting, explicitly test them together.

Example:

```text
?page=1
&limit=5
&status=active
&agent=<id>
&sortBy=premium
&sortOrder=desc
```

Verify:

1. filtering is correct;
2. sorting is correct;
3. pagination is correct;
4. `total` represents the filtered dataset;
5. `totalPages` represents the filtered dataset.

This combined test is important because individual features may work while their combination is broken.

---

# 24. Relationship Testing

For resources referencing other models, test:

- valid related ID;
- nonexistent related ID;
- wrong related user role;
- inactive related user;
- invalid ObjectId;
- ownership rules;
- populated response data.

For example, an Insurance Policy referencing:

```text
client
agent
insuranceType
```

should be tested against the actual relationship/business rules.

---

# 25. Business Workflow Testing

If a resource has statuses or lifecycle rules, inspect the service.

Do not assume arbitrary transitions are allowed.

Test:

```text
valid transition
invalid transition
terminal state
```

For example, if the implementation defines:

```text
pending → active
active → expired
active → cancelled
```

test those actual transitions.

Do not bypass service logic with direct MongoDB updates.

---

# 26. Ownership Testing

If a resource belongs to a user, test ownership.

For example:

```text
Client A
Client B
```

If Client A owns a resource, verify Client B cannot access it when the application's authorization rules prohibit that access.

Test:

```text
correct owner
wrong owner
admin
appropriate staff role
unauthenticated user
```

Follow the actual project's authorization design.

---

# 27. Validation Testing

Every validator should be tested with:

### Valid input

### Missing input

### Wrong type

### Invalid format

### Invalid enum

### Invalid ID

### Boundary values

For numeric values, test values such as:

```text
0
negative
very large
```

where relevant.

Do not modify validators simply because they reject intentionally invalid test input.

---

# 28. Error Handling Testing

Verify the project's existing error handling.

Test expected errors such as:

```text
400 validation error
401 authentication error
403 authorization error
404 resource not found
409 duplicate/conflict
500 unexpected server error
```

Only test 500 behavior where there is a safe way to reproduce an unexpected error.

Do not intentionally corrupt the database or environment simply to produce a 500.

---

# 29. HTTP Response Verification

Do not only check the HTTP status code.

Inspect:

```text
status
success
message
data
errors
pagination
```

according to the existing response format.

Make sure the actual response matches the project's conventions.

---

# 30. Database Verification

When useful, verify that API operations actually persisted.

For example:

```text
POST resource
    ↓
GET resource
    ↓
verify created values
```

For updates:

```text
PATCH
    ↓
GET
    ↓
verify updated fields
    ↓
verify untouched fields remained unchanged
```

For soft deletion:

```text
DELETE
    ↓
GET
    ↓
verify isActive/state according to project behavior
```

Prefer API verification over direct database inspection.

---

# 31. Seed Data Requirements

When the user requests test data, create enough records to make the requested tests meaningful.

Default for a paginated main resource:

```text
30+ records
```

If the user explicitly requests a number, follow that number.

For resources with relationships, create related records first.

For example:

```text
Users
 ↓
Insurance Types
 ↓
Policies
 ↓
Claims
```

Use the actual dependency order required by the application.

---

# 32. Avoid Duplicate Seed Data

Before creating large amounts of test data, inspect whether previous test data already exists.

Avoid creating endless duplicates every time the skill runs.

Use identifiable test naming.

For example:

```text
api-test-client-001@example.test
api-test-client-002@example.test
```

If the records already exist, reuse them when safe.

If more records are required, create additional records.

Do not delete unrelated records simply to reset the test.

---

# 33. Idempotent Testing Where Practical

Repeated execution should be reasonably safe.

Prefer:

```text
find existing test record
    ↓
reuse it
```

or:

```text
create only missing test records
```

rather than blindly inserting duplicates.

However, do not weaken the actual API's duplicate validation merely to make the testing skill idempotent.

---

# 34. Testing the Existing Filter Implementation

For the current Insurance Policy API, the list endpoint supports filters including:

```text
status
client
agent
insuranceType
```

Verify that:

```text
GET /api/insurance-policies?status=active
```

works.

Verify:

```text
GET /api/insurance-policies?client=<clientId>
```

works.

Verify:

```text
GET /api/insurance-policies?agent=<agentId>
```

works.

Verify:

```text
GET /api/insurance-policies?insuranceType=<insuranceTypeId>
```

works.

Also verify combinations.

The same filter query should determine both:

```text
returned records
```

and:

```text
pagination total
```

If the filtered result contains 17 records and the limit is 5, the response should report:

```text
total: 17
totalPages: 4
```

assuming the existing pagination response structure.

---

# 35. Testing the Current Sorting Implementation

For the current Insurance Policy API, verify the actual implemented sorting fields rather than assuming them.

Test:

```text
sortBy
sortOrder
```

with allowed values.

Verify:

```text
asc
desc
```

and default sorting.

Do not claim a field is supported unless the current validator/service actually supports it.

---

# 36. Postman-Friendly Testing

The purpose of seeding data is partly to allow the user to manually test the API afterward.

Therefore, when the user requests seed data, create a dataset that makes these requests meaningful:

```text
GET /api/insurance-policies?page=1&limit=10
```

```text
GET /api/insurance-policies?page=2&limit=10
```

```text
GET /api/insurance-policies?status=active
```

```text
GET /api/insurance-policies?agent=<agentId>
```

```text
GET /api/insurance-policies?sortBy=premium&sortOrder=desc
```

```text
GET /api/insurance-policies?page=1&limit=5&status=active&sortBy=premium&sortOrder=desc
```

When reporting test data, provide the IDs that are useful for manual testing.

It is acceptable to report test record IDs.

Never report passwords, JWTs, or secrets.

---

# 37. Do Not Claim Tests That Were Not Run

This is mandatory.

If the database was unavailable:

```text
Live API test: NOT RUN
Reason: MongoDB unavailable
```

If the backend failed to start:

```text
Live API test: BLOCKED
Reason: backend failed to start
```

If only the build was tested:

```text
Build: PASS
Live API: NOT TESTED
```

Do not fabricate test results.

---

# 38. Bug-Fixing Rules

If testing reveals a bug:

### First

Reproduce it.

### Then

Inspect the relevant code.

### Then

Determine whether the issue is actually a bug or expected behavior.

### If it is a bug

Make the smallest appropriate fix.

### Then

Run:

```bash
npm run build
```

and rerun the failing API test.

Do not silently change behavior without reporting it.

---

# 39. Files That May Be Modified

Normally, testing should not modify source code at all.

If a directly related bug is discovered, modifications may be made to the relevant:

```text
validator
service
controller
route
middleware
model
```

Only modify files necessary to fix the reproduced problem.

Never modify:

```text
frontend/
backend/.env
```

unless explicitly requested.

---

# 40. Git Safety

Before finishing:

```bash
git status --short
```

Inspect all changed files.

Do not commit.

Do not stage files.

Do not modify `.gitignore` unless explicitly requested.

Never commit:

```text
.env
credentials
tokens
database dumps
generated secrets
```

---

# 41. Final Build

After all tests and any relevant fixes:

```bash
cd backend
npm run build
```

The final build must pass.

If it does not pass, continue debugging relevant changes before reporting completion.

---

# 42. Final Report Format

The final report should be concise but useful.

Use this structure:

```text
## Backend API Test Report

### Build
PASS / FAIL

### Backend
Started successfully: YES / NO
MongoDB connected: YES / NO

### Test Data
Clients: X
Agents: X
Claims officers: X
Insurance Types: X
Policies: X
Claims: X

### Authentication
PASS / FAIL / PARTIAL

### Authorization
PASS / FAIL / PARTIAL

### CRUD
Create: PASS / FAIL
Read list: PASS / FAIL
Read single: PASS / FAIL
Update: PASS / FAIL
Delete/deactivate: PASS / FAIL

### Pagination
PASS / FAIL / PARTIAL

### Filtering
PASS / FAIL / PARTIAL

### Sorting
PASS / FAIL / PARTIAL

### Combined Queries
Filtering + Pagination: PASS / FAIL
Filtering + Sorting: PASS / FAIL
Filtering + Sorting + Pagination: PASS / FAIL

### Validation
PASS / FAIL / PARTIAL

### Error Handling
PASS / FAIL / PARTIAL

### Bugs Found
- ...

### Bugs Fixed
- ...

### Files Modified
- ...

### Database Safety
.env modified: NO
Database dropped: NO
Unrelated data deleted: NO
Secrets exposed: NO

### Manual Postman Testing
Useful test IDs:
- Client: ...
- Agent: ...
- Insurance Type: ...
- Policy: ...

### Final Result
Brief factual summary.
```

Do not include:

```text
MONGO_URI
JWT_SECRET
passwords
JWT tokens
```

in the report.

---

# 43. Important Principle

The goal is not to make the test report look successful.

The goal is to discover whether the backend actually works.

If something fails:

```text
Report the failure.
Diagnose it.
Fix it if appropriate.
Retest it.
Report the actual result.
```

Never hide failures just to produce a clean report.

---

# 44. Skill Boundary

This skill is for:

```text
testing
verification
test data creation
API execution
bug reproduction
small relevant bug fixes
regression testing
```

It is NOT for:

```text
building an entirely new resource
major architecture changes
large refactors
frontend development
database migrations
production deployment
Git commits
```

For creating a completely new backend resource, use the project's:

```text
backend-resource
```

skill.

For committing changes, use the project's:

```text
git-commit
```

skill.

---

# 45. Preferred Testing Philosophy

Think like a developer testing their own production API:

```text
Does it work?
        ↓
Does it work with real data?
        ↓
Does it work with multiple records?
        ↓
Does pagination work?
        ↓
Do filters work?
        ↓
Does sorting work?
        ↓
Do combinations work?
        ↓
What happens with bad input?
        ↓
What happens without authentication?
        ↓
What happens with the wrong role?
        ↓
What happens with nonexistent data?
        ↓
Does the database actually contain the expected result?
        ↓
Can another developer reproduce the result in Postman?
```

Do not stop at `npm run build`.

A successful build proves compilation.

It does not prove the API works.

The purpose of this skill is to verify the **running application behavior**.
