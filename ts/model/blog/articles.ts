import { DataTypes, Sequelize } from "sequelize"
import { ModelBase } from "../lib/modelbase"

const [table] = ["articles"]
const modelName = `${table}`
export const defineFunction = function (sequelize: Sequelize) {
    ArticlesDb.getInstance(sequelize)
    return sequelize.define(modelName, {
        uuid: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4, },
        title: DataTypes.CHAR(32),
        author: DataTypes.CHAR(32),
        content: DataTypes.TEXT,
        description: DataTypes.TEXT,
        status: DataTypes.CHAR(10),
        tag: DataTypes.CHAR(20),
        head_image: DataTypes.CHAR(255),
        created: DataTypes.TIME,
        modified: DataTypes.TIME,
        originalviews: DataTypes.INTEGER,
        commentnum: DataTypes.INTEGER,
        clickgoodnum: DataTypes.INTEGER,
        tagid: DataTypes.INTEGER
    }, {
            timestamps: false,
            freezeTableName: true,
            tableName: table
        })
}

export class ArticlesDb extends ModelBase {
    private static instance: ArticlesDb
    private constructor(seqz: Sequelize, modelName: string) {
        super(seqz, modelName)
    }

    public static getInstance(seqz: Sequelize = undefined) {
        if (!ArticlesDb.instance)
            ArticlesDb.instance = new ArticlesDb(seqz, modelName)
        return ArticlesDb.instance
    }

    public async  insertArticles(obj: any): Promise<any> {
        let res = await this.model().create(obj, { returning: true })
        return res ? res.get() : undefined
    }

    public async getArticleByUuid(uuid: string): Promise<any> {
        let res = await this.model().findByPrimary(uuid)
        return res
    }

    public async findAll(obj: any): Promise<any> {
        let res = await this.model().findAll(obj)
        return res
    }

    public async  updateArticles(uuid: any, obj: any): Promise<any> {
        let [number, res] = await this.model().update(obj, { where: { uuid: uuid }, returning: true })
        return number > 0 ? res[0].get() : undefined
    }

}
