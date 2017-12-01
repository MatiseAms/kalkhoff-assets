let convert = require('color-convert');

function _isnumber(n) {
	return !isNaN(parseFloat(n)) && isFinite(n);
}

module.exports = {
	_isnumber: function(n) {
		return !isNaN(parseFloat(n)) && isFinite(n);
	},
	/*
	 The function to generate grid based values
	*/
	_grid: function(data, v) {
		if (_isnumber(v)) {
			let grid = (100 / data.grid.columns);
			return grid * v + 'vw';
		} else {
			console.log(v, 'is not a number');
			return v;
		}
	},

	/*
	 Return colors from the colors
	*/
	_color: function(data, v) {
		let theColor;
		let searchColor = v;
		let transparency = 1;

		let vArray = v.split(',');
		if (vArray.length > 1) {
			searchColor = vArray[0];
			transparency = vArray[1];
		}
		//console.log(data.colors);
		Object.keys(data.colors).forEach(function(list) {
			data.colors[list].forEach(function(colorList) {
				Object.keys(colorList).map(function(value, key) {
					if (value.toLowerCase() === searchColor.toLowerCase()) {
						theColor = colorList[value];
						if (transparency < 1) {
							theColor = 'rgb(' + convert.hex.rgb(theColor.substring(1)).join(',') + ',' + transparency + ')';
						}
					}
				});
			});
		});
		return theColor;
	}
};
