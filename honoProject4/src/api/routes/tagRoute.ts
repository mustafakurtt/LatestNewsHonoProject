import { Hono,Context } from "hono";
import TagManager from "../../business/concrete/TagManager";

const tagService = new TagManager();
const app = new Hono();

app.get("/", async (c:Context) => {
    const tags = await tagService.GetAll();
    const data = {
        success: true,
        data: tags,
        time: new Date().toISOString()
    }
    return c.json(data);
});

app.get("/:id", async (c:Context) => {
    const id = c.req.param("id");
    const tag = await tagService.GetById(id);
    const data = {
        success: true,
        data: tag,
        time: new Date().toISOString()
    }   
    return c.json(data);
});

app.post("/", async (c:Context) => {
    const tag = await c.req.json();
    const newTag = await tagService.Add(tag);
    const data = {
        success: true,
        data: newTag,
        time: new Date().toISOString()
    }
    return c.json(data);
});

app.put("/:id", async (c:Context) => {
    const id = c.req.param("id");
    const tag = await c.req.json();
    const updatedTag = await tagService.Update(id, tag);
    const data = {
        success: true,
        data: updatedTag,
        time: new Date().toISOString()
    }
    return c.json(data);
});

app.delete("/:id", async (c:Context) => {
    const id = c.req.param("id");
    const deletedTag = await tagService.Delete(id);
    const data = {
        success: true,
        data: deletedTag,
        time: new Date().toISOString()
    }
    return c.json(data);
});

export default app