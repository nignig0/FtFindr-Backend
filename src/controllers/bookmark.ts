import { Request, Response } from "express";
import { BookmarkServices } from "../services/BookmarkService";
import { create } from "domain";

const getBookmarksByUser = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.id;
        const bookmarks = await BookmarkServices.getBookmarksByUser(userId!);
        res.status(200).send({
            message: 'Successfully retrieved bookmarks',
            data: bookmarks
        });
    } catch (error) {
        console.log('Error retrieving bookmarks -> ', error);
        res.status(500).send({
            message: 'Error retrieving bookmarks'
        });
    }
}

const createBookmark = async (req: Request, res: Response) => {
    try {
        const { historyId } = req.body;
        if (!historyId) {
            res.status(400).send({
                message: 'History Id is required!'
            });
            return;
        }

        const userId = req.user?.id;
        const addBookmarkObj = {
            uid: userId,
            hid: historyId,
            savedAt: new Date()
        }

        await BookmarkServices.addBookmark(addBookmarkObj);
        res.status(200).send({
            message: 'Successfully added to bookmarks!'
        });

    } catch (error) {
        console.log('Error creating bookmark -> ', error);
        res.status(500).send({
            message: 'Error creating bookmark'
        });
    }
}

const deleteBookmark = async (req: Request, res: Response) => {
    try {
        const { bookmarkId } = req.params;

        await BookmarkServices.deleteBookmark(bookmarkId);
        res.status(200).send({
            message: 'Successfully deleted bookmark!'
        });

    } catch (error) {
        console.log('Error creating bookmark -> ', error);
        res.status(500).send({
            message: 'Error creating bookmark'
        });
    }
}

export const BookmarkController = {
    getBookmarksByUser, 
    createBookmark, 
    deleteBookmark
}