import { Container } from "typedi";
import UserService from "../../services/users";
import { ObjectId } from "mongodb";
import UserMongoRepository from "../../repositories/user/Index";

/**
 * Attach user to req.user
 * @param {*} req Express req Object
 * @param {*} res  Express res Object
 * @param {*} next  Express next Function
 */
const attachCurrentUser = async (req, res, next) => {
  try {
    const userServiceInstance = new UserService(new UserMongoRepository());
    const userRecord = await userServiceInstance.findOne({
      _id: new ObjectId(req.auth.id).toHexString(),
    });
    if (!userRecord) {
      return res.sendStatus(401);
    }
    const currentUser = userRecord;
    Reflect.deleteProperty(currentUser, "password");
    Reflect.deleteProperty(currentUser, "salt");
    req.currentUser = currentUser;
    req.currentUser.os = req.auth.os;
    return next();
  } catch (e) {
    console.log(" Error attaching user to req");
    console.log(e);
    return next(e);
  }
};

export default attachCurrentUser;
