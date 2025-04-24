import { jsxRenderer } from 'hono/jsx-renderer';

export const renderer = jsxRenderer(({ children, title }) => {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {import.meta.env.PROD ? (
          <>
            <link href="/static/style.css" rel="stylesheet" />
            <script defer type="module" src="/static/bundle.js"></script>
          </>
        ) : (
          <>
            <link href="/src/web/style.css" rel="stylesheet" />
            <script defer type="module" src="/src/web/bundle.ts"></script>
            <script type="module" src="/@vite/client"></script>
          </>
        )}
        <script src="https://unpkg.com/htmx.org@2.0.4"></script>
        <script src="https://unpkg.com/hyperscript.org@0.9.13"></script>
        <title>{title ? `Htmx Todo | ${title}` : 'Htmx Todo'}</title>
      </head>
      <body>
        <div class="p-4">
          <h1 class="mb-4 text-4xl font-bold">
            <a href="/">Todo</a>
          </h1>
          {children}
        </div>
      </body>
    </html>
  );
});

export const AddTodo = () => (
  <form
    hx-post="/todo"
    hx-target="#todo"
    hx-swap="beforebegin"
    _="on htmx:afterRequest reset() me"
    class="mb-4"
  >
    <div class="mb-2">
      <input
        name="title"
        type="text"
        class="rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900"
      />
    </div>
    <button
      class="rounded-lg bg-blue-700 px-5 py-2 text-center text-white hover:bg-blue-800"
      type="submit"
    >
      Submit
    </button>
  </form>
);

export const Item = ({ title, id }: { title: string; id: string }) => (
  <p
    hx-delete={`/todo/${id}`}
    hx-swap="outerHTML"
    class="row my-1 mb-2 flex items-center justify-between rounded-lg border bg-gray-100 px-4 py-1 text-lg text-gray-600"
  >
    {title}
    <button class="font-medium">Delete</button>
  </p>
);
