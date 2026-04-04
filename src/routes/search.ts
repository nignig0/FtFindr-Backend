import { Router } from "express"
import { upload } from "../middleware/upload";
import { SearchController } from "../controllers/search";
import { verifyToken } from "../middleware/auth";
export const SearchRoutes = Router();

SearchRoutes.post('/', upload.single('file'), verifyToken, SearchController.searchForVisuallySimilarImages);
SearchRoutes.get('/webpages',verifyToken,  SearchController.getWebPages);
