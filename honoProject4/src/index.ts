import { Hono } from 'hono'
import newsRoute from './api/routes/newsRoute'
import categoryRoute from './api/routes/categoryRoute'
import tagRoute from './api/routes/tagRoute'

const app = new Hono()
    
app.route("/api/news",newsRoute)
app.route("/api/category",categoryRoute)
app.route("/api/tag",tagRoute)

export default app
