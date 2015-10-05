import React from 'react';

import Loader from '../lib/GoogleChartsLoader';

export default React.createClass({
	getInitialState() {
		return { 
			chart: null
		};
	},
	handleResize() {
		if(this.resizeTimer) clearTimeout(this.resizeTimer);
	    this.resizeTimer = setTimeout(this.drawChart, 100);
	},
	hasData() {
		return (this.props.data && this.props.data.length);
	},
	createChart() {
		console.log(window.innerWidth);

		if(!this.hasData() || !this.google) return;

		var node = React.findDOMNode(this.refs.chart);
		var charts = this.google.visualization;
		var chart = null;
		switch(this.props.type) {
			// Material charts
			case 'material-bar':
			case 'material-column':
				chart = new google.charts.Bar(node);
				break;
			case 'material-line':
				chart = new google.charts.Line(node);
				break;
			case 'material-scatter':
				chart = new google.charts.Scatter(node);
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
		this.setState({
			chart: chart
		});
	},
	drawChart() {
		if(!this.hasData() || !this.google || !this.state.chart) return;

		var data = this.google.visualization.arrayToDataTable(this.props.data)

		var options = this.props.options;
		switch(this.props.type) {
			case 'material-line':
				options = this.google.charts.Line.convertOptions(options);
				break;
			case 'material-bar':
			case 'material-column':
				options = this.google.charts.Bar.convertOptions(options);
			case 'material-scatter':
				options = this.google.charts.Scatter.convertOptions(options);
		}

		this.state.chart.draw(data, options);
	},
	clearChart() {
		if(!this.hasData() || !this.google || !this.state.chart) return;

		this.state.chart.clearChart();
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
			this.createChart();
			this.drawChart();
		}, (err) => {
			console.log(err);
		});
		window.addEventListener('resize', this.handleResize);
	},
	componentWillUnmount() {
		window.removeEventListener('resize', this.handleResize);

		this.clearChart();
	},
	render() {
		if(this.hasData()) {
			return(<div ref="chart"></div>);
		} else {
			return(<div className="alert alert-danger">No Data</div>);
		}
	}
});
