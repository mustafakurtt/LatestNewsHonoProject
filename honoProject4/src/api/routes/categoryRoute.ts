import { Hono,Context } from "hono";
import CategoryManager from "../../business/concrete/CategoryManager";

const categoryService = new CategoryManager();
const app = new Hono();

app.get("/", async (c:Context) => {
    const categories = await categoryService.GetAll();
    const data = {
        success: true,
        data: categories,
        time: new Date().toISOString()
    }
    return c.json(categories);
});

app.get("/:id", async (c:Context) => {
    const id = c.req.param("id");
    const category = await categoryService.GetById(id);
    const data = {
        success: true,
        data: category,
        time: new Date().toISOString()
    }   
    return c.json(category);
});

app.post("/", async (c:Context) => {
    const category = await c.req.json();
    const newCategory = await categoryService.Add(category);
    const data = {
        success: true,
        data: newCategory,
        time: new Date().toISOString()
    }
    return c.json(data);
});

app.put("/:id", async (c:Context) => {
    const id = c.req.param("id");
    const category = await c.req.json();
    const updatedCategory = await categoryService.Update(id, category);
    const data = {
        success: true,
        data: updatedCategory,
        time: new Date().toISOString()
    }
    return c.json(data);
});

app.delete("/:id", async (c:Context) => {
    const id = c.req.param("id");
    const deletedCategory = await categoryService.Delete(id);
    const data = {
        success: true,
        data: deletedCategory,
        time: new Date().toISOString()
    }
    return c.json(data);
});

export default app;