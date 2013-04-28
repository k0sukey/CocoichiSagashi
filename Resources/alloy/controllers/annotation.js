function Controller() {
    function round(num, point) {
        if (isNaN(num) && isNaN(point)) return 0/0;
        if (!point) return Math.round(num);
        var place = Number("1e+" + Math.abs(point));
        point > 0 ? num = Math.round(Math.floor(10 * (num / place)) / 10) * place : 0 > point && (num = Math.round(num * place) / place);
        return num;
    }
    function distance(crrLat, crrLng, shpLat, shpLng) {
        var A = 6378137;
        var RAD = Math.PI / 180;
        if (null === crrLat || null === crrLng) return "";
        var lat1 = crrLat * RAD;
        var lng1 = crrLng * RAD;
        var lat2 = shpLat * RAD;
        var lng2 = shpLng * RAD;
        var lat_c = (lat1 + lat2) / 2;
        var dx = A * (lng2 - lng1) * Math.cos(lat_c);
        var dy = A * (lat2 - lat1);
        var retM = Math.round(Math.sqrt(dx * dx + dy * dy));
        return 1e3 > retM ? "現在地からおおよそ" + round(retM, 1) + "m" : 1e4 > retM ? "現在地からおおよそ" + round(retM / 1e3, -1) + "km" : "現在地からおおよそ" + round(retM / 1e3) + "km";
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    $.__views.container = Ti.Map.createAnnotation({
        rightButton: Ti.UI.iPhone.SystemButton.DISCLOSURE,
        id: "container"
    });
    $.__views.container && $.addTopLevelView($.__views.container);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    $.container.applyProperties({
        latitude: args.lat,
        longitude: args.lng,
        title: args.name,
        subtitle: distance(args.crrLat, args.crrLng, args.lat, args.lng),
        animate: true,
        _shop: args
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;