$.index.open();

$.map.addEventListener('click', function(e){
	if (e.clicksource === 'rightButton' || e.clicksource === 'rightPane') {
		var shop = Alloy.createController('shop', e.annotation._shop);
		$.navgroup.open(shop.getView());
	}
});

var activity = Alloy.createController('activity');

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
	var northWestLatLimit = lat + latDelta * 2;
	var northWestLngLimit = lng - lngDelta * 2;
	var southEastLatLimit = lat - latDelta * 2;
	var southEastLngLimit = lng + lngDelta * 2;

	var shops = Alloy.createCollection('shops');
	shops.fetch({
		query: {
			statement: 'SELECT * FROM shop' +
				' WHERE ? <= lat AND ? <= lat' +
				' AND ? <= lng AND ? <= lng',
			params: [
				'' + lat - latDelta / 2,
				'' + lat + latDelta / 2,
				'' + lng - lngDelta / 2,
				'' + lng + lngDelta / 2
			]
		},
		success: function(collection, response, options){
			var annotations = [];

			collection.each(function(_item){
				if (southEastLatLimit > _item.get('latitude') ||
					_item.get('latitude') > northWestLatLimit ||
					northWestLngLimit > _item.get('longitude') ||
					_item.get('longitude') > southEastLngLimit) {
					return;
				}

				var _shop = {
					crrLat: latitude,
					crrLng: longitude
				};
				_.extend(_shop, {
					id: _item.get('id'),
					gnavi_id: _item.get('gnavi_id'),
					cocoichi_id: _item.get('cocoichi_id'),
					name: _item.get('name'),
					address: _item.get('address'),
					lat: _item.get('lat'),
					lng: _item.get('lng'),
					tel: _item.get('tel'),
					opening_hour: _item.get('opening_hour'),
					opening_hour_open: _item.get('opening_hour_open'),
					opening_hour_close: _item.get('opening_hour_close'),
					closed: _item.get('closed'),
					number_of_chair: _item.get('number_of_chair'),
					number_of_parking: _item.get('number_of_parking'),
					flag: _item.get('flag'),
					etc: _item.get('etc'),
					alloy_id: _item.get('alloy_id')
				});
				annotations.push(Alloy.createController('annotation', _shop).getView());
			});

			$.map.setAnnotations(annotations);
		},
		error: function(collection, response, options){
		}
	});
}

$.map.addEventListener('regionChanged', function(e){
	$.container.setRightNavButton(activity.getView());
	activity.getView().show();

	loadShop(e.latitude, e.longitude, e.latitudeDelta, e.longitudeDelta);

	activity.getView().hide();
	$.container.setRightNavButton($.gps);
});

$.gps.addEventListener('click', function(){
	if (Ti.Geolocation.locationServicesEnabled === false) {
		return;
	}

	$.container.setRightNavButton(activity.getView());
	activity.getView().show();

	Ti.Geolocation.getCurrentPosition(function(e){
		if (e.success) {
			var region = $.map.getRegion();
			loadShop(e.coords.latitude, e.coords.longitude, region.latitudeDelta, region.longitudeDelta);
		}

		activity.getView().hide();
		$.container.setRightNavButton($.gps);
	});
});

$.gps.fireEvent('click');