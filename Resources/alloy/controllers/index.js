function Controller() {
    function loadShop(latitude, longitude, latitudeDelta, longitudeDelta) {
        $.map.applyProperties({
            region: {
                latitude: latitude,
                longitude: longitude,
                latitudeDelta: latitudeDelta,
                longitudeDelta: longitudeDelta
            },
            location: {
                latitude: latitude,
                longitude: longitude
            }
        });
        var lat = parseFloat(latitude, 10);
        var lng = parseFloat(longitude, 10);
        var latDelta = parseFloat(latitudeDelta, 10);
        var lngDelta = parseFloat(longitudeDelta, 10);
        var northWestLatLimit = lat + 2 * latDelta;
        var northWestLngLimit = lng - 2 * lngDelta;
        var southEastLatLimit = lat - 2 * latDelta;
        var southEastLngLimit = lng + 2 * lngDelta;
        var shops = Alloy.createCollection("shops");
        shops.fetch({
            query: {
                statement: "SELECT * FROM shop WHERE ? <= lat AND ? <= lat AND ? <= lng AND ? <= lng",
                params: [ "" + lat - latDelta / 2, "" + lat + latDelta / 2, "" + lng - lngDelta / 2, "" + lng + lngDelta / 2 ]
            },
            success: function(collection) {
                var annotations = [];
                collection.each(function(_item) {
                    if (southEastLatLimit > _item.get("latitude") || _item.get("latitude") > northWestLatLimit || northWestLngLimit > _item.get("longitude") || _item.get("longitude") > southEastLngLimit) return;
                    var _shop = {
                        crrLat: latitude,
                        crrLng: longitude
                    };
                    _.extend(_shop, {
                        id: _item.get("id"),
                        gnavi_id: _item.get("gnavi_id"),
                        cocoichi_id: _item.get("cocoichi_id"),
                        name: _item.get("name"),
                        address: _item.get("address"),
                        lat: _item.get("lat"),
                        lng: _item.get("lng"),
                        tel: _item.get("tel"),
                        opening_hour: _item.get("opening_hour"),
                        opening_hour_open: _item.get("opening_hour_open"),
                        opening_hour_close: _item.get("opening_hour_close"),
                        closed: _item.get("closed"),
                        number_of_chair: _item.get("number_of_chair"),
                        number_of_parking: _item.get("number_of_parking"),
                        flag: _item.get("flag"),
                        etc: _item.get("etc"),
                        alloy_id: _item.get("alloy_id")
                    });
                    annotations.push(Alloy.createController("annotation", _shop).getView());
                });
                $.map.setAnnotations(annotations);
            },
            error: function() {}
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    $.__views.index = Ti.UI.createWindow({
        id: "index"
    });
    $.__views.index && $.addTopLevelView($.__views.index);
    $.__views.container = Ti.UI.createWindow({
        backgroundColor: "#fff",
        barColor: "#6d2d1c",
        id: "container",
        title: "CoCo壱探し"
    });
    $.__views.gps = Ti.UI.createButton({
        image: "/images/location.png",
        style: Ti.UI.iPhone.SystemButtonStyle.BORDERED,
        id: "gps"
    });
    $.__views.container.rightNavButton = $.__views.gps;
    var __alloyId2 = [];
    $.__views.map = Ti.Map.createView({
        mapType: Ti.Map.STANDARD_TYPE,
        animate: true,
        region: {
            latitude: 35.269964,
            longitude: 136.83777,
            latitudeDelta: .005,
            longitudeDelta: .005
        },
        regionFit: true,
        userLocation: true,
        annotations: __alloyId2,
        ns: Ti.Map,
        id: "map"
    });
    $.__views.container.add($.__views.map);
    $.__views.navgroup = Ti.UI.iPhone.createNavigationGroup({
        window: $.__views.container,
        id: "navgroup"
    });
    $.__views.index.add($.__views.navgroup);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.index.open();
    $.map.addEventListener("click", function(e) {
        if ("rightButton" === e.clicksource || "rightPane" === e.clicksource) {
            var shop = Alloy.createController("shop", e.annotation._shop);
            $.navgroup.open(shop.getView());
        }
    });
    var activity = Alloy.createController("activity");
    $.map.addEventListener("regionChanged", function(e) {
        $.container.setRightNavButton(activity.getView());
        activity.getView().show();
        loadShop(e.latitude, e.longitude, e.latitudeDelta, e.longitudeDelta);
        activity.getView().hide();
        $.container.setRightNavButton($.gps);
    });
    $.gps.addEventListener("click", function() {
        if (false === Ti.Geolocation.locationServicesEnabled) return;
        $.container.setRightNavButton(activity.getView());
        activity.getView().show();
        Ti.Geolocation.getCurrentPosition(function(e) {
            if (e.success) {
                var region = $.map.getRegion();
                loadShop(e.coords.latitude, e.coords.longitude, region.latitudeDelta, region.longitudeDelta);
            }
            activity.getView().hide();
            $.container.setRightNavButton($.gps);
        });
    });
    $.gps.fireEvent("click");
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;