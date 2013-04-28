function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    $.__views.container = Ti.UI.createWindow({
        backgroundColor: "f0e0bb",
        barColor: "#6d2d1c",
        id: "container",
        backButtonTitle: "戻る"
    });
    $.__views.container && $.addTopLevelView($.__views.container);
    $.__views.table = Ti.UI.createTableView({
        backgroundColor: "transparent",
        style: Ti.UI.iPhone.TableViewStyle.GROUPED,
        selectionStyle: Ti.UI.iPhone.TableViewCellSelectionStyle.NONE,
        touchEnabled: false,
        id: "table"
    });
    $.__views.container.add($.__views.table);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    $.container.applyProperties({
        title: args.name
    });
    var rows = [];
    _.each([ {
        title: "営業時間",
        content: args.opening_hour
    }, {
        title: "定休日",
        content: args.closed
    }, {
        title: "住所",
        content: args.address
    }, {
        title: "電話番号",
        content: args.tel
    }, {
        title: "座席数",
        content: args.number_of_chair
    }, {
        title: "駐車場数",
        content: args.number_of_parking
    }, {
        title: "取り扱い",
        content: args.flag
    }, {
        title: "備考",
        content: args.etc
    } ], function(_item) {
        var row = Alloy.createController("row", _item);
        rows.push(row.getView());
    });
    $.table.setData(rows);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;