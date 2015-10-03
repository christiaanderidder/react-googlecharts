import React from 'react';
import GoogleChart from '../src/components/GoogleChart';

var data = [
	['City', '2010 Population', '2000 Population'],
	['New York City, NY', 8175000, 8008000],
	['Los Angeles, CA', 3792000, 3694000],
	['Chicago, IL', 2695000, 2896000],
	['Houston, TX', 2099000, 1953000],
	['Philadelphia, PA', 1526000, 1517000]
];

var options = {
	chart: {
		title: 'Population of Largest U.S. Cities',
		subtitle: 'Based on most recent and previous census data'
	},
	hAxis: {
		title: 'Total Population',
		minValue: 0,
	},
	vAxis: {
		title: 'City'
	},
	bars: 'horizontal'
};

React.render(<GoogleChart type="column" data={data} options={options} />, document.getElementById('main'));