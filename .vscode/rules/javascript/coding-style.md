# JavaScript Coding Style

## Naming Conventions

### Variables and Functions

- Use `camelCase` for variables and function names
- Use descriptive names that reveal intent
- Boolean variables should have prefix like `is`, `has`, or `should`
- Avoid single letter variables except for loop counters or temporary variables
- Use meaningful and pronounceable variable names

```javascript
// Good
const firstName = 'John';
const isActive = true;
const hasPermission = checkPermissions();

// Avoid
const fn = 'John';
const a = true;
const chk = checkPermissions();
```

### Constants

- Use `UPPERCASE_WITH_UNDERSCORES` for true constants (values that never change)

```javascript
const API_BASE_URL = 'https://api.example.com';
const MAX_ITEMS_PER_PAGE = 50;
```

### Classes

- Use `PascalCase` for class names
- Use `camelCase` for class methods and properties

```javascript
class UserAccount {
  constructor(email, password) {
    this.email = email;
    this.password = password;
  }

  resetPassword() {
    // Implementation
  }
}
```

### File Naming

- Use `kebab-case.js` for filenames
- Use consistent file extensions (`.js`, `.jsx`, `.ts`, `.tsx`)
- Name files according to their main export
- For components (in frameworks like React), use the component name

## Formatting

### Indentation

- Use 2 spaces for indentation
- Be consistent in your indentation style throughout the project

### Line Length

- Aim to keep lines under 80-100 characters
- Break long lines at logical places

### Semicolons

- Always use semicolons at the end of statements
- Don't rely on automatic semicolon insertion

### Quotes

- Prefer single quotes (`'`) for string literals
- Use double quotes (`"`) for JSX attributes
- Use backticks (`` ` ``) for template literals

### Spacing

- Use spaces around operators
- Use spaces after commas
- No space between function name and parentheses
- One space before opening braces

```javascript
// Good
const x = y + z;
const names = ['Alice', 'Bob', 'Charlie'];
function doSomething() {
  // Implementation
}

// Avoid
const x = y + z;
const names = ['Alice', 'Bob', 'Charlie'];
function doSomething() {
  // Implementation
}
```

### Braces

- Always use braces for blocks, even for single-line blocks
- Open braces on the same line as the statement

```javascript
// Good
if (condition) {
  doSomething();
}

// Avoid
if (condition) doSomething();
```

## Best Practices

### Code Structure

- Limit file length (aim for under 300-500 lines)
- Group related code together
- Organize code in a logical manner

### Whitespace

- Use blank lines to separate logical blocks of code
- Remove trailing whitespace
- End files with a single newline

### Commenting Style

- Use `//` for single-line comments
- Use `/* ... */` for multi-line comments
- Use JSDoc style (`/** ... */`) for documentation comments

### ESLint Configuration

```json
{
  "extends": ["eslint:recommended", "prettier"],
  "rules": {
    "semi": ["error", "always"],
    "quotes": ["error", "single"],
    "indent": ["error", 2],
    "no-unused-vars": "warn",
    "no-console": "warn"
  }
}
```

## Tools and Automation

- Use ESLint for static code analysis
- Use Prettier for code formatting
- Consider using TypeScript for type checking
- Set up pre-commit hooks for linting and formatting
