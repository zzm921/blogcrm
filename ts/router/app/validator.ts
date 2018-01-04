
//验证uuid
const uuid = {
    isUUID: {
        errmsg: "uuid wrong！",
        param: 1
    }
}



const password = {
    isLength: {
        errmsg: "password length wrong！",
        param: [1, 64]
    }
}
const email = {
    isLength: {
        errmsg: "email wrong!",
        param: [0, 32]
    }
}

const username = {
    isLength: {
        errmsg: "username wrong!",
        param: [2, 20]
    }
}



const start = {
    isInt: {
        errmsg: "start wrong",
        param: { min: 0 }
    }
}
const length = {
    isInt: {
        errmsg: "length wrong",
        param: { min: 0 }
    }
}

const title = {
    isLength: {
        errmsg: "title length wrong",
        param: [1, 1024]
    }
}
const remarks = {
    isLength: {
        errmsg: "remark length wrong",
        param: [1, 1024]
    }
}
const type = {
    isIn: {
        errmsg: "type wrong",
        param: [["private", "public"]]
    }
}

const source = {
    isIn: {
        errmsg: "source wrong",
        param: [["user", "device"]]
    }
}



export const commonValidator = {
    UUID: {
        uuid: uuid
    },
    findall: {
        start: start,
        length: length
    }
}

export const userValidator = {
    login: {
        email: email,
        password: password
    },
    updateUsername: {
        uuid: uuid,
        username: username
    }, updatePassword: {
        uuid: uuid,
        oldpassword: password,
        newpassword: password
    }

}

export const tasksValidator = {
    task: {
        title: title,
        remarks: remarks,
        type: type
    }
}

export const messagesValidator = {
    message: {
        sourceuuid: uuid,
        source: source
    }
}
