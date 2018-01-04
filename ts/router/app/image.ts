
import { RouterWrap } from "../../lib/routerwrap"
import { BaseHandler } from "../lib/basehandler"
import { getFormInfo, makePathOfPic } from "../../lib/upload"
export const router = new RouterWrap({ prefix: "/image" })
// const captchapng = require("captchapng")


export class AppUser extends BaseHandler {
    //登录
    public static async login(ctx: any): Promise<any> {
        let data = await getFormInfo(ctx)
        let url = await makePathOfPic(data)
        return { success: 1, message: "", url }
    }

}

/**
 * 图片上传
 */
router.handle("post", "/upload", async (ctx, next) =>
    BaseHandler.handlerResult(ctx, await AppUser.login(ctx)))

