import express, { type Express} from "express";
import type { Response, Request }  from "express";

const app: Express = express();

app.use(express.json());

app.get("/", (_req: Request, res: Response,) => {
    
    res.json({
        sucesso: true,
        mensagem: "Api funcionando!"
    })
})

export default app;
