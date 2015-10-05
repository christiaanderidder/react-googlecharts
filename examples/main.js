import React from 'react';
import Examples from './Examples';

var node = document.getElementById('main');


window.render = function(){
	React.render(<Examples />, node);
};

window.unmount = function() {
	React.unmountComponentAtNode(node);
};

window.render();