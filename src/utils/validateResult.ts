import { validationResult } from "express-validator";
import { StatusCodes } from "http-status-codes";
import { Request, Response, NextFunction } from "express";

export function validate(
    req: Request, 
    res: Response, 
    next: NextFunction
): void{
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        const msg = errors.array().map(error => error.msg);
        res.status(StatusCodes.BAD_REQUEST).json({
            error: true,
            message: msg[0]
        });
        return;
    }

    next();
}