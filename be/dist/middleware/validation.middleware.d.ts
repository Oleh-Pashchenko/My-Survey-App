import { NextFunction, Request, Response } from 'express';
export declare const ValidationMiddleware: (type: any, skipMissingProperties?: boolean, whitelist?: boolean, forbidNonWhitelisted?: boolean) => (req: Request, res: Response, next: NextFunction) => void;
