
//数据库
export const mysqlOpt = {
    database: "blog",
    username: "root",
    password: "824781",
    options: {
        dialect: "mysql",
        host: "117.48.199.146",
        port: 3306,
        timezone: "+8:00",
        pool: {
            maxConnections: 5,
            minConnections: 0,
            maxIdleTime: 100000
        }
    }
}
