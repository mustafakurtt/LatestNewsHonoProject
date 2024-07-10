import { Hono } from 'hono'
import newsRoute from './api/routes/newsRoute'
import categoryRoute from './api/routes/categoryRoute'
import tagRoute from './api/routes/tagRoute'
import BusinessError from './utils/errors/BusinessError'
import DataResponse from './utils/responses/DataResponse'

const app = new Hono()
    
app.route("/api/news",newsRoute)
app.route("/api/category",categoryRoute)
app.route("/api/tag",tagRoute)
app.onError((err, c) => {
    if (err instanceof BusinessError) {
      const response = new DataResponse(false,err.message,err.data,err.code)
      return c.json(response,{status: err.code});
    }
    console.error(`${err}`);
    const response = new DataResponse(false, "Internal Server Error", null);
    return c.json(response, 500);
  });
export default app
