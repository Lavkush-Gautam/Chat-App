import express, { Router } from 'express'
import { LoginController, LogoutController, SignupController, updateProfileController } from '../controller/auth.controller.js'
import { checkAuth, protectRoute } from '../middleware/auth.middleware.js'

const router = Router()

router.post('/signup', SignupController)

router.post('/login', LoginController)

router.post('/logout', LogoutController)

router.put('/update-profile', protectRoute, updateProfileController)

router.get('/check', protectRoute, checkAuth)



export default router