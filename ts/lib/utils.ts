import { createHash, randomBytes } from "crypto"
import { ReqError } from "../lib/reqerror"
import fs = require("fs")
import * as path from "path"

const mv = require('mv')
// import * as child_process from "child_process"

export function checkPassword(real: string, current: string): void {
    let [a, b] = [real.length === 32 ? real : md5sum(real), current.length === 32 ? current : md5sum(current)]
    if (a !== b)
        throw new ReqError("密码不正确！", 400)
}

export function randomInt(from: number, to: number) {
    return Math.floor(Math.random() * (to - from) + from)
}

export function md5sum(str: string): string {
    return createHash('md5').update(str).digest("hex")
}

export function getSalt(): string {
    return randomBytes(16).toString('base64');
}

export function sleepAsync(ms: number): Promise<void> {
    return new Promise<void>(resolve => setTimeout(() => resolve(), ms))
}

export function getPageCount(page: string, count?: string) {
    let limit = parseInt(count)
    let cursor = 0
    if (page) {
        cursor = parseInt(page) * parseInt(count)
    }
    return { cursor, limit }
}

export function checkCursorLimit(cursor: number, limit: number) {
    if (cursor > -1 && limit > 0)
        return false
    return true
}

export async function checkreq(param: Array<any>, sign: string, next: any) {
    param.sort()
    let s = param.join(",")
    if (sign === md5sum(s)) {
        return next()
    }
    return "参数错误!"
}



export function getSign(order: any, key: string) {
    delete order.sign
    let arr = new Array<any>()
    for (let k in order) {
        arr.push(`${k}=${order[k]}`)
    }
    arr.sort()
    arr.push(`key=${key}`)
    return md5sum(arr.join("&")).toUpperCase()
}
export function numcheckundefined(num: any) {
    if (num == undefined) num = 0
    return num
}
export function strcheckundefined(str: any) {
    if (str == undefined) str = ''
    return str
}
export function getRendomQuestions(num: number, arr: any[]) {
    let indexarr: number[], resarr: any[]
    if (num < arr.length) {
        while (indexarr.length < num) {     //取num个小于arr.length的不重复随机数字
            let i = Math.round(Math.random() * (arr.length - 1))
            for (let j = 0; j < indexarr.length; j++) {
                if (i == indexarr[j]) break
                else if (j == indexarr.length - 1) indexarr.push(i)
            }
        }
        for (let i = 0; i < num; i++) {    //根据获取的随机送取得arr中的数据
            if (i >= arr.length) break
            resarr.push(arr[indexarr[i]])
        }
    } else {
        resarr = arr
    }
    return resarr
}

export function getLog(): Promise<any> {
    return new Promise(resolve => {
        let logpath = path.join(__dirname, "..", "..", "logs", "warn.log")
        console.log(logpath)
        fs.readFile(logpath, function (err, data) {
            resolve({ log: data ? data.toString() : "" })
        })
    })
}

export function md5(str: string): string {
    return createHash('md5').update(str).digest("hex")
}

export function accessAsync(path: string, mode = fs.constants.F_OK) {
    return new Promise(resolve => fs.access(path, mode, err => {
        if (err)
            return resolve(false)
        return resolve(true)
    }))
}

export function mkdirAsync(path: string) {
    return new Promise((resolve, reject) => fs.mkdir(path, err => {
        if (err)
            return reject(err)
        return resolve()
    }))
}

export function moveAsync(oldPath: string, newPath: string) {
    return new Promise((resolve, reject) => mv(oldPath, newPath, function (err: any) {
        if (err) {
            return reject(err)
        }
        return resolve()
    }))
}

export function renameAsync(oldPath: string, newPath: string) {
    return new Promise((resolve, reject) => fs.rename(oldPath, newPath, err => {
        if (err) {
            return reject(err)
        }
        return resolve()
    }))
}

export function copyAsync(oldPath: string, newPath: string) {
    return new Promise((resolve, reject) => {
        try {
            let data = fs.readFileSync(oldPath)
            fs.writeFileSync(newPath, data)
            return resolve()
        } catch (error) {
            return reject(error)
        }

    })
}

export function removeAsync(path: string) {
    return new Promise(resolve => fs.unlink(path, err => resolve()))
}

export function removeDirAsync(path: string) {
    return new Promise(resolve => fs.rmdir(path, err => resolve()))
}

