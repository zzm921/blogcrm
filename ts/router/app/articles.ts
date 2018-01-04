
import { RouterWrap } from "../../lib/routerwrap"
import { BaseHandler } from "../lib/basehandler"
import { ArticlesDb } from "../../model/blog/articles"
export const router = new RouterWrap({ prefix: "/article" })



export class Article extends BaseHandler {
    public static async addArticle(body: any): Promise<any> {
        let { title, description, tag, author, status, content } = body
        //将文章插入数据库
        let obj = { title, content, author, description, tag, status }
        let article = ArticlesDb.getInstance().insertArticles(obj)
        return article
    }


    public static async getArticle(args: any): Promise<any> {
        let { uuid } = args
        let res = await ArticlesDb.getInstance().getArticleByUuid(uuid)
        return res
    }
    public static async getArticleList(query: any): Promise<any> {
        let { tagid } = query
        let obj = {
            'order': "modified DESC", where: {}
        }
        if (tagid) {
            obj.where = { tagid }
        }
        let res = await ArticlesDb.getInstance().findAll(obj)
        return res
    }
    public static async updateArticle(params: any, body: any): Promise<any> {
        let { uuid } = params
        let { title, text } = body
        //将文章插入数据库
        let obj = { title, body: text }
        let article = ArticlesDb.getInstance().updateArticles(uuid, obj)
        return article
    }
}

/**
 * 1、增加文章
 */
router.handle("post", "/", async (ctx, next) =>
    BaseHandler.handlerResult(ctx, await Article.addArticle((ctx.request as any).body)))
/**
 * 修改文章
 */
router.handle("put", "/:uuid", async (ctx, next) =>
    BaseHandler.handlerResult(ctx, await Article.updateArticle(ctx.params, (ctx.request as any).body)))
/**
 * 显示文章列表
 */
router.handle("get", "/", async (ctx, next) =>
    BaseHandler.handlerResult(ctx, await Article.getArticleList(ctx.request.query)))
/**
 * 显示文章
 */
router.handle("get", "/:uuid", async (ctx, next) =>
    BaseHandler.handlerResult(ctx, await Article.getArticle(ctx.params)))

