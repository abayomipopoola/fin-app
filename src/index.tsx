import db from '@/db';
import { todo } from '@/db/schema';
import { AddTodo, Item, renderer } from '@/web/components';
import { serveStatic } from '@hono/node-server/serve-static';
import { zValidator } from '@hono/zod-validator';
import { eq } from 'drizzle-orm';
import { Hono } from 'hono';
import { z } from 'zod';

const app = new Hono();

app.get('/static/*', serveStatic({ root: './public' }));
app.get('*', renderer);

app.get('/', async (c) => {
  const todos = await db.select({ id: todo.id, title: todo.title }).from(todo);
  return c.render(
    <div>
      <AddTodo />
      {todos.map((todo) => {
        return <Item title={todo.title} id={todo.id} />;
      })}
      <div id="todo"></div>
    </div>,
    { title: 'Create todos' },
  );
});

app.post(
  '/todo',
  zValidator(
    'form',
    z.object({
      title: z.string().min(1),
    }),
  ),
  async (c) => {
    const { title } = c.req.valid('form');
    const id = crypto.randomUUID();
    await db.insert(todo).values({ id, title });
    return c.html(<Item title={title} id={id} />);
  },
);

app.delete('/todo/:id', async (c) => {
  const id = c.req.param('id');
  await db.delete(todo).where(eq(todo.id, id));
  c.status(200);
  return c.body(null);
});

export default app;
