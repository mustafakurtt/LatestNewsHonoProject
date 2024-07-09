import { Hono,Context } from "hono";
import NewsManager from "../../business/concrete/NewsManager";

const newsService = new NewsManager();
const app = new Hono();

app.get("/", async (c:Context) => {
    console.log(`newsRoute.ts: app.get("/")`);
    
    const news = await newsService.GetAll();
    const data = {
        success: true,
        data: news,
        time: new Date().toISOString()
    }
    return c.json(data);
});

app.get("/:id", async (c:Context) => {
    const id = c.req.param("id");
    const news = await newsService.GetById(id);
    const data = {
        success: true,
        data: news,
        time: new Date().toISOString()
    }   
    return c.json(data);
});

app.post("/", async (c:Context) => {
    const news = await c.req.json();
    const newNews = await newsService.Add(news);
    const data = {
        success: true,
        data: newNews,
        time: new Date().toISOString()
    }
    return c.json(data);
});

app.put("/:id", async (c:Context) => {
    const id = c.req.param("id");
    const news = await c.req.json();
    const updatedNews = await newsService.Update(id, news);
    const data = {
        success: true,
        data: updatedNews,
        time: new Date().toISOString()
    }
    return c.json(data);
});

app.delete("/:id", async (c:Context) => {
    const id = c.req.param("id");
    const deletedNews = await newsService.Delete(id);
    const data = {
        success: true,
        data: deletedNews,
        time: new Date().toISOString()
    }
    return c.json(data);
});

export default app
