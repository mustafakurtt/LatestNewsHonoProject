import { Hono,Context } from "hono";
import NewsManager from "../../business/concrete/NewsManager";
import RouteResponse from "../../utils/routes/routeResponse";
import { zValidator } from "@hono/zod-validator";
import * as schemas from "../../validator/zvalidator/schemas/news/newsValidationSchema";
const newsService = new NewsManager();
const app = new Hono();

app.get("/news",async (c: Context) => {
  const news = await newsService.GetAll();
  const response = new RouteResponse(news);
  return c.json(response);
});

app.get("/news/:id",
    zValidator("param", schemas.getByIdNewsParamValidationSchema)
    ,async (c: Context) => {
  const id = c.req.param("id");
  const news = await newsService.GetById(id);
  const response = new RouteResponse(news);
  return c.json(response);
});

app.post("/news",
    zValidator("json", schemas.createNewsJsonValidationSchema)
    ,async (c: Context) => {
  const news = await c.req.json();
  const newNews = await newsService.Add(news);
  const response = new RouteResponse(newNews);
  return c.json(response);
});

app.put("/news/:id", 
    zValidator("json", schemas.updateNewsJsonValidationSchema),
    zValidator("param", schemas.updateNewsParamValidationSchema),
    async (c: Context) => {
  const id = c.req.param("id");
  const news = await c.req.json();
  const updatedNews = await newsService.Update(id, news);
  const response = new RouteResponse(updatedNews);
  return c.json(response);
});

app.delete("/news/:id", 
    zValidator("param", schemas.deleteNewsParamValidationSchema),
    async (c: Context) => {
  const id = c.req.param("id");
  const deletedNews = await newsService.Delete(id);
  const response = new RouteResponse(deletedNews);
  return c.json(response);
});

export default app
