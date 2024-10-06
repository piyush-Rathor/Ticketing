import { Router } from "express";
import * as controller from "../controllers";
import { UserDTO } from "../utils/validations/sign-in";
import { validateDto } from "../middlewares/validation.middleware";

const routes = Router();

routes.post('/sign-in', validateDto(UserDTO), controller.signInController)
routes.post('/sign-up', controller.signUpController)
routes.post('/sign-out', controller.signOutController)
routes.get('/user-details', controller.userDetailsController)


export default routes