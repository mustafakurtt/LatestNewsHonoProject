import { Hono, Context } from "hono";
import CategoryManager from "../../business/concrete/CategoryManager";
import * as schemas from "../../validator/zvalidator/schemas/category/categoryValidationSchema";
import { zValidator } from "@hono/zod-validator";
import RouteResponse from "../../utils/routes/routeResponse";

const categoryService = new CategoryManager();
const app = new Hono();

app.get("/", async (c: Context) => {
  const categories = await categoryService.GetAll();
  const response = new RouteResponse(categories);
  return c.json(response);
});

app.get(
  "/:id",
  zValidator("param", schemas.getByIdCategoryParamValidationSchema),
  async (c: Context) => {
    const id = c.req.param("id");
    const category = await categoryService.GetById(id);
    const response = new RouteResponse(category);
    return c.json(response);
  }
);

app.post(
  "/",
  zValidator("json", schemas.createCategoryJsonValidationSchema),
  async (c: Context) => {
    const category = await c.req.json();
    const newCategory = await categoryService.Add(category);
    const response = new RouteResponse(newCategory);
    return c.json(response);
  }
);

app.put(
  "/:id",
  zValidator("json", schemas.updateCategoryJsonValidationSchema),
  zValidator("param", schemas.updateCategoryParamValidationSchema),
  async (c: Context) => {
    const id = c.req.param("id");
    const category = await c.req.json();
    const updatedCategory = await categoryService.Update(id, category);
    const response = new RouteResponse(updatedCategory);
    return c.json(response);
  }
);

app.delete(
  "/:id",
  zValidator("param", schemas.deleteCategoryParamValidationSchema),
  async (c: Context) => {
    const id = c.req.param("id");
    const deletedCategory = await categoryService.Delete(id);
    const response = new RouteResponse(deletedCategory);
    return c.json(response);
  }
);

export default app;
