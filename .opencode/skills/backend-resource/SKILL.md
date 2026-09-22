---
name: backend-resource
description: Create a new backend resource in this repository following the existing architecture - model, validator, service, controller, routes, authentication, authorization, and build verification, additive-only without refactoring existing code.
---

# Backend Resource Skill

## Purpose

This skill defines how to create a new backend resource in this repository.

The goal is to make every new resource look and behave like the existing backend codebase.

The existing project code is the source of truth.

Do NOT redesign, refactor, modernize, reorganize, or "improve" existing architecture unless the user explicitly asks for that.

---

# 1. Core Rule: Existing Code Is the Source of Truth

Before writing any code:

1. Inspect the existing backend structure.
2. Inspect at least two existing complete resources.
3. Prefer `InsurancePolicy`, `User`, and `InsuranceType` as reference implementations when relevant.
4. Identify the project's existing:
   - folder structure
   - file naming conventions
   - import style
   - TypeScript style
   - controller pattern
   - service pattern
   - validation pattern
   - middleware usage
   - authorization pattern
   - error handling
   - response format
   - route naming
   - soft-delete/deactivation conventions

5. Follow those patterns rather than introducing a new architecture.

If the requested resource requires a decision that is not established by the existing codebase, explain the ambiguity before making a major architectural decision.

---

# 2. Strict Additive-Only Rule

By default, this skill is ADDITIVE ONLY.

The agent may:

- create new files
- add new routes required by the new resource
- add new model/service/controller/validator code
- make the minimum necessary change to an existing registration file such as `app.ts`
- make the minimum necessary change required to connect the new resource to the existing application

The agent must NOT:

- refactor existing resources
- rename existing files
- rename existing functions
- reorganize existing folders
- rewrite existing middleware
- replace existing validation architecture
- replace Mongoose with another ORM
- replace Express
- introduce a new service architecture
- introduce repositories unless explicitly requested
- introduce unnecessary utilities
- change existing API response formats
- change existing authentication behavior
- change existing authorization behavior
- change existing database schemas
- modify unrelated resources
- clean up unrelated code
- fix unrelated bugs
- update dependencies unless absolutely required for the requested resource
- modify frontend code unless explicitly requested
- modify `.opencode/` files other than the resource skill when explicitly requested

If an existing bug is discovered while implementing the new resource, do NOT silently fix it.

Report it separately.

---

# 3. Repository Root Safety

Before making changes:

1. Determine the actual Git repository root.
2. Confirm the backend directory.
3. Do not assume the current working directory is the Git repository root.
4. Do not create another Git repository.
5. Do not modify Git configuration.
6. Do not commit changes unless explicitly requested.

The expected project structure is approximately:

backend/
├── src/
│ ├── config/
│ ├── controllers/
│ ├── middleware/
│ ├── models/
│ ├── routes/
│ ├── services/
│ ├── validators/
│ ├── types/
│ ├── app.ts
│ └── server.ts
└── ...

The actual repository should always be inspected rather than assumed.

---

# 4. Resource Completeness Rule

If the user asks to create a resource that requires CRUD, implement the COMPLETE resource.

Do not stop after creating the model.

The normal resource implementation should include:

1. Model
2. Validator
3. Service
4. Controller
5. Routes
6. Authentication
7. Authorization
8. Error handling
9. Application route registration
10. Build/type checking
11. API testing guidance or testing

CRUD means:

- Create
- Read all
- Read one
- Update
- Delete/deactivate according to the project's established convention

Do not intentionally skip CRUD operations unless the user explicitly asks for a partial implementation.

---

# 5. Existing Architecture

Follow this separation of responsibilities:

## Model

The model defines:

- database structure
- Mongoose schema
- field types
- required fields
- enum constraints
- defaults
- indexes/unique constraints when appropriate
- timestamps
- references

Do not put request-specific business logic into the model unless the existing project already does so.

---

## Validator

Validators handle request-shape validation.

Examples:

- required fields
- string types
- number types
- boolean types
- enum values
- ObjectId format
- date format
- basic input constraints

Use the existing:

```ts
validate(...)
```

middleware.

Do not move business rules into validators.

For example:

Validation:

```text
Is this a valid MongoDB ObjectId?
```

Business rule:

```text
Does this ObjectId belong to an active claims officer?
```

The first belongs in the validator.

The second belongs in the service.

---

## Service

Services contain business logic.

Examples:

- checking whether related records exist
- checking user roles
- checking `isActive`
- checking ownership
- checking duplicate records
- checking date relationships
- checking workflow/state transitions
- checking resource relationships
- hashing passwords when appropriate
- creating/updating/deactivating records

