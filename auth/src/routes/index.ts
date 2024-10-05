import { Router } from "express";
import * as controller from "../controllers";

const routes = Router();

routes.post('/sign-in', controller.signInController)
routes.post('/sign-up', controller.signUpController)
routes.post('/sign-out', controller.signOutController)
routes.get('/user-details', controller.userDetailsController)


export default routes