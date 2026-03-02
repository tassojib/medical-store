import express from 'express';
import { SellerController } from './seller.controller';
import auth from '../../middlewares/auth';
import { Role } from '../../../generated/prisma/enums';

const router = express.Router();
router.post('/medicine',auth(Role.SELLER) ,SellerController.createMedicine)
router.patch('/medicine/:id',auth(Role.SELLER) ,SellerController.updateMedicine)
export const SellerRoutes = router;
