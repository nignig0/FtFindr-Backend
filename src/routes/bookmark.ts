import { Router } from "express";
import { verifyToken } from "../middleware/auth";
import { BookmarkController } from "../controllers/bookmark";

export const BookmarkRouter = Router();

BookmarkRouter.get('/', verifyToken, BookmarkController.getBookmarksByUser);
BookmarkRouter.post('/', verifyToken, BookmarkController.createBookmark);
BookmarkRouter.delete('/:bookmarkId', BookmarkController.deleteBookmark);
