import {smsKey} from '../../keys/sms.js'
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const id = smsKey.ACCOUNT_SID;
const token = smsKey.AUTH_TOKEN;
export const sendSMS = require('twilio')(id, token)



