import { Request, Response, Router } from "express";
import middlewares from "../../middlewares";

const route = Router();

export default (app: Router) => {
  app.use("/users", route);

  route.get(
    "/me",
    middlewares.isAuth,
    middlewares.attachCurrentUser,
    async (req: any, res: any) => {
      return res.json({ user: req.currentUser }).status(200);
    }
  );
};
