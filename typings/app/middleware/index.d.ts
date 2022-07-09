// This file is created by egg-ts-helper@1.30.3
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportEmailCodeCheck from '../../../app/middleware/emailCodeCheck';
import ExportTokenHandler from '../../../app/middleware/tokenHandler';
import ExportValidate from '../../../app/middleware/validate';

declare module 'egg' {
  interface IMiddleware {
    emailCodeCheck: typeof ExportEmailCodeCheck;
    tokenHandler: typeof ExportTokenHandler;
    validate: typeof ExportValidate;
  }
}
