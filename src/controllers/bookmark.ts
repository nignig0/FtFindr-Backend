import { Request, Response } from "express";
import { BookmarkServices } from "../services/BookmarkService";

const getBookmarksByUser = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.id;
        const bookmarks = await BookmarkServices.getBookmarksByUser(userId!);
        const bookmarksWithDetails = bookmarks.map((b: Record<string, any>) => {
            const h = b.history as Record<string, any>;
            return {
                bid: b.bid,
                savedat: b.savedat,
                imageurl: h?.imageurl,
                vendorurl: h?.vendorurl,
                domain: h?.vendorurl ? new URL(h.vendorurl).hostname.replace(/^www\./, '') : null
            };
        });
        res.status(200).send({
            message: 'Successfully retrieved bookmarks',
            data: bookmarksWithDetails
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
            savedat: new Date()
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

        const userId = req.user?.id;
        const bookmark = await BookmarkServices.getBookmarkById(bookmarkId);
        if(userId !== bookmark.uid){
            res.status(401).send({
                message: "Not authorised"
            });
            return;
        }
        
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