# JavaScript Coding Guidelines

## General Principles

- Write clean, readable, and maintainable code
- Follow established community standards and best practices
- Be consistent within your codebase
- Write self-documenting code with clear intent
- Apply the DRY (Don't Repeat Yourself) principle

## Coding Practices

### Modern JavaScript Features

- Use ECMAScript (ES6+) features where appropriate
- Prefer `const` for variables that don't need reassignment
- Use `let` for variables that require reassignment
- Avoid using `var`
- Use arrow functions for anonymous functions and to preserve `this` context
- Use template literals for string interpolation
- Use destructuring for objects and arrays
- Use spread/rest operators for working with arrays and objects
- Use default parameters and named parameters for complex functions

### Asynchronous Code

- Use Promises or async/await for asynchronous operations
- Avoid callback hell/pyramids of doom
- Always handle Promise rejections
- Use try/catch blocks with async/await

### Modules and Imports

- Use ES modules (`import`/`export`) for module management
- Organize imports logically (built-in modules first, then third-party, then local)
- Avoid side effects in modules
- Export only what is necessary

### Error Handling

- Use try/catch blocks for error handling
- Create custom error classes when appropriate
- Log meaningful error messages
- Handle errors at the appropriate level

### Performance

- Avoid premature optimization
- Use array methods like map, filter, and reduce instead of loops when appropriate
- Be mindful of memory usage, especially with closures
- Avoid blocking the main thread with long-running operations

## Code Organization

### Project Structure

- Organize files by feature or module, not by type
- Keep related files close to each other
- Use a consistent and logical directory structure
- Separate business logic from UI components (if applicable)

### Function Design

- Functions should do one thing and do it well
- Keep functions small and focused
- Limit function parameters (consider using objects for many parameters)
- Use meaningful function names that describe what they do

### Comments and Documentation

- Write self-explanatory code that reduces the need for comments
- Use JSDoc comments for public APIs and complex functions
- Document non-obvious decisions or implementations
- Keep comments up-to-date with code changes

## TypeScript (if applicable)

- Use TypeScript for large projects or when type safety is important
- Define explicit types for function parameters and return values
- Use interfaces and types to define data structures
- Leverage generics where appropriate
- Use enums for fixed sets of values
