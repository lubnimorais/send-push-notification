import 'dotenv/config'

import express, { Request, Response } from 'express';
import { apiFirebase } from './firebase';
import cors from 'cors';
import schedule from 'node-schedule';

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

    return response.status(201).json(res);
  } catch (err) {
    console.log("🚀 ~ file: server.ts ~ line 26 ~ api.post ~ err", err)
  }
})

api.post('/firebase/schedule/notification', async (request: Request, response: Response) => {
  const {registration_token, message} = request.body;

  const notification_options = {
    priority: "high",
    timeToLive: 60 * 60 * 24
  };

  try {
    const date = new Date(2022, 5, 27, 20, 56);

    schedule.scheduleJob('schedule-notification', date, async () => {
      try {
        const res = await apiFirebase.messaging().sendToDevice(registration_token, message, notification_options)

        console.log(res.successCount);
      } catch (err) {
        console.log("🚀 ~ file: server.ts ~ line 28 ~ api.post ~ err", err)    
      }
    })

    // const res = await apiFirebase.messaging().sendToDevice(registration_token, message, notification_options)

    return response.status(201).send();
    // return response.status(201).json(res);
  } catch (err) {
    console.log("🚀 ~ file: server.ts ~ line 25 ~ api.post ~ err", err)
  }
})

api.post('/firebase/recurrence/notification', async (request: Request, response: Response) => {
  const {registration_token, message} = request.body;

  const notification_options = {
    priority: "high",
    timeToLive: 60 * 60 * 24
  };

  try {
    const rule = new schedule.RecurrenceRule();
    rule.hour = 21;
    rule.minute = 2

    schedule.scheduleJob('schedule-notification', rule, async () => {
      try {
        const res = await apiFirebase.messaging().sendToDevice(registration_token, message, notification_options)

        console.log(res.successCount);
      } catch (err) {
        console.log("🚀 ~ file: server.ts ~ line 28 ~ api.post ~ err", err)    
      }
    })

    // const res = await apiFirebase.messaging().sendToDevice(registration_token, message, notification_options)

    return response.status(201).send();
    // return response.status(201).json(res);
  } catch (err) {
    console.log("🚀 ~ file: server.ts ~ line 25 ~ api.post ~ err", err)
  }
})

api.listen(3334, () => {
  console.log("🚀 Server is listening!");
})