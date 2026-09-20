import type { Request, Response, NextFunction } from "express";

export const paginationMiddleware = (
  req: Request,
  _res: Response,
  next: NextFunction,
): void => {
  const page = req.query.page === undefined ? 1 : Number(req.query.page);

  const limit = req.query.limit === undefined ? 10 : Number(req.query.limit);

  req.pagination = {
    page,
    limit,
  };

  next();
};
