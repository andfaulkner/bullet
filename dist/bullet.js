(function () {
	var BulletClass = function () {
		var _self = this,
		    _events = {};


		/** 
		  * Requres at least event & fn provided; event must be a str. Once: true|false
		  */
		_self.on = function (event, fn, once) {
			if (arguments.length < 2 || typeof event !== "string" ||
				typeof fn !== "function") return;

			var fnString = fn.toString();

			// if the named event object already exists in the dictionary...
			if (typeof _events[event] !== "undefined") {
				// add a callback obj to the named event obj if 1 doesn't already exist.
				if (typeof _events[event].callbacks[fnString] === "undefined") {
					_events[event].callbacks[fnString] = {
						cb : fn,
						once : !!once
					};
				} else if (typeof once === "boolean") { // the fn already exists, so update its 'once' val
					_events[event].callbacks[fnString].once = once;
				}
			} else {  // create a new event obj in the dictionary w the specified name & callback.
				_events[event] = {
					callbacks : {}
				};
				_events[event].callbacks[fnString] = {cb : fn, once : !!once};
			}
		};


		_self.once = function (event, fn) {
			_self.on(event, fn, true);
		};


		_self.off = function (event, fn) {
			if (typeof event !== "string" ||
				typeof _events[event] === "undefined") return;

			// remove just the function, if passed as a parameter and in the dictionary.
			if (typeof fn === "function") {
				var fnString = fn.toString(),
				    fnToRemove = _events[event].callbacks[fnString];

				if (typeof fnToRemove !== "undefined") { // delete the callback obj from the dictionary.
					delete _events[event].callbacks[fnString];
				}
			} else {  //delete all fn in the dictionary that're regist 2 this event by del the named event obj
				delete _events[event];
			}
		};


		_self.trigger = function (event, data) {
			if (typeof event !== "string" ||
				typeof _events[event] === "undefined") return;

			for (var fnString in _events[event].callbacks) {
				var callbackObject = _events[event].callbacks[fnString];

				if (typeof callbackObject.cb === "function") callbackObject.cb(data);
				if (typeof callbackObject.once === "boolean" 
						&& callbackObject.once === true) {
							_self.off(event, callbackObject.cb);
				}
			}
		};


	};


	// check for AMD/Module support, otherwise define Bullet as a global variable.
	if (typeof define !== "undefined" && define.amd) {
		define (function() { 										// AMD. Register as an anonymous module
			"use strict";
			return new BulletClass(); });
	} else if (typeof module !== "undefined" && module.exports) {  // NodeJS & WebPack
		module.exports = new BulletClass();
	} else { window.Bullet = new BulletClass(); }				   // vanilla browser
})();
