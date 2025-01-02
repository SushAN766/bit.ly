import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client'
import { nanoid } from 'nanoid'

const app = new Hono()
const prisma = new PrismaClient()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.get('/urls', async (c) => {
  const urls = await prisma.url.findMany()
  return c.json(urls, 200)
})

app.post('/urls/create', async (c) => {
  try {
    const { urls } = await c.req.json<{ urls : string }>()
    const short = nanoid(6)
    const shortUrl = await prisma.url.create({
      data: {
        original_url: urls,
        slug: short,
      },
    })
    return c.json(shortUrl, 201)
  } catch (error) {
    return c.json({ error: 'Failed to create short URL' }, 500)
  }
})

app.get("urls/:slug", async (c) => {
  const { slug } = c.req.param();
  const url = await prisma.url.findUnique({
    where: {
      slug,
    },
  });
  if(!url) {
    return c.json({ error: 'URL not found' }, 404)
  }
  await prisma.url.update({
    where: { slug },
    data: { views: { increment: 1 } },
  });

  return c.json(url, 200)
});

app.delete("urls/:slug", async (c) => {
  const { slug } = c.req.param();
  const url = await prisma.url.delete({
    where: {
      slug,
    },
  });
  return c.json({messgage: "URL deleted"}, 200)
});

const port = 3000
console.log(`Server is running on http://localhost:${port}`)

serve({
  fetch: app.fetch,
  port,
})