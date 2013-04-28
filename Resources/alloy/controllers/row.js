function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    $.__views.row = Ti.UI.createTableViewRow({
        height: Ti.UI.FILL,
        backgroundColor: "#fff",
        layout: "horizontal",
        id: "row"
    });
    $.__views.row && $.addTopLevelView($.__views.row);
    $.__views.title = Ti.UI.createLabel({
        top: 10,
        right: 5,
        bottom: 10,
        left: 5,
        width: 70,
        height: Ti.UI.SIZE,
        textAlign: "right",
        color: "#95665a",
        font: {
            fontSize: 12
        },
        id: "title"
    });
    $.__views.row.add($.__views.title);
    $.__views.content = Ti.UI.createLabel({
        top: 10,
        right: 5,
        bottom: 10,
        left: 5,
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#6d2d1c",
        id: "content"
    });
    $.__views.row.add($.__views.content);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    $.title.applyProperties({
        text: args.title
    });
    $.content.applyProperties({
        font: {
            fontSize: "取り扱い" === args.title ? 12 : 14,
            fontWeight: "bold"
        },
        text: args.content
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;