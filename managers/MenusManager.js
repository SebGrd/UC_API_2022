const Database = require('../database');

const SCHEMA = {
    title: String,
    chef: String, // I could have created a relation with the chef model, but I was running out of time
    starter: String,
    plate: String,
    dessert: String,
}

class PrivateMenusModel {
    constructor() {
        const schema = Database.getInstance().mongoose.Schema(SCHEMA);
        this.model = Database.getInstance().mongoose.model('Menu', schema);
    }
}


class MongooseModel {
    constructor() {
        throw new Error('Use Database.getInstance()');
    }
    static getInstance() {
        if (!MongooseModel.menusModel) {
            MongooseModel.menusModel = new PrivateMenusModel();
        }
        return MongooseModel.menusModel;
    }
}

class MenusManager {
    /**
     * @constructor Menu
     * @param {Object} menu
     * @param {string} menu.title
     * @param {string} menu.chef
     * @param {string} menu.starter
     * @param {string} menu.plate
     * @param {string} menu.dessert
     */
    constructor(menu = {}) {
        this.model = MongooseModel.getInstance().model;
        this.menu = new this.model(menu);
    }

    async save() {
        return this.menu.save();
    }

    async getMenus() {
        return this.model.find().sort({title: 'ASC'});
    }
}

module.exports.MenusManager = MenusManager;