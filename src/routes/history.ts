import { Router } from "express";
import { HistoryController } from "../controllers/history";
import { verifyToken } from "../middleware/auth";

export const HistoryRouter = Router();

HistoryRouter.get('/', verifyToken, HistoryController.getHistoryByUser);
HistoryRouter.delete('/clear', verifyToken, HistoryController.clearHistory);
HistoryRouter.delete('/:historyId', verifyToken, HistoryController.deleteHistoryItem);
