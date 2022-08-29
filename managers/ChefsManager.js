const Database = require('../database');

const SCHEMA = {
    firstname: String,
    lastname: String,
    description: String,
    imageUrl: String
}

class PrivateChefsModel {
    constructor() {
        const schema = Database.getInstance().mongoose.Schema(SCHEMA);
        this.model = Database.getInstance().mongoose.model('Chef', schema);
    }
}

/**
 * Chef model Singleton
 */
class MongooseModel {
    constructor() {
        throw new Error('Use Database.getInstance()');
    }
    static getInstance() {
        if (!MongooseModel.chefsModel) {
            MongooseModel.chefsModel = new PrivateChefsModel();
        }
        return MongooseModel.chefsModel;
    }
}

/**
 * Class chef
 * describe chef method with mongoose
 */
class ChefsManager {
    /**
     * @constructor Chef
     * @param {Object} chef
     * @param {string} chef.firstname
     * @param {string} chef.lastname
     * @param {string} chef.description
     * @param {string} chef.imageUrl
     */
    constructor(chef = {}) {
        this.model = MongooseModel.getInstance().model;
        this.chef = new this.model(chef);
    }

    async save() {
        return this.chef.save();
    }

    async delete(id) {
        return await this.model.deleteOne({_id: id});
    }

    async update(id, chef) {
        return await this.model.updateOne({_id: id}, chef);
    }

    async getChefs() {
        return this.model.find().sort({firstname: 'ASC'});
    }
}

module.exports.ChefsManager = ChefsManager;