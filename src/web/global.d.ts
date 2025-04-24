import 'hono';

declare module 'hono' {
  interface ContextRenderer {
    /* eslint-disable @typescript-eslint/prefer-function-type */
    (content: string | Promise<string>, props?: { title?: string }): Response;
  }
}
