import { Request, Response } from 'express';
export declare const getUserResponsesBySurvey: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const submitResponse: (req: Request, res: Response) => Promise<void>;
export declare const getUserResponsesByUserId: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
