import express from 'express';

import { validateMiddlewire } from '../../utils/validateRequest';
import { AdminController } from './admin.controller';
import { AdminValidation } from './admin.validation';


const router = express.Router();

router.get('/', AdminController.allAdmin)
router.get('/:adminId', AdminController.getSingleAdmin)
router.patch('/:adminId', validateMiddlewire(AdminValidation.updateAdminValidationSchema) , AdminController.updateAdmin)
router.delete('/:adminId', AdminController.deleteAdmin)

export const AdminRoutes = router;
