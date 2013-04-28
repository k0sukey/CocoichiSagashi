var args = arguments[0] || {};

function round(num, point) {
	if (isNaN(num) && isNaN(point)) {
		return NaN;
	}
	if (!point) {
		return Math.round(num);
	}
	var place = Number('1e+' + Math.abs(point));
	if (point > 0) {
		num = Math.round(Math.floor((num / place) * 10) / 10) * place;
	} else if (point < 0) {
		num = Math.round(num * place) / place;
	}
	return num;
}

function distance(crrLat, crrLng, shpLat, shpLng) {
	var A = 6378137;
	var RAD = Math.PI / 180;

	if (crrLat === null || crrLng === null) {
		return "";
	}

	var lat1 = crrLat * RAD;
	var lng1 = crrLng * RAD;
	var lat2 = shpLat * RAD;
	var lng2 = shpLng * RAD;

	var lat_c = (lat1 + lat2) / 2;
	var dx = A * (lng2 - lng1) * Math.cos(lat_c);
	var dy = A * (lat2 - lat1);

	var retM = Math.round(Math.sqrt(dx * dx + dy * dy));

	if (retM < 1000) {
		return '現在地からおおよそ' + round(retM, 1) + 'm';
	} else if (retM < 10000) {
		return '現在地からおおよそ' + round(retM / 1000, -1) + 'km';
	} else {
		return '現在地からおおよそ' + round(retM / 1000) + 'km';
	}
}

$.container.applyProperties({
	latitude: args.lat,
	longitude: args.lng,
	title: args.name,
	subtitle: distance(args.crrLat, args.crrLng, args.lat, args.lng),
	animate: true,
	_shop: args
});