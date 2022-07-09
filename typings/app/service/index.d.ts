// This file is created by egg-ts-helper@1.30.3
// Do not modify this file!!!!!!!!!

import 'egg';
type AnyClass = new (...args: any[]) => any;
type AnyFunc<T = any> = (...args: any[]) => T;
type CanExportFunc = AnyFunc<Promise<any>> | AnyFunc<IterableIterator<any>>;
type AutoInstanceType<T, U = T extends CanExportFunc ? T : T extends AnyFunc ? ReturnType<T> : T> = U extends AnyClass ? InstanceType<U> : U;
import ExportApi from '../../../app/service/Api';
import ExportApiClass from '../../../app/service/ApiClass';
import ExportDbRedis from '../../../app/service/DbRedis';
import ExportEmail from '../../../app/service/Email';
import ExportItem from '../../../app/service/Item';
import ExportReq from '../../../app/service/Req';
import ExportRes from '../../../app/service/Res';
import ExportTest from '../../../app/service/Test';
import ExportUser from '../../../app/service/User';
import ExportWorkspace from '../../../app/service/Workspace';

declare module 'egg' {
  interface IService {
    api: AutoInstanceType<typeof ExportApi>;
    apiClass: AutoInstanceType<typeof ExportApiClass>;
    dbRedis: AutoInstanceType<typeof ExportDbRedis>;
    email: AutoInstanceType<typeof ExportEmail>;
    item: AutoInstanceType<typeof ExportItem>;
    req: AutoInstanceType<typeof ExportReq>;
    res: AutoInstanceType<typeof ExportRes>;
    test: AutoInstanceType<typeof ExportTest>;
    user: AutoInstanceType<typeof ExportUser>;
    workspace: AutoInstanceType<typeof ExportWorkspace>;
  }
}
