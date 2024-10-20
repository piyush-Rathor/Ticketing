import { Router } from 'express'
import * as controller from '../controllers'
import { UserSignupDTO } from '../utils/validations/sign-up'
import { UserSignInDTO } from '../utils/validations/sign-in'
import { validateDto } from '../middlewares/validation.middleware'
import { isValid } from '../middlewares/auth.middleware'

const routes = Router()

routes.post('/sign-in', validateDto<UserSignInDTO>(UserSignInDTO), controller.signInController)
routes.post('/sign-up', validateDto<UserSignupDTO>(UserSignupDTO), controller.signUpController)
routes.get('/user-details', isValid, controller.userDetailsController)

export default routes
