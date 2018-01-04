import utils = require("./utils")
const Path = require("path")
const fs = require('fs')


export function getFormInfo(ctx: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
        let body = (ctx.req as any).body
        let req = ctx.req as any
        let data = {} as any

        let file = req.file
        let filename = file.originalname

        data.uuid = body.uuid
        if (body.url) {
            data.url = body.url
        } else {
            data.url = null
        }

        let type = filename.substring(filename.lastIndexOf("."))        //扩展名

        let old_path = file.path

        let code = Math.round(Math.random() * 9000 + 1000) + ""
        let time = new Date().getTime().toString()
        let newname = time + code

        let tempDir = Path.join(__dirname, '../../public/temp/')
        let new_path = tempDir + newname + type

        await utils.renameAsync(old_path, new_path)

        data.media_tmp_path = new_path
        data.now_name = newname
        data.now_ext = type

        return resolve(data)

    })
}

export async function makePathOfPic(data: any): Promise<any> {

    //文件上传文件夹
    let media_now_dir = ""
    let media_now_path = ""
    let media_access_path = ""
    //判断修改媒体的广告是否在线上

    /**1.0 */
    // media_now_dir = Path.join(__dirname, '../../public/upload')

    /**2.0 */
    let publicPath = '/data/images'
    // let publicPath = 'E:/public'
    if (!fs.existsSync(publicPath)) {
        console.log(publicPath + ' not exists.');
        return { "err": "public文件夹不存在" }
    }
    let blogpackagePath = publicPath + '/blog'
    if (! await utils.accessAsync(blogpackagePath))
        await utils.mkdirAsync(blogpackagePath)
    media_now_dir = blogpackagePath

    if (! await utils.accessAsync(media_now_dir))
        await utils.mkdirAsync(media_now_dir)
    //文件上传路径
    media_now_path = media_now_dir + "/" + data.now_name + data.now_ext
    media_access_path = "https://www.zhexia.net.cn/uploadimages/" + data.now_name + data.now_ext

    await utils.moveAsync(data.media_tmp_path, media_now_path)
    fs.exists(data.media_tmp_path, async function (exists: boolean) {
        if (!exists) {
            console.log(data.media_tmp_path + ' not exists.');
        } else {
            await utils.removeAsync(data.media_tmp_path)
        }
    })
    //删除以前的文件
    /**1.0 */
    // if (data.url) {
    //     let old_media_url = Path.join(__dirname, '../../public') + data.url
    //     fs.exists(old_media_url, async function (exists: boolean) {
    //         if (!exists) {
    //             console.log(old_media_url + ' not exists.');
    //         } else {
    //             await utils.removeAsync(old_media_url)
    //         }
    //     })
    // }

    /**2.0 */
    // if (data.url) {
    //     let old_media_url = '/data/ads/public' + data.url
    //     // let old_media_url = 'E:/public' + data.url
    //     fs.exists(old_media_url, async function (exists: boolean) {
    //         if (!exists) {
    //             console.log(old_media_url + ' not exists.');
    //         } else {
    //             await utils.removeAsync(old_media_url)
    //         }
    //     })
    // }

    return media_access_path
}

