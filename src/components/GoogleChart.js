import React from 'react';

import Loader from '../lib/GoogleChartsLoader';

export default React.createClass({
	handleResize() {
		if(this.resizeTimer) clearTimeout(this.resizeTimer);
	    this.resizeTimer = setTimeout(this.drawChart, 100);
	},
	hasData() {
		return (this.props.data && this.props.data.length);
	},
	drawChart() {
		if(!this.hasData() || !this.google) return;

		var chart = null;
		var node = React.findDOMNode(this.refs.chart);
		var charts = this.google.visualization;

		switch(this.props.type) {
			// Bar package
			case 'material-bar':
				chart = new google.charts.Bar(node);
				break;

			// Core charts package
			case 'area':
				chart = new charts.AreaChart(node);
				break;
			case 'bar':
				chart = new charts.BarChart(node);
				break;
			case 'bubble':
				chart = new charts.BubbleChart(node);
				break;
			case 'candlestick':
				chart = new charts.CandlestickChart(node);
				break;
			case 'column':
				chart = new charts.ColumnChart(node);
				break;
			case 'combo':
				chart = new charts.ComboChart(node);
				break;
			case 'geo':
				chart = new charts.GeoChart(node);
				break;
			case 'histogram':
				chart = new charts.Histogram(node);
				break;
			case 'line':
				chart = new charts.LineChart(node);
				break;
			case 'pie':
				chart = new charts.PieChart(node);
				break;
			case 'scatter':
				chart = new charts.ScatterChart(node);
				break;
			case 'sparkline':
				chart = new charts.SparklineChart(node);
				break;
			case 'stepped-area':
				chart = new charts.SteppedAreaChart(node);
				break;
		}

		chart.draw(charts.arrayToDataTable(this.props.data), this.props.options);
	},
	shouldComponentUpdate(nextProps, nextState) {
		return nextProps.data.length !== this.props.data.length;
	},
	componentDidUpdate() {
		this.drawChart();
	},
	componentDidMount() {
		Loader.load().then((google) => {
			this.google = google;
			this.drawChart();
		}, (err) => {
			console.log(err);
		});
		window.addEventListener('resize', this.handleResize);
	},
	componentWillUnmount() {
		window.removeEventListener('resize', this.handleResize);
	},
	render() {
		if(this.hasData()) {
			return(<div ref="chart"></div>);
		} else {
			return(<div className="alert alert-danger">No Data</div>);
		}
	}
});
