class Logger {
	constructor(options) {
		options = options || {}
		this.logLevel = Logger.stringToLogLevel(options.logLevel || process.env.LOG_LEVEL || 'WARN')
		this.logTo = options.logTo || console
	}

	debug(message, ...params) {
		if (this.logLevel > Logger.Debug) { return }
		this.log(message, 'DEBUG', ...params)	
	}

	info(message, ...params) {
		if (this.logLevel > Logger.Info) { return }
		this.log(message, 'INFO', ...params)	
	}

	warn(message, ...params) {
		if (this.logLevel > Logger.Warn) { return }
		this.log(message, 'WARN', ...params)
	}

	error(message, ...params) {
		this.log(message, 'ERROR', ...params)
	}

	log(message, type, ...params) {
		var args = [ new Date().toISOString()+' ['+type+'] '+message ]
		args = args.concat(params)
		this.logTo.log.apply(this.logTo, args)
	}

	static stringToLogLevel(str) {
		str = str.toUpperCase().trim()
		switch(str) {
		case 'DEBUG':
			return Logger.Debug
		case 'INFO':
			return Logger.Info
		case 'WARN':
			return Logger.Warn
		case 'ERROR':
			return Logger.Error		
		}
		return Logger.Unknown
	}

	static logLevelToString(level) {
		switch(level) {
		case Logger.Debug:
			return 'DEBUG'
		case Logger.Info:
			return 'INFO'
		case Logger.Warn:
			return 'WARN'
		case Logger.Error:
			return 'ERROR'	
		}
		return '-----'
	}
}

Logger.Unknown = -1
Logger.Debug = 0
Logger.Info = 1
Logger.Warn = 2
Logger.Error = 3

module.exports = Logger