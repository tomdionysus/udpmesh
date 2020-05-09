class Mock {
	constructor(options = {}) {
		this.configure(options)
	}

	mockMethod(name, args) {
		this[name] = ()=>{}
		spyOn(this,name)

		if(args && args.length>0) {
			this[name].and.callFake((...fnargs) => {
				this[name].lastParams = {}
				for(var i in args) { this[name].lastParams[args[i]] = fnargs[i] }
			})
		}
		return this[name]
	}

	mockChainMethod(name) {
		this.mockMethod(name).and.returnValue(this)
	}

	configure(options = {}) {
		for(var i in options) this[i]=options[i]
	}
}

module.exports = Mock