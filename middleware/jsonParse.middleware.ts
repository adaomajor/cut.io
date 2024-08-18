import Express, {Request, Response, NextFunction} from 'express'

const JsonParse = (err: SyntaxError, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof SyntaxError && 'body' in err) {
        return res.status(400).json({ message: "Bad request, invalid JSON." });
    }
    next();
}

export default JsonParse