Expected business errors should use:

```ts
throw new AppError("Message", statusCode);
```

Do not manually send HTTP responses from services.

---

## Controller

Controllers handle HTTP concerns.

Controllers should:

1. read request data
2. validate route parameters when necessary
3. call the service
4. return the response
5. pass unexpected errors to `next(error)`

Follow the project's existing controller style.

For route parameters, use the established narrowing pattern:

```ts
const { id } = req.params;

if (!id || Array.isArray(id)) {
  res.status(400).json({
    success: false,
    message: "Invalid ... ID",
  });
  return;
}
```

After this check, pass the narrowed `id` to the service.

Do not use unsafe casts simply to silence TypeScript.

---

## Routes

Routes should handle:

- HTTP method
- URL
- authentication
- authorization
- validation
- controller

Follow the established order:

```text
authentication
→ authorization
→ validation
→ controller
```

Use the existing middleware rather than creating duplicate middleware.

---

# 6. TypeScript Rules

Follow the existing TypeScript configuration.

Use:

```ts
import ...
```

not CommonJS `require`.

Use `.js` extensions in local imports because the project uses NodeNext/ES modules.

Do not use:

```ts
any;
```

unless the existing project has an unavoidable library-specific case and there is no reasonable typed alternative.

Prefer:

```ts
unknown;
```

when an unknown value must be handled.

Respect:

- strict mode
- `noUncheckedIndexedAccess`
- `exactOptionalPropertyTypes`
- `verbatimModuleSyntax`
- `isolatedModules`

Do not suppress TypeScript errors with:

```ts
// @ts-ignore
```

or unnecessary:

```ts
as any
```

Fix the underlying type problem.

---

# 7. Mongoose Rules

Use the existing Mongoose conventions.

For document types, follow the project's established `HydratedDocument` pattern.

For ObjectId references:

```ts
Types.ObjectId;
```

and:

```ts
ref: "ModelName";
```

should be used consistently with existing models.

Remember:

`ref` does not enforce business relationships.

For example:

```ts
agent: {
  type: Schema.Types.ObjectId,
  ref: "User",
}
```

does NOT guarantee that the referenced User has:

```text
role === "agent"
```

That must be checked in the service.

When assigning a string ID to an ObjectId field, convert it properly:

```ts
new Types.ObjectId(id);
```

Do not silence the type system with casts.

---

# 8. Relationship and Reference Safety

Whenever a resource references another resource:

1. Validate the ID format.
2. Check that the referenced document exists.
3. Check whether the referenced document is active when required.
4. Check the referenced document's role/type when required.
5. Check relationship-specific business rules.
6. Only then create/update the resource.

Do not assume that a valid ObjectId means the referenced document exists.

Do not assume `populate()` enforces business rules.

---

# 9. Update Safety

For PATCH/update operations:

- Treat fields as optional.
- Only update fields actually supplied by the client.
- Do not accidentally overwrite unspecified fields.
- Re-run relevant business rules when related fields change.
- Re-check relationships when IDs are changed.
- Re-check date relationships when dates are changed.
- Re-check workflow/state rules when status changes.
- Hash passwords when a password is updated.
- Never return passwords in API responses.

If changing one field can invalidate another field, validate the final combined state.

Example:

If:

```text
startDate
endDate
```

must satisfy:

```text
endDate > startDate
```

then changing either field must validate the resulting pair.

---

# 10. Duplicate Data Safety

For unique fields:

1. Check for an existing conflicting record in the service.
2. When updating, exclude the current document.

For example:

```ts
{
  email: data.email,
  _id: { $ne: id }
}
```

Do not reject an update simply because the current document already has the same value.

If MongoDB still throws a duplicate-key error because of a race condition, allow the existing global error handling to handle it unless the project already has a specific duplicate-key convention.

---

# 11. Soft Delete / Deactivation

Follow the existing project convention.

If an existing resource uses:

```ts
isActive = false;
```

for DELETE operations, use the same convention unless the user explicitly requests physical deletion.

Do not introduce physical deletion just because the HTTP method is:

```text
DELETE
```

After deactivation:

- the document remains in MongoDB
- normal active-user/resource logic should respect `isActive`
- authentication/authorization behavior should remain consistent with the existing project

---

# 12. Authorization and Ownership

Never assume authentication alone is enough.

For every new resource, determine:

1. Which roles can create it?
2. Which roles can read all records?
3. Which roles can read individual records?
4. Which roles can update it?
5. Which roles can deactivate/delete it?
6. Does the resource belong to a specific user?
7. Can users access only their own records?
8. Are there role-specific restrictions?

