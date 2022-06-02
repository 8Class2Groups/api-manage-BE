// This file is created by egg-ts-helper@1.30.3
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportApiClass from '../../../app/controller/apiClass';
import ExportEmail from '../../../app/controller/email';
import ExportItem from '../../../app/controller/item';
import ExportUser from '../../../app/controller/user';
import ExportWorkspace from '../../../app/controller/workspace';

declare module 'egg' {
  interface IController {
    apiClass: ExportApiClass;
    email: ExportEmail;
    item: ExportItem;
    user: ExportUser;
    workspace: ExportWorkspace;
  }
}
