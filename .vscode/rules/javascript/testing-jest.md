# JavaScript Testing Guidelines with Jest

## General Testing Principles

- Write tests that are clear, concise, and maintainable
- Follow the AAA pattern: Arrange, Act, Assert
- Test behavior, not implementation details
- Each test should focus on a single behavior or unit of functionality
- Tests should be independent and isolated from each other
- Keep tests simple and avoid complex logic

## Test Organization

### File Structure

- Test files should be located close to the code they test
- Use either a `__tests__` folder in each module or co-locate test files with a `.test.js` or `.spec.js` suffix
- Organize test files to mirror the structure of the source code

### Test Suites and Cases

- Use `describe` blocks to group related tests
- Use nested `describe` blocks for hierarchical organization
- Use clear and descriptive test names that explain the expected behavior
- Use `it` or `test` for individual test cases with descriptive names

```javascript
describe('UserService', () => {
  describe('login', () => {
    it('should return a token when credentials are valid', () => {
      // Test implementation
    });

    it('should throw an error when credentials are invalid', () => {
      // Test implementation
    });
  });
});
```

## Testing Practices

### Unit Testing

- Focus on testing the smallest units of code in isolation
- Mock dependencies to isolate the unit under test
- Aim for high test coverage of business logic
- Test edge cases and error conditions

### Integration Testing

- Test how multiple units work together
- Minimize mocking for integration tests
- Focus on testing interfaces between components

### API/Service Testing

- Test API endpoints with realistic requests
- Verify correct status codes, headers, and response bodies
- Test both successful and error scenarios

### Mocking

- Use Jest's built-in mocking capabilities (`jest.mock`, `jest.fn()`)
- Mock external dependencies (APIs, databases, etc.)
- Be careful not to over-mock, which can lead to brittle tests
- Reset mocks between tests to avoid test pollution

```javascript
// Mock a module
jest.mock('../services/userService');

// Create a mock function
const mockFn = jest.fn().mockReturnValue('mocked value');

// Reset mocks
afterEach(() => {
  jest.clearAllMocks();
});
```

## Assertions

- Use expressive assertions that clearly communicate intent
- Use the most specific assertion available
- Provide helpful error messages for assertions

```javascript
// Good
expect(user.isAdmin).toBe(true);
expect(users).toHaveLength(3);
expect(errorFn).toThrow('Invalid input');

// Avoid
expect(user.isAdmin === true).toBe(true);
expect(users.length === 3).toBe(true);
```

## Async Testing

- Use `async/await` for asynchronous tests
- Always wait for async operations to complete
- Test both resolved and rejected promises

```javascript
it('should fetch user data', async () => {
  const user = await userService.fetchUser(1);
  expect(user.name).toBe('John Doe');
});

it('should handle API errors', async () => {
  await expect(userService.fetchUser(-1)).rejects.toThrow('User not found');
});
```

## Test Data

- Use factories or fixtures for creating test data
- Avoid hardcoding test data when possible
- Only include data relevant to the test case
- Use descriptive names for test data variables

```javascript
// User factory
const createUser = (overrides = {}) => ({
  id: 1,
  name: 'Test User',
  email: 'test@example.com',
  isAdmin: false,
  ...overrides,
});

it('should identify admin users', () => {
  const adminUser = createUser({ isAdmin: true });
  expect(isAdminUser(adminUser)).toBe(true);
});
```

## Test Coverage

- Aim for high test coverage but prioritize test quality over quantity
- Focus on testing business-critical paths
- Use Jest's coverage reports to identify untested code
- Consider setting minimum coverage thresholds

```json
// Jest configuration
{
  "collectCoverage": true,
  "coverageThreshold": {
    "global": {
      "branches": 80,
      "functions": 80,
      "lines": 80,
      "statements": 80
    }
  }
}
```

## Best Practices

- Keep tests fast to encourage frequent testing
- Make tests deterministic (no random behavior)
- Clean up after tests (restore mocks, close connections)
- Use `beforeEach` and `afterEach` for common setup and teardown
- Avoid testing implementation details that may change

## Troubleshooting Tests

- Use `console.log` for debugging but remove before committing
- Use `test.only` or `describe.only` to focus on specific tests during development
- Use `--watch` mode during development for quick feedback
- Check for test pollution when tests fail inconsistently
