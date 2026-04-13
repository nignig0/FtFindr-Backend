import { Request, Response } from "express";
import { HistoryService } from "../services/HistoryService";

const getHistoryByUser = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.id;
        const history = await HistoryService.getHistoryByUser(userId!);
        const historyWithTitles = history.map((item: Record<string, any>) => ({
            ...item,
            title: new URL(item.vendorurl).hostname.replace(/^www\./, '')
        }));

        res.status(200).send({
            message: "Successfully retrieved history",
            data: historyWithTitles
        });
    } catch (error) {
        console.log("Error retrieving history -> ", error);
        res.status(500).send({
            message: "Error retrieving history"
        });
    }
}

const deleteHistoryItem = async (req: Request, res: Response) => {
    try {
        const { historyId } = req.params;

        if (!historyId) {
            res.status(400).send({
                message: "History Id is required!"
            });
            return;
        }

        await HistoryService.deleteFromHistory(historyId);

        res.status(200).send({
            message: "Successfully deleted history item!"
        });
    } catch (error) {
        console.log("Error deleting history item -> ", error);
        res.status(500).send({
            message: "Error deleting history item"
        });
    }
}

const clearHistory = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.id;
        await HistoryService.clearHistoryByUser(userId!);

        res.status(200).send({
            message: "Successfully cleared history!"
        });
    } catch (error) {
        console.log("Error clearing history -> ", error);
        res.status(500).send({
            message: "Error clearing history"
        });
    }
}

export const HistoryController = {
    getHistoryByUser,
    deleteHistoryItem,
    clearHistory
}
