import React from 'react';
import GoogleChart from '../src/components/GoogleChart';

export default React.createClass({
	getInitialState() {
		return {
			data: [
				['City', '2010 Population', '2000 Population'],
				['New York City, NY', 8175000, 8008000],
				['Los Angeles, CA', 3792000, 3694000],
				['Chicago, IL', 2695000, 2896000],
				['Houston, TX', 2099000, 1953000],
				['Philadelphia, PA', 1526000, 1517000]
			],
			options: {
			}
		};
	},
	shouldComponentUpdate(nextProps, nextState) {
		return nextState.data.length !== this.state.data.length;
	},
	componentDidMount() {
		
	},
	componentWillUnmount() {
	},
	render() {
		return(
			<div className="wrapper">
				<GoogleChart type="material-line" data={this.state.data} options={this.state.options} />
				<GoogleChart type="material-bar" data={this.state.data} options={this.state.options} />
			</div>
		);
		
	}
});