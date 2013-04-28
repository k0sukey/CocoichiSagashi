exports.definition = {
    config: {
        adapter: {
            type: "sql",
            db_file: "/cocoichi.sqlite",
            collection_name: "shop"
        }
    }
};

var Alloy = require("alloy"), _ = require("alloy/underscore")._, model, collection;

model = Alloy.M("shops", exports.definition, []);

collection = Alloy.C("shops", exports.definition, model);

exports.Model = model;

exports.Collection = collection;