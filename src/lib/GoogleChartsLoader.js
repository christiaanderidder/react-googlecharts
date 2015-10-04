class GoogleChartsLoader {
	
	constructor() {
		this._promise = false;
	}

	load() {
		if(!this._promise) {
			this._promise = new Promise((resolve, reject) => {
				if(!window) reject("Can't load Google Charts, code not running in browser.");

				this._injectScript(() => {
					if(this._checkIfLoadedCorrectly()) {
						resolve(window.google);
					} else {
						reject(Error("Failed to load Google Charts"));
					}
				});
			});
		}

		return this._promise;
	}

	_injectScript(callback) {
		var head = document.getElementsByTagName('head')[0];
		var script = document.createElement('script');

		script.setAttribute('type', 'text/javascript');
		script.src = 'https://www.google.com/jsapi';

		if (script.addEventListener) {
			 // Standard browsers (including IE9+)
			script.addEventListener('load', () => this._loadLibraries(callback), false);
		} else {
			// IE8 and below
			script.onreadystatechange = function () {
				if (script.readyState === 'loaded' || script.readyState === 'complete') {
					script.onreadystatechange = null;
					this._loadLibraries(callback);
				}
			};
		}
		head.appendChild(script);
	}

	_loadLibraries(callback) {
		window.google.load('visualization', '1.1', {
			packages: ['corechart', 'bar', 'line', 'scatter'],
			callback: callback
		});
	}

	_checkIfLoadedCorrectly() {
		return (
			typeof window.google === 'object' 
			&& typeof window.google.visualization === 'object'
			&& typeof window.google.charts === 'object'
		);
	}

};

export default new GoogleChartsLoader();