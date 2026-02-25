import express, { Application, Request, Response } from "express";
import cors from "cors";
import globalErrorHandler from "./middlewares/globalErrorHandler";
import router from "./routes";

const app: Application = express();

// Middleware parsers
app.use(express.json());
app.use(cors());

// Application routes
app.use("/api/v1", router);

// Test root route
app.get("/", (req: Request, res: Response) => {
  res.send("Hello from Medistore!");
});

// Global error handler
app.use(globalErrorHandler);

export default app;