Use:

```ts
authMiddleware;
```

and:

```ts
authorize(...)
```

rather than creating a second authorization system.

Ownership checks belong in the service/business-logic layer.

Example:

```text
Authenticated client
        ↓
GET /my-resource
        ↓
Service filters by req.userId
        ↓
Only that client's records
```

Do not trust a client-supplied `userId` when the authenticated user's ID is already available.

---

# 13. Workflow / Status Fields

If a resource has a workflow such as:

```text
submitted
→ under_review
→ approved
→ paid
```

do NOT treat status as an unrestricted string update.

The service must enforce valid state transitions.

For example:

```text
submitted → under_review     valid
under_review → approved      valid
under_review → rejected      valid
approved → paid              valid

submitted → approved         invalid
submitted → paid             invalid
paid → submitted             invalid
```

The exact workflow must come from the user's requirements.

Do not invent additional workflow states unless necessary and clearly justified.

A status change should also respect role permissions.

For example:

```text
client
→ submits claim

claims_officer
→ reviews claim
→ approves/rejects claim

authorized role
→ marks approved claim as paid
```

Do not allow a client to approve their own claim simply because they can technically send:

```json
{
  "status": "approved"
}
```

---

# 14. Generated Fields

If the resource requires generated identifiers such as:

```text
POL-...
CLM-...
```

do not accept them blindly from the client if they are supposed to be system-generated.

Generate them in the service.

Consider collision/race-condition behavior when designing generated identifiers.

If the existing project uses a specific generation convention, follow it.

---

# 15. Dates and Numbers

For date fields:

- validate input format
- convert strings to `Date` objects before persistence when appropriate
- validate relationships between dates
- do not assume Mongoose validation alone is sufficient

For numeric fields:

- validate type
- validate allowed range
- distinguish `0` from `undefined`

Do not use truthiness checks for values where `0` is valid.

Prefer:

```ts
value === undefined;
```

over:

```ts
if (!value)
```

when zero is a valid value.

---

# 16. Error Handling

Expected business errors should use:

```ts
AppError;
```

Examples:

```text
Resource not found → 404
Duplicate resource → 409
Invalid business operation → 400
Unauthorized → 401
Forbidden → 403
```

Controllers should pass errors to:

```ts
next(error);
```

Do not duplicate global error-handling logic inside every controller.

Do not return `500` for expected business errors.

Do not expose passwords, tokens, or sensitive internal information in error responses.

---

# 17. API Response Style

Follow the existing response structure:

Successful response:

```json
{
  "success": true,
  "data": ...
}
```

Validation/business error:

```json
{
  "success": false,
  "message": "..."
}
```

Validation errors should follow the existing validator middleware format.

Do not invent a different response envelope for the new resource.

---

# 18. Route Design

Follow existing REST conventions.

Typical structure:

```text
GET     /api/resource
GET     /api/resource/:id
POST    /api/resource
PATCH   /api/resource/:id
DELETE  /api/resource/:id
```

If a special route such as:

```text
/api/resource/my
```

is required, define it BEFORE:

```text
/api/resource/:id
```

Otherwise `"my"` may be interpreted as an ID.

For example:

```ts
router.get("/my", ...);
router.get("/:id", ...);
```

not the reverse.

---

# 19. Security Rules

Never:

- return password hashes
- expose JWT secrets
- accept arbitrary user roles from public registration
- trust client-supplied ownership identifiers when authentication provides the identity
- allow unauthorized status transitions
- bypass existing authentication middleware
- disable validation to make a request work
- weaken existing authorization rules to simplify implementation

Follow the existing project's security model.

---

# 20. No Unnecessary Dependencies

Before installing a package:

1. Check whether the project already has a suitable dependency.
2. Check whether the task can be completed with the existing stack.
3. Avoid adding a dependency for a small helper that can be implemented safely using existing tools.

Do not modify `package.json` unnecessarily.

If a dependency truly is required, explain why before installing it when possible.

---

# 21. Existing Files That May Need Modification

Creating a resource will normally require:

```text
src/models/NewResource.ts
src/validators/newResource.validator.ts
src/services/newResource.service.ts
src/controllers/newResource.controller.ts
src/routes/newResource.routes.ts
```

and potentially:

```text
src/app.ts
```

Only modify existing files when necessary to connect the new resource.

Do not modify unrelated existing resources.

---

# 22. Naming Conventions

Inspect the existing code before naming files/functions.

Follow the established pattern:

