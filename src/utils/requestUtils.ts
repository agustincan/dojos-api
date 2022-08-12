import { Response } from "express";

export const returnResponse = (res: Response, aText: string, obj = null) => {
  const msg = {
    code: 200,
    message : aText,
    obj
  }
  return res.json(msg);
}

export const returnErrorResponse = (res: Response, aText = 'error', obj = null) => {
  const msg = {
    code: 400,
    message : aText,
    obj
  }
  return res.status(400).json(msg);
}