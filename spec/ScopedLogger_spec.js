const LoggerMock = require('./mocks/LoggerMock')
const ScopedLogger = require('../lib/ScopedLogger')


describe('ScopedLogger', () => {
	it('should allow New', () => {
		var x1 = new ScopedLogger()
		var x2 = new ScopedLogger()

		expect(x1).not.toBe(x2)
	})

	it('should call debug with scope', () => {
		var x2 = new LoggerMock()
		var x1 = new ScopedLogger('SCOPE', x2)

		x1.debug('TESTING','TWO')

		expect(x2.debug).toHaveBeenCalledWith('(SCOPE) TESTING', 'TWO')
	})

	it('should call info with scope', () => {
		var x2 = new LoggerMock()
		var x1 = new ScopedLogger('SCOPE', x2)

		x1.info('TESTING')

		expect(x2.info).toHaveBeenCalledWith('(SCOPE) TESTING')
	})

	it('should call info with scope and param', () => {
		var x2 = new LoggerMock()
		var x1 = new ScopedLogger('SCOPE', x2)

		x1.info('TESTING','TWO')

		expect(x2.info).toHaveBeenCalledWith('(SCOPE) TESTING', 'TWO')
	})

	it('should call warn with scope', () => {
		var x2 = new LoggerMock()
		var x1 = new ScopedLogger('SCOPE', x2)

		x1.warn('TESTING','TWO')

		expect(x2.warn).toHaveBeenCalledWith('(SCOPE) TESTING', 'TWO')
	})

	it('should call error with scope', () => {
		var x2 = new LoggerMock()
		var x1 = new ScopedLogger('SCOPE', x2)

		x1.error('TESTING','TWO')

		expect(x2.error).toHaveBeenCalledWith('(SCOPE) TESTING', 'TWO')
	})

	it('should call log with scope', () => {
		var x2 = new LoggerMock()
		var x1 = new ScopedLogger('SCOPE', x2)

		x1.log('TESTING','TYPE')

		expect(x2.log).toHaveBeenCalledWith('(SCOPE) TESTING', 'TYPE')
	})

	it('should call log with scope and params', () => {
		var x2 = new LoggerMock()
		var x1 = new ScopedLogger('SCOPE', x2)

		x1.log('TESTING','TYPE','TWO')

		expect(x2.log).toHaveBeenCalledWith('(SCOPE) TESTING', 'TYPE', 'TWO')
	})
})
