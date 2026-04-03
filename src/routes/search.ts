import { Router } from "express"
import { upload } from "../middleware/upload";
import { SearchController } from "../controllers/search";
export const SearchRoutes = Router();

SearchRoutes.post('/', upload.single('file'), SearchController.searchForVisuallySimilarImages);
SearchRoutes.get('/webpages', SearchController.getWebPages);
