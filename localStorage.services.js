angular
	.module('app.services')

	.factory('$localStorage', function($rootScope){
		var $localStorage = {};

		$localStorage._propPrefix = 'peak-publishers__';

		$localStorage.set = function(prop, val){
			if(angular.isObject(val)){
				val = JSON.stringify(val);
			}

			if(this._setProperties.indexOf(prop) === -1){
				this._setProperties.push(prop);
				this.set('localStorage__setProperties', this._setProperties);
			}

			localStorage[this._propPrefix+prop] = val;
		};

		$localStorage.remove = function(prop){
			localStorage.removeItem(this._propPrefix+prop);
		};

		$localStorage.clear = function(){
			var setProps = this._setProperties,
				count = setProps.length;

			for(var i = 0; i < count; i++){
				this.remove(setProps[i]);
			}

			this._setProperties = [];
		};

		$localStorage.get = function(prop){
			var val = localStorage[this._propPrefix+prop];

            //check if object / array
            if(/^\{.+\}$/.test(val) || /^\[(.+)?\]$/.test(val)){
                val = JSON.parse(val);
            }

            //check if number
            if(!isNaN(val)){
                val = Number(val);
            }

            //check if undefined
            if(val === 'undefined'){
                val = undefined;
            }

			return val;
		};

		//store all keys that are set
		//so we can flush them when asked to
		$localStorage._setProperties = $localStorage.get('localStorage__setProperties') || [];

		return $localStorage;
	});
