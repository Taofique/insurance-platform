---
name: git-commit
description: Safely create Git commits for the user's current task. Determine repository root and working directory before running Git commands, inspect changes, stage only intended files, protect unrelated work and sensitive files, and never push unless explicitly requested.
---

---

# Git Commit Skill

Use this skill whenever the user asks to commit changes.

The priority is **correctness and safety over speed**.

Never guess the repository path, current directory, intended files, or scope of a commit.

---

# 1. Determine the Git context FIRST

Before staging anything, determine:

```bash
pwd
git rev-parse --show-toplevel
git status --short
```

Use the output to understand:

- current working directory
- Git repository root
- current branch
- modified files
- untracked files

Do NOT assume the agent is currently at the repository root.

---

# 2. Understand relative paths

Git commands use paths relative to the current working directory unless an absolute/path-from-root form is explicitly used.

Before running a command such as:

```bash
git add backend/
```

verify that `backend/` actually exists relative to the current directory.

For example, if:

```text
pwd
.../insurance-platform/backend
```

then:

```bash
git add backend/
```

is WRONG because it refers to:

```text
.../insurance-platform/backend/backend/
```

In that situation, use paths relative to the current directory:

```bash
git add src package.json package-lock.json tsconfig.json
```

or move to the repository root first:

```bash
cd "$(git rev-parse --show-toplevel)"
```

then use:

```bash
git add backend/...
```

Prefer whichever approach makes the intended scope clearest.

---

# 3. NEVER blindly use `git add .`

Do NOT use:

```bash
git add .
```

as a fallback after another `git add` command fails.

A failed pathspec means the path was probably wrong. Diagnose the path instead.

If `git add .` would be considered, first verify:

```bash
pwd
git status --short
```

and confirm that EVERY change under `.` belongs to the user's requested task.

If there is any uncertainty, use specific paths instead.

---

# 4. Determine the user's requested scope

Examples:

### User says:

```text
commit the backend changes
```

Determine the repository root and current location first.

If currently at:

```text
insurance-platform/
```

the intended scope is:

```text
backend/
```

If currently at:

```text
insurance-platform/backend/
```

the intended scope is the current backend directory, NOT `backend/`.

### User says:

```text
commit the auth changes
```

Inspect the diff and identify only files related to authentication.

### User says:

```text
commit everything
```

Only then may the full working tree be considered, but sensitive and ignored files must still be protected.

---

# 5. Inspect before staging

Run:

```bash
git status --short
git diff
git diff --stat
```

For untracked files, inspect the relevant files/directories when necessary.

Do not assume an untracked directory contains only safe or relevant files.

---

# 6. Protect unrelated work

If the working tree contains changes unrelated to the user's request:

- Do NOT stage them.
- Do NOT modify them.
- Do NOT delete them.
- Do NOT reset them.
- Do NOT stash them unless explicitly requested.

For example:

```text
M frontend/app/routes/home.tsx
?? backend/src/auth/
?? .opencode/
```

If the user asks:

```text
commit the backend changes
```

only the backend changes should be considered.

`.opencode/` and frontend changes must remain untouched.

---

# 7. Protect sensitive files

Never commit:

```text
.env
.env.*
node_modules/
```

unless the user explicitly requests a specific exception.

`.env.example` may be committed when it contains no secrets.

Before staging, verify that sensitive files are ignored:

```bash
git check-ignore -v .env
```

For directories/files that may contain secrets, inspect before staging.

Never expose secrets in the commit message or final response.

---

# 8. Stage using verified paths

Prefer specific paths:

```bash
git add backend/src/app.ts backend/src/server.ts
```

or:

```bash
git add src/app.ts src/server.ts
```

depending on the current working directory.

After staging:

```bash
git status --short
git diff --cached --stat
git diff --cached
```

Verify that the staged changes contain ONLY the user's requested changes.

---

# 9. If staging produces an error

STOP and diagnose the problem.

Do NOT immediately try another broad command.

For example, if:

```bash
git add backend/
```

returns:

```text
pathspec 'backend/' did not match any files
```

do NOT respond by running:

```bash
git add .
```

Instead determine:

```bash
pwd
git rev-parse --show-toplevel
ls
```

Then calculate the correct relative path.

---

# 10. Never use destructive Git commands

Do NOT run these unless the user explicitly requests the exact operation:

```bash
git reset --hard
git clean -fd
git checkout -- .
git restore .
git rebase
git commit --amend
```

Never use destructive commands simply to make the working tree clean.

---

# 11. Do not modify source code for a commit

The commit skill is responsible for committing existing changes.

Do NOT:

- fix unrelated bugs
- format unrelated files
- rename files
- refactor code
- update dependencies
- modify `.gitignore`
- change configuration

just to make the commit cleaner.

If something appears wrong, report it instead of silently changing it.

---

# 12. Create the commit

Use a concise conventional commit message.

Prefixes:

```text
feat:      new functionality
fix:       bug fix
refactor:  restructuring without behavior chan
```
