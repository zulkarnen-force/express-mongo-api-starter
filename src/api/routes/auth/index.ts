import { celebrate, Joi, Segments } from "celebrate";
import { NextFunction, Request, Response, Router } from "express";
import { Container } from "typedi";
import User from "../../../models/user/User";
import AuthService from "../../../services/auth";
import middlewares from "../../middlewares";
import UserMongoRepository from "../../../repositories/user/Index";

const route = Router();

// @TODO Make Routes like this
// export class AuthRoutes {
//   constructor(@Inject(AuthService) private authService: AuthService) {}
// }

let authService = new AuthService(new UserMongoRepository());

export default (app) => {
  app.use("/auth", route);

  route.post(
    "/register",
    celebrate({
      [Segments.BODY]: Joi.object().keys({
        name: Joi.string().alphanum().min(2).max(30).required(),
        email: Joi.string().required().email(),
        password: Joi.string()
          .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
          .required()
          .min(8),
        repeat_password: Joi.ref("password"),
        age: Joi.number().integer().required().min(18),
        about: Joi.string().min(2).max(30),
      }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const authServiceInstance = authService;
        const { user, token } = await authServiceInstance.SignUp(
          req.body as User
        );
        return res.json({ user, token }).status(201);
      } catch (e) {
        console.log(" error ", e);
        return next(e);
      }
    }
  );

  route.post(
    "/login",
    celebrate({
      body: Joi.object({
        email: Joi.string().trim().email().required(),
        password: Joi.string().min(8).max(30).required(),
      }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { email, password } = req.body;
        const authServiceInstance = authService;
        const { user, token } = await authServiceInstance.SignIn(
          email,
          password
        );
        return res.json({ user, token }).status(200);
      } catch (e) {
        console.log(" error ", e);
        return next(e);
      }
    }
  );

  route.post(
    "/logout",
    middlewares.isAuth,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        // @TODO AuthService.Logout(req.user) for doing some other stuffff
        return res.status(200).end();
      } catch (e) {
        console.log(" error ", e);
        return next(e);
      }
    }
  );
};
