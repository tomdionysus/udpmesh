const Mock = require('./Mock')

class LoggerMock extends Mock {
	constructor(options = {}) {
		super()
		this.logLevel = options.logLevel || LoggerMock.Info

		this.mockMethod('debug')
		this.mockMethod('info')
		this.mockMethod('warn')
		this.mockMethod('error')
		this.mockMethod('log')
	}

	static stringToLogLevel(str) {
		str = str.toUpperCase().trim()
		switch(str) {
		case 'DEBUG':
			return LoggerMock.Debug
		case 'INFO':
			return LoggerMock.Info
		case 'WARN':
			return LoggerMock.Warn
		case 'ERROR':
			return LoggerMock.Error		
		}
		return LoggerMock.Unknown
	}

	static logLevelToString(level) {
		switch(level) {
		case LoggerMock.Debug:
			return 'DEBUG'
		case LoggerMock.Info:
			return 'INFO'
		case LoggerMock.Warn:
			return 'WARN'
		case LoggerMock.Error:
			return 'ERROR'	
		}
		return '-----'
	}
}

LoggerMock.Unknown = -1
LoggerMock.Debug = 0
LoggerMock.Info = 1
LoggerMock.Warn = 2
LoggerMock.Error = 3

module.exports = LoggerMock