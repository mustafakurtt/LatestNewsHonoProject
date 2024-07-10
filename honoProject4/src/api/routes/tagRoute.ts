import { Hono, Context } from "hono";
import TagManager from "../../business/concrete/TagManager";
import RouteResponse from "../../utils/routes/routeResponse";
import { zValidator } from "@hono/zod-validator";
import * as schemas from "../../validator/zvalidator/schemas/tag/tagValidationSchema";
const tagService = new TagManager();
const app = new Hono();

app.get("/", async (c: Context) => {
  const tags = await tagService.GetAll();
  const response = new RouteResponse(tags);
  return c.json(response);
});

app.get(
  "/:id",
  zValidator("param", schemas.getTagParamValidationSchema),
  async (c: Context) => {
    const id = c.req.param("id");
    const tag = await tagService.GetById(id);
    const response = new RouteResponse(tag);
    return c.json(response);
  }
);

app.post(
  "/",
  zValidator("json", schemas.createTagJsonValidationSchema),
  async (c: Context) => {
    const tag = await c.req.json();
    const newTag = await tagService.Add(tag);
    const response = new RouteResponse(newTag);
    return c.json(response);
  }
);

app.put(
  "/:id",
  zValidator("json", schemas.updateTagJsonValidationSchema),
  zValidator("param", schemas.updateTagParamValidationSchema),
  async (c: Context) => {
    const id = c.req.param("id");
    const tag = await c.req.json();
    const updatedTag = await tagService.Update(id, tag);
    const response = new RouteResponse(updatedTag);
    return c.json(response);
  }
);

app.delete(
  "/:id",
  zValidator("param", schemas.deleteTagParamValidationSchema),
  async (c: Context) => {
    const id = c.req.param("id");
    const deletedTag = await tagService.Delete(id);
    const response = new RouteResponse(deletedTag);
    return c.json(response);
  }
);

export default app;
