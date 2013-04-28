var args = arguments[0] || {};

$.container.applyProperties({
	title: args.name
});

var rows = [];

_.each([
	{
		title: '営業時間',
		content: args.opening_hour
	},
	{
		title: '定休日',
		content: args.closed
	},
	{
		title: '住所',
		content: args.address
	},
	{
		title: '電話番号',
		content: args.tel
	},
	{
		title: '座席数',
		content: args.number_of_chair
	},
	{
		title: '駐車場数',
		content: args.number_of_parking
	},
	{
		title: '取り扱い',
		content: args.flag
	},
	{
		title: '備考',
		content: args.etc
	}
], function(_item){
	var row = Alloy.createController('row', _item);
	rows.push(row.getView());
});

$.table.setData(rows);