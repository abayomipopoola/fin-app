# Git Commit Message Guidelines

## Commit Message Format

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification to create clear, standardized commit messages:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

## Type

The type must be one of the following:

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that do not affect the meaning of the code (white-space, formatting, etc.)
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `perf`: A code change that improves performance
- `test`: Adding missing tests or correcting existing tests
- `build`: Changes to the build system or external dependencies
- `ci`: Changes to CI configuration files and scripts
- `chore`: Other changes that don't modify src or test files
- `revert`: Reverts a previous commit

## Scope

The scope should specify the part of the codebase affected by the changes, such as:

- `auth` - Authentication-related changes
- `api` - API-related changes
- `ui` - User interface components
- `db` - Database-related changes
- `config` - Configuration changes

## Description

The description is a short summary of the changes:

- Use the imperative, present tense: "change" not "changed" nor "changes"
- Don't capitalize the first letter
- No period (.) at the end
- Keep it concise and focused (ideally under 50 characters)

## Body

The body should include the motivation for the change and contrast this with previous behavior:

- Use the imperative, present tense
- Include the reasoning for your changes
- May include bullet points (hyphen or asterisk as bullets)
- If a breaking change, the body should begin with `BREAKING CHANGE:`

## Footer

The footer should contain information about breaking changes and reference GitHub issues that this commit closes:

- Reference issues that are closed by the commit: `Closes #123, #456`
- Breaking changes should start with the word `BREAKING CHANGE:` with a space or two newlines

## Examples

```
feat(auth): add email verification functionality

Implement email verification flow to enhance security.
Send verification emails to users upon registration.

Closes #123
```

```
fix(api): handle null response from payment gateway

Previously the app would crash when receiving a null response.
Now it properly handles this case with appropriate error messaging.
```

```
refactor(db): optimize user query performance

Improve query performance by adding indexes and optimizing joins.
Query time reduced by 60% in testing.
```

```
docs: update API documentation with new endpoints

Add documentation for the new payment and subscription endpoints.
Include request/response examples and authentication requirements.
```

```
feat(ui)!: redesign user dashboard

BREAKING CHANGE: The user dashboard layout has changed significantly.
Custom components built on top of the previous layout will need to be updated.

Closes #234
```

## Tools and Automation

- Consider using tools like `commitlint` to enforce commit message format
- Use `commitizen` for interactive commit message creation
- Consider setting up Git hooks with Husky to validate commit messages

## Configuration Example

```json
// commitlint.config.js
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'body-max-line-length': [2, 'always', 100],
    'subject-case': [
      2,
      'never',
      ['sentence-case', 'start-case', 'pascal-case', 'upper-case']
    ],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'type-case': [2, 'always', 'lower-case'],
    'type-empty': [2, 'never'],
    'type-enum': [
      2,
      'always',
      [
        'build',
        'chore',
        'ci',
        'docs',
        'feat',
        'fix',
        'perf',
        'refactor',
        'revert',
        'style',
        'test'
      ]
    ]
  }
};
```
