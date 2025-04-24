# NodeJS GitHub Copilot Rules

A collection of [GitHub Copilot AI rules](https://code.visualstudio.com/docs/copilot/copilot-customization) for NodeJS development best practices.

> [!TIP]
> You can enhance Copilot's chat responses by providing it with contextual details about your team's workflow, tools, or project specifics.

## Available Rule Sets

This set of rules is a good starting point and should be customized to fit your specific needs. You can add or remove rules as necessary.

### [NodeJS Development](.vscode/rules/javascript/)

Rules for writing clean, maintainable JavaScript/TypeScript code:

- ✨ Modern JavaScript/TypeScript patterns
- 🧪 Testing best practices
- 📁 Code organization
- 🛡️ Error handling
- 🔌 Dependency management

* Code-generation instructions
  - [javascript/coding-guidelines.md](.vscode/rules/javascript/coding-guidelines.md)
  - [javascript/coding-style.md](.vscode/rules/javascript/coding-style.md)
* Test-generation instructions
  - [javascript/testing-jest.md](.vscode/rules/javascript/testing-jest.md)
  - [javascript/testing-vitest.md](.vscode/rules/javascript/testing-vitest.md)

### [Git](.vscode/rules/git-message.md)

- Commit message generation instructions
  - [git-message.md](.vscode/rules/git-message.md)

## Available Prompts

Prompt files (prompts) let you build and share reusable prompt instructions with additional context.

- [Pros and Cons Prompt](.vscode/prompts/pros-and-cons.prompt.md) - Analyze solutions with their strengths and weaknesses
- [Q&A Session Prompt](.vscode/prompts/qa.prompt.md) - Structured yes/no questions to better understand needs

See more at [Custom instructions for GitHub Copilot in VS Code](https://code.visualstudio.com/docs/copilot/copilot-customization)

## How to Use This Repository

Copy the relevant rules you want to use into your project's `.vscode/rules` directory and configure the appropriate settings in your `.vscode/settings.json` file.

Here is an example of how to set up your `.vscode/settings.json` file:

```json
{
  "github.copilot.chat.codeGeneration.instructions": [
    {
      "file": ".vscode/rules/javascript/coding-guidelines.md"
    },
    {
      "file": ".vscode/rules/javascript/coding-style.md"
    }
  ],
  "github.copilot.chat.commitMessageGeneration.instructions": [
    {
      "file": ".vscode/rules/git-message.md"
    }
  ],
  "github.copilot.chat.reviewSelection.enabled": true,
  "github.copilot.chat.reviewSelection.instructions": [
    {
      "file": ".vscode/rules/javascript/coding-guidelines.md"
    },
    {
      "file": ".vscode/rules/javascript/coding-style.md"
    }
  ],
  "github.copilot.chat.testGeneration.instructions": [
    {
      "file": ".vscode/rules/javascript/testing-jest.md"
      // Or use Vitest instead:
      // "file": ".vscode/rules/javascript/testing-vitest.md"
    }
  ],
  "chat.promptFiles": true,
  "chat.promptFilesLocations": {
    ".github/prompts": true,
    ".vscode/prompts": true
  }
}
```

### Choosing Between Testing Frameworks

When you have both Jest and Vitest guidelines in your repository, you need to explicitly configure which one to use in your settings.json file. GitHub Copilot will only use the testing guidelines that you point it to.

If your project transitions from one testing framework to another, simply update the settings to point to the appropriate guidelines file.

## Motivation

### Treating AI like a teammate!

If you want to build a successful and maintainable project, ensuring your code is clean, maintainable, and idiomatic is crucial. This is where _coding guidelines_ come into play.

Coding guidelines promote consistency, readability, and maintainability within a project. Documenting these guidelines helps developers adhere to best practices, streamline collaboration, and minimize technical debt.

As AI coding tools and agents become integral team members, clear coding guidelines are more important than ever. These tools assist in generating, refactoring, and reviewing code, but they rely on well-defined rules to align with project standards. Documenting coding guidelines provides essential context, ensuring AI-generated code maintains consistency, readability, and best practices. Without structured rules, AI contributions may introduce inconsistencies, increasing technical debt and maintenance overhead.

### Documentation

Document your coding guidelines so it can be consumed by AI tools. Not only it can be used for additional context for code generation, but also now you can chat with LLMs about your coding guidelines. It becomes integral part of your project.

For example, you can ask Copilot for a review of your code and it will be able to refer to the coding guidelines you provided.

### Agent Mode

Check out the introduction to [Agent Mode](https://code.visualstudio.com/blogs/2025/02/24/introducing-copilot-agent-mode).
