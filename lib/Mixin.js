/**
 * Mixin contains functions for creating mixins - a way to do multiple inheritance in JavaScript.
 * Mixin classes can be defined, and their functionality merged into an instance of another class
 * when it is instantiated.
 * @hideconstructor
 * @example
<caption>To define a Mixin class</caption>
const { Mixin } = require('tenkai')

class YourMixinClass extends Mixin {
	static init(obj, options) {
		// Do your initialisation here, like you would in a constructor.
		// obj is the new object, eqivalent of 'this'.
		// The user class can pass options, etc.
		obj.testValue = 'This is a Mixin Class' 
	}

	// Add methods as per a standard class:
	mixinMethod() {
		...
		console.log('mixinMethod: '+this.testValue)
		...
	}
}

// Use the Mixin.export() function to export the class.
module.exports = Mixin.export(YourMixinClass)
 *
 * @example
<caption>To use a Mixin class</caption>
const YourMixinClass = require('./YourMixinClass')

class YourMixinUserClass {
	constructor(options = {}) {

		// Call the mixin with this and any options
		YourMixinClass(this, options)
	}

	anotherMethod() {
		// Now you can use the properties and methods on the mixin

		console.log(this.testValue)
		this.mixinMethod()
	}
}
 */
class Mixin {
	/**
	* Use export to export the class from the module as a mixin.
	* @param {Class} klass The class to export as a mixin
	* @example
	* module.exports = Mixin.export(YourMixinClass)
	*/
	static export(klass) {
		return function(obj, options) {
			var c = Mixin._getMethods(new klass())
			for(var i in c) {
				obj[i] = c[i].bind(obj)
			}
			if(klass.init) klass.init(obj, options)
		}
	}

	static _getMethods(inst) {
		var out = {}
		inst = inst.__proto__
		while(inst) {
			if(inst.constructor === Object) break
			var methods = Object.getOwnPropertyDescriptors(inst)
			for(var k in methods) {
				if(k=='constructor') continue
				out[k] = methods[k].value
			}
			inst = inst.__proto__
		}
		return out
	}
}

module.exports = Mixin

