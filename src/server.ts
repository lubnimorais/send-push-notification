import 'dotenv/config'

import express, { Request, Response } from 'express';
import { apiFirebase } from './firebase';
import cors from 'cors';

const api = express();

api.use(cors());
api.use(express.json());

api.post('/firebase/notification', async (request: Request, response: Response) => {
  const {registration_token, message} = request.body;

  const notification_options = {
    priority: "high",
    timeToLive: 60 * 60 * 24
  };

  try {
    const res = await apiFirebase.messaging().sendToDevice(registration_token, message, notification_options)

    return response.status(201).json(res)
  } catch (err) {
    console.log("🚀 ~ file: server.ts ~ line 25 ~ api.post ~ err", err)
  }
})

api.listen(3333, () => {
  console.log("🚀 Server is listening!");
})