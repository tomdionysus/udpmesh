class ScopedLogger {
	constructor(scope, logger) {
		this.logger = logger
		this.scope = scope
	}

	debug(message, ...params) {
		this._wrap('debug',message, ...params)
	}

	info(message, ...params) {
		this._wrap('info',message, ...params)
	}

	warn(message, ...params) {
		this._wrap('warn',message, ...params)
	}

	error(message, ...params) {
		this._wrap('error',message, ...params)
	}

	_wrap(method, message, ...params) {
		var args = [ '('+this.scope+') '+message ]
		args = args.concat(params)
		this.logger[method].apply(this.logger, args)
	}

	log(message, type, ...params) {
		var args = [ '('+this.scope+') '+message, type ]
		args = args.concat(params)
		this.logger.log.apply(this.logger, args)
	}
}

module.exports = ScopedLogger