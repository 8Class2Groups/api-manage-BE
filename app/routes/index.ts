import user from "./user";
import workspace from "./workspace";
import item from "./item";
import apiClass from "./apiClass";
import api from "./api";
import { Application } from "egg";

export default (app: Application) => {
  /**
   * @desc 用户相关
   */
  user(app);

  /**
   * @desc 工作区相关
   */
  workspace(app);

  /**
   * @desc 项目相关
   */
  item(app);

  /**
   * @desc 接口分类相关
   */
  apiClass(app);

  /**
   * @desc 接口相关
   */
  api(app)
}