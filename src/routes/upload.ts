import { Router, Request, Response } from 'express';
import "dotenv";
import { returnErrorResponse, returnResponse } from '../utils/requestUtils';
import { uploadFileFormidable, uploadFileAndResponseFormidable } from '../controllers/upload.controller';

const router = Router();

/*router.post('/', (req: Request, res: Response) => {
  const file = req.file
  if (!file) {
    //const error = new Error("file está vacío") 
    const error = {error: "file está vacío"}
    //next(error)
    returnErrorResponse(res, 'Error al subir archivo', error)
  }
  res.json({filename: file.filename})
  
});*/

router.post('/formidable', uploadFileFormidable , (req: Request, res: Response) => {
  const files = req
  if (!files) {
    const error = {error: "file está vacío"}
    returnErrorResponse(res, 'Error al subir archivo', error)
  }
  res.json({filename: files[0].filename})
});


export default router;