```text
insuranceType.controller.ts
insuranceType.service.ts
insuranceType.validator.ts
insuranceType.routes.ts
```

rather than inventing another convention.

Use descriptive controller names such as:

```ts
getInsurancePoliciesController;
getInsurancePolicyByIdController;
createInsurancePolicyController;
updateInsurancePolicyController;
deactivateInsurancePolicyController;
```

when that matches the established resource.

---

# 23. Before Coding: Create a Plan

Before making changes, inspect the repository and determine:

```text
Resource:
Model:
Relationships:
CRUD operations:
Roles:
Ownership rules:
Validation rules:
Business rules:
Status/workflow:
Routes:
Files to create:
Existing files that must be modified:
```

Do not begin implementation until the architecture is understood.

Do not ask unnecessary questions when the existing project clearly establishes the answer.

If an important business rule is genuinely undefined, ask the user instead of inventing a major rule.

---

# 24. Implementation Order

Implement in this order unless the existing project requires otherwise:

1. Model
2. Validator
3. Service
4. Controller
5. Routes
6. Register routes in `app.ts`
7. Run TypeScript/build checks
8. Fix errors caused by the new resource
9. Test CRUD and important business rules

This makes errors easier to isolate.

---

# 25. Testing Requirements

Do not consider a resource complete merely because TypeScript compiles.

At minimum, test:

## Authentication

- no token
- invalid token
- inactive authenticated user

## Authorization

- allowed role
- disallowed role

## Create

- valid request
- missing required fields
- invalid field types
- invalid IDs
- nonexistent relationships
- inactive relationships
- duplicate values
- business-rule violations

## Read

- get all
- get one
- nonexistent ID
- malformed ID
- ownership restrictions where applicable

## Update

- valid update
- partial update
- nonexistent resource
- invalid fields
- invalid relationships
- duplicate values
- business-rule violations
- status transition rules if applicable

## Delete / Deactivate

- valid operation
- nonexistent resource
- unauthorized role
- verify resulting `isActive` state

Do not modify production code merely to make a test pass.

---

# 26. TypeScript Verification

After implementation, run the project's existing build/type-check command.

For this project, that normally means:

```bash
npm run build
```

If the build fails because of the new resource:

1. identify the actual cause
2. fix the new code
3. run the build again

If an error existed before the resource was created:

- do not silently refactor unrelated code
- report the pre-existing error separately

---

# 27. Scope Protection

Before finishing, inspect the changed files.

The final changes should contain only:

- new resource files
- required application route registration
- other absolutely necessary connection changes

If unrelated files were changed accidentally:

1. revert those unrelated changes if they were introduced by the agent
2. do not overwrite user changes
3. report what was changed

Never use broad formatting or automated refactoring across the project.

---

# 28. Do Not Guess Existing Code

If a required implementation detail is uncertain:

- inspect the repository
- inspect the corresponding existing resource
- inspect the relevant middleware/model
- then implement consistently

Do not invent a new pattern because it is common in tutorials or another project.

This project takes priority over generic examples.

---

# 29. Completion Report

After implementation, report:

### Created

```text
list of newly created files
```

### Modified

```text
list of existing files that had to be modified
```

### API

```text
METHOD /route
```

### Authorization

Explain which roles can perform each operation.

### Business Rules

Explain the important service-level rules.

### Verification

Report:

```text
npm run build
```

and whether it passed.

Do not claim an endpoint was tested unless it was actually tested.

---

# 30. Final Safety Check

Before declaring the resource complete, verify:

- [ ] Existing architecture was inspected.
- [ ] Existing coding style was followed.
- [ ] No unrelated refactoring was performed.
- [ ] No unrelated files were modified.
- [ ] CRUD is complete where required.
- [ ] Authentication is applied where required.
- [ ] Authorization is applied where required.
- [ ] Ownership is enforced where required.
- [ ] Validation is separated from business logic.
- [ ] Business rules are enforced in services.
- [ ] ObjectId relationships are validated.
- [ ] Active/inactive rules are respected.
- [ ] Duplicate checks are handled.
- [ ] PATCH behavior does not overwrite unspecified fields.
- [ ] Status transitions are protected where applicable.
- [ ] Route parameter types are safely narrowed.
- [ ] No unnecessary `any` or TypeScript suppression was added.
- [ ] No sensitive information is returned.
- [ ] API response format matches the existing project.
- [ ] `app.ts` contains the necessary route registration.
- [ ] TypeScript/build verification was performed.
- [ ] Only the requested resource and required integration code changed.

If any item is not satisfied, do not declare the resource complete.
