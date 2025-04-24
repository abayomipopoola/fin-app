# Copilot Rules & Prompts Folder Structure

```
.
├── README.md
├── .vscode
│   ├── settings.json
│   ├── prompts
│   │   ├── pros-and-cons.prompt.md
│   │   └── qa.prompt.md
│   └── rules
│       ├── git-message.md
│       └── javascript
│           ├── coding-guidelines.md
│           ├── coding-style.md
│           ├── testing-jest.md
│           └── testing-vitest.md
```

## Files Purpose

- **README.md**: Overview and instructions for using this repository
- **.vscode/settings.json**: Configuration for GitHub Copilot to use the rules
- **.vscode/prompts/**: Reusable prompt templates for Copilot
  - **pros-and-cons.prompt.md**: Template for analyzing solutions
  - **qa.prompt.md**: Template for Q&A sessions
- **.vscode/rules/**: Custom rules for GitHub Copilot
  - **git-message.md**: Guidelines for commit message generation
  - **javascript/**: Rules specific to JavaScript/NodeJS development
    - **coding-guidelines.md**: General JavaScript best practices
    - **coding-style.md**: Styling conventions for JavaScript
    - **testing-jest.md**: Testing guidelines using Jest
    - **testing-vitest.md**: Testing guidelines using Vitest
