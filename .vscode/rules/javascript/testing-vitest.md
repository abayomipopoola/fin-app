# JavaScript Testing Guidelines with Vitest

## Introduction to Vitest

[Vitest](https://vitest.dev/) is a fast, modern testing framework powered by Vite. It offers:

- Native ESM support
- TypeScript support out of the box
- Smart and instant watch mode
- Jest-compatible API (making migration easier)
- Chai-compatible assertion API
- Code coverage via c8 or istanbul
- Browser testing capabilities

## Setup and Configuration

### Installation

```bash
npm install -D vitest
# or with yarn
yarn add -D vitest
```

### Configuration

Create a `vitest.config.js` or `vitest.config.ts` file:

```javascript
// vitest.config.js
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // Test options
    globals: true, // Allow global test, expect, etc.
    environment: 'node', // or 'jsdom', 'happy-dom', etc.
    include: ['**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    coverage: {
      provider: 'c8', // or 'istanbul'
      reporter: ['text', 'json', 'html'],
      exclude: ['**/node_modules/**', '**/dist/**'],
    },
  },
});
```

## Test Organization

### File Structure

- Keep test files close to their implementation files
- Use `.test.js`, `.spec.js`, or place tests in a `__tests__` directory
- For components, group tests alongside the component files

### Test Suites and Cases

Use the following structure for organizing tests:

```javascript
// user.test.js
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { User } from './user';

describe('User', () => {
  let user;

  beforeEach(() => {
    user = new User('John', 'Doe');
  });

  describe('name handling', () => {
    it('should return full name correctly', () => {
      expect(user.getFullName()).toBe('John Doe');
    });

    it('should update name properly', () => {
      user.updateName('Jane', 'Smith');
      expect(user.getFullName()).toBe('Jane Smith');
    });
  });
});
```

## Vitest-Specific Features

### In-Source Testing

Vitest supports in-source testing, allowing you to define tests next to your implementation:

```javascript
// calculator.js
export function add(a, b) {
  return a + b;
}

// Tests are included in the same file
if (import.meta.vitest) {
  const { describe, it, expect } = import.meta.vitest;

  describe('add', () => {
    it('should add two numbers correctly', () => {
      expect(add(1, 2)).toBe(3);
    });
  });
}
```

Enable this feature in your configuration:

```javascript
// vitest.config.js
export default defineConfig({
  test: {
    includeSource: ['src/**/*.{js,ts}'],
  },
});
```

### Thread Handling

Vitest can run tests in multiple threads for improved performance:

```javascript
// vitest.config.js
export default defineConfig({
  test: {
    threads: true,
    pool: 'threads', // or 'forks' or 'vmThreads'
    poolOptions: {
      threads: {
        minThreads: 1,
        maxThreads: 4,
      },
    },
  },
});
```

### Snapshot Testing

Vitest supports Jest-style snapshot testing:

```javascript
it('should match snapshot', () => {
  const user = { name: 'John', role: 'admin' };
  expect(user).toMatchSnapshot();
});
```

## Testing Practices

### Unit Testing

- Focus on testing the smallest units of code
- Isolate dependencies through mocking
- Use Vitest's mocking capabilities for clean isolation

```javascript
import { vi } from 'vitest';

// Mock a module
vi.mock('./database');

// Create a mock function
const mockFn = vi.fn().mockReturnValue('mocked value');

// Spy on a method
const spy = vi.spyOn(object, 'method');
```

### Component Testing

For UI frameworks like Vue, React, or Svelte, use the appropriate test utilities:

```javascript
// React with testing-library
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, test } from 'vitest';
import Counter from './Counter';

test('counter increments when button is clicked', async () => {
  render(<Counter />);
  expect(screen.getByText('Count: 0')).toBeInTheDocument();

  await userEvent.click(screen.getByRole('button', { name: /increment/i }));
  expect(screen.getByText('Count: 1')).toBeInTheDocument();
});
```

### API/Integration Testing

- Use Vitest for integration tests that span multiple units
- Consider using tools like MSW (Mock Service Worker) for API mocking
- Use `beforeAll` and `afterAll` for setup and teardown

```javascript
import { beforeAll, afterAll, describe, it, expect } from 'vitest';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import { fetchUserData } from './api';

const server = setupServer(
  rest.get('/api/user/:id', (req, res, ctx) => {
    return res(ctx.json({ id: req.params.id, name: 'Test User' }));
  }),
);

beforeAll(() => server.listen());
afterAll(() => server.close());

describe('API', () => {
  it('should fetch user data correctly', async () => {
    const user = await fetchUserData('123');
    expect(user).toEqual({ id: '123', name: 'Test User' });
  });
});
```

## Assertions

Vitest supports both Jest-style and Chai-style assertions:

```javascript
// Jest-style
expect(value).toBe(expected);
expect(array).toContain(item);
expect(fn).toThrow();

// Chai-style
expect(value).to.equal(expected);
expect(array).to.include(item);
expect(fn).to.throw();
```

## Async Testing

Vitest handles async testing with promises or async/await:

```javascript
// With async/await
it('should resolve with correct data', async () => {
  const result = await fetchData();
  expect(result).toEqual({ success: true });
});

// With promises
it('should reject with an error', () => {
  return expect(fetchInvalidData()).rejects.toThrow();
});
```

## Mocking

### Mocking Functions

```javascript
import { vi } from 'vitest';

const mockFn = vi.fn();
mockFn.mockReturnValue(42);
// or
mockFn.mockImplementation(() => 42);

// Assertions
expect(mockFn).toHaveBeenCalled();
expect(mockFn).toHaveBeenCalledWith('arg');
expect(mockFn).toHaveBeenCalledTimes(1);
```

### Mocking Modules

```javascript
import { vi } from 'vitest';

vi.mock('./database', () => {
  return {
    connect: vi.fn(),
    query: vi.fn().mockResolvedValue([{ id: 1, name: 'Test' }]),
  };
});
```

### Mocking Timers

```javascript
import { vi } from 'vitest';

// Set up timer mocks
beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.restoreAllMocks();
});

it('should handle setTimeout correctly', () => {
  const callback = vi.fn();
  setTimeout(callback, 1000);

  // Fast-forward time
  vi.advanceTimersByTime(1000);
  expect(callback).toHaveBeenCalled();
});
```

## Coverage Reports

Configure code coverage in your Vitest config:

```javascript
// vitest.config.js
export default defineConfig({
  test: {
    coverage: {
      provider: 'c8', // or 'istanbul'
      reporter: ['text', 'json', 'html', 'lcov'],
      exclude: [
        '**/node_modules/**',
        '**/dist/**',
        '**/*.test.{js,ts}',
        '**/.{idea,git,cache,output}/**',
      ],
      thresholds: {
        statements: 80,
        branches: 70,
        functions: 80,
        lines: 80,
      },
    },
  },
});
```

## Best Practices

### Performance Optimization

- Use `.skip`, `.only`, and `.todo` to manage test execution
- Leverage watch mode for quick feedback during development
- Use threading for faster test execution on large test suites

### Test Isolation

- Reset mocks between tests
- Use `beforeEach` and `afterEach` for setup/teardown
- Avoid test pollution with proper cleanup

```javascript
import { vi, beforeEach, afterEach } from 'vitest';

beforeEach(() => {
  // Setup
});

afterEach(() => {
  vi.restoreAllMocks();
  // Additional cleanup
});
```

### Running Specific Tests

```bash
# Run tests matching a pattern
npx vitest run user

# Run tests in watch mode
npx vitest watch

# Run UI mode
npx vitest --ui
```

## Transition from Jest

If you're transitioning from Jest to Vitest, most of your tests should work with minimal changes:

- Replace `jest` imports with `vitest`
- Update configuration from `jest.config.js` to `vitest.config.js`
- Replace `jest` with `vi` for mocking utilities

```javascript
// Before (Jest)
jest.mock('./service');
const mockFn = jest.fn();

// After (Vitest)
import { vi } from 'vitest';
vi.mock('./service');
const mockFn = vi.fn();
```

## Troubleshooting

- Use the `--inspect` flag for debugging: `npx vitest --inspect`
- Enable verbose mode for more output: `npx vitest --verbose`
- Use the UI for visual test analysis: `npx vitest --ui`
- Check for common issues like environment dependencies, timer issues, or module mock problems
