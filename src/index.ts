import express from "express";
import authMiddleware from "./app/middlewares/authenticateMiddleware";
import routes from "./routes";

const app = express();
const port = 3333;

app.use(express.json());
app.use(routes)

app.listen(port, () => console.log(`server running on ${port}`));