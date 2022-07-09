// This file is created by egg-ts-helper@1.30.3
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportEmailCodeCheck from '../../../app/middleware/emailCodeCheck';
import ExportTokenHandler from '../../../app/middleware/tokenHandler';

declare module 'egg' {
  interface IMiddleware {
    emailCodeCheck: typeof ExportEmailCodeCheck;
    tokenHandler: typeof ExportTokenHandler;
  }
}
