// This file is created by egg-ts-helper@1.30.3
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportApi from '../../../app/controller/api';
import ExportApiClass from '../../../app/controller/apiClass';
import ExportEmail from '../../../app/controller/email';
import ExportItem from '../../../app/controller/item';
import ExportUser from '../../../app/controller/user';
import ExportWorkspace from '../../../app/controller/workspace';

declare module 'egg' {
  interface IController {
    api: ExportApi;
    apiClass: ExportApiClass;
    email: ExportEmail;
    item: ExportItem;
    user: ExportUser;
    workspace: ExportWorkspace;
  }
}
