var args = arguments[0] || {};

$.title.applyProperties({
	text: args.title
});

$.content.applyProperties({
	font: {
		fontSize: args.title === '取り扱い' ? 12 : 14,
		fontWeight: 'bold'
	},
	text: args.content
});