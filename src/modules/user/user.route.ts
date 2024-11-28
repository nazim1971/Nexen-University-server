import express from 'express';

const router = express.Router();

router.post('/create-student', UserCollection.createStudent);

export const UserRoutes = router;