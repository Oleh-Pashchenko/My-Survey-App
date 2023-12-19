import { Request, Response } from 'express';
export declare const createSurvey: (req: Request, res: Response) => Promise<void>;
export declare const getSurveys: (req: Request, res: Response) => Promise<void>;
export declare const getSurvey: (req: Request, res: Response) => Promise<void>;
export declare const getSurveyResults: (req: Request, res: Response) => Promise<void>;
