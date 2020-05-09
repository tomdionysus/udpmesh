const Logger = require('../lib/Logger')

describe('Logger', () => {
	it('should allow New', () => {
		var x1 = new Logger()
		var x2 = new Logger()

		expect(x1).not.toBe(x2)
	})

	it('should default to warn log level', () => {
		process.env.LOG_LEVEL = ''
		var x1 = new Logger()

		expect(x1.logLevel).toEqual(Logger.Warn)
	})

	it('should parse log level New', () => {
		var x1 = new Logger({logLevel:'error'})

		expect(x1.logLevel).toEqual(Logger.Error)
	})

	describe('debug', () => {
		it('should log debug when logLevel is equal', () => {
			var x2 = { log: () => {} }
			spyOn(x2,'log') 
			var x1 = new Logger({logLevel: 'debug', logTo: x2})
			x1.debug('TEST','ONE')
			expect(x2.log).toHaveBeenCalled()
		})
		it('should not log debug when logLevel greater', () => {
			var x2 = { log: () => {} }
			spyOn(x2,'log') 
			var x1 = new Logger({logLevel: 'info', logTo: x2})
			x1.debug('TEST','ONE')
			expect(x2.log).not.toHaveBeenCalled()
		})
	})

	describe('info', () => {
		it('should log info when logLevel is equal', () => {
			var x2 = { log: () => {} }
			spyOn(x2,'log') 
			var x1 = new Logger({logLevel: 'info', logTo: x2})
			x1.info('TEST','ONE')
			expect(x2.log).toHaveBeenCalled()
		})
		it('should not log info when logLevel greater', () => {
			var x2 = { log: () => {} }
			spyOn(x2,'log') 
			var x1 = new Logger({logLevel: 'warn', logTo: x2})
			x1.info('TEST','ONE')
			expect(x2.log).not.toHaveBeenCalled()
		})
	})

	describe('warn', () => {
		it('should log warn when logLevel is equal', () => {
			var x2 = { log: () => {} }
			spyOn(x2,'log') 
			var x1 = new Logger({logLevel: 'warn', logTo: x2})
			x1.warn('TEST','ONE')
			expect(x2.log).toHaveBeenCalled()
		})
		it('should not log warn when logLevel greater', () => {
			var x2 = { log: () => {} }
			spyOn(x2,'log') 
			var x1 = new Logger({logLevel: 'error', logTo: x2})
			x1.warn('TEST','ONE')
			expect(x2.log).not.toHaveBeenCalled()
		})
	})

	describe('error', () => {
		it('should log error', () => {
			var x2 = { log: () => {} }
			spyOn(x2,'log') 
			var x1 = new Logger({logLevel: 'error', logTo: x2})
			x1.error('TEST','ONE')
			expect(x2.log).toHaveBeenCalled()
		})
	})

	describe('log', () => {
		it('should call raw log', () => {
			var x2 = { log: () => {} }
			spyOn(x2,'log') 
			var x1 = new Logger({logLevel: 'error', logTo: x2})
			x1.log('TEST','RAW')
			expect(x2.log).toHaveBeenCalled()
		})
		it('should call raw log with scalar param', () => {
			var x2 = { log: () => {} }
			spyOn(x2,'log') 
			var x1 = new Logger({logLevel: 'error', logTo: x2})
			x1.log('TEST','RAW','ONE')
			expect(x2.log).toHaveBeenCalled()
		})
		it('should call raw log with array params', () => {
			var x2 = { log: () => {} }
			spyOn(x2,'log') 
			var x1 = new Logger({logLevel: 'error', logTo: x2})
			x1.log('TEST','RAW',['ONE','TWO'])
			expect(x2.log).toHaveBeenCalled()
		})
	})

	describe('stringToLogLevel', () => {
		it('should parse debug', () => {
			expect(Logger.stringToLogLevel('debug')).toEqual(Logger.Debug)
		})
		it('should parse info', () => {
			expect(Logger.stringToLogLevel('info')).toEqual(Logger.Info)
		})
		it('should parse warn', () => {
			expect(Logger.stringToLogLevel('warn')).toEqual(Logger.Warn)
		})
		it('should parse error', () => {
			expect(Logger.stringToLogLevel('error')).toEqual(Logger.Error)
		})
		it('should parse unknown', () => {
			expect(Logger.stringToLogLevel('unknown')).toEqual(Logger.Unknown)
		})
	})

	describe('logLevelToString', () => {
		it('should parse Logger.Debug', () => {
			expect(Logger.logLevelToString(Logger.Debug)).toEqual('DEBUG')
		})
		it('should parse Logger.Info', () => {
			expect(Logger.logLevelToString(Logger.Info)).toEqual('INFO')
		})
		it('should parse Logger.Warn', () => {
			expect(Logger.logLevelToString(Logger.Warn)).toEqual('WARN')
		})
		it('should parse Logger.Error', () => {
			expect(Logger.logLevelToString(Logger.Error)).toEqual('ERROR')
		})
		it('should parse Logger.Unknown', () => {
			expect(Logger.logLevelToString(Logger.Unknown)).toEqual('-----')
		})
	})
})
