const HasEventsMixin = require('../lib/HasEventsMixin')

describe('HasEventsMixin', () => {
	var x1
	beforeEach(()=>{
		x1 = {} 
		HasEventsMixin(x1)
	})

	describe('init', () => {
		it('should set properties on object', ()=>{
			expect(x1._events).toEqual({})
		})
	})

	describe('on', () => {
		it('should throw on bad event', () => {
			expect(function(){x1.on('bad',()=>{})}).toThrow('on: no such event bad')
		})

		it('should add function to callback list', () => {
			x1.defineEvent('test')

			var cb = { callback: ()=>{} }
			
			x1.on('test',cb.callback)

			expect(x1._events['test']).toEqual([ cb.callback ])
		})

		it('should not add existing callback twice', () => {
			x1.defineEvent('test')

			var cb = { callback: ()=>{} }
			
			x1.on('test',cb.callback)
			x1.on('test',cb.callback)

			expect(x1._events['test']).toEqual([ cb.callback ])
		})
	})

	describe('off', () => {
		it('should throw on bad event', () => {
			expect(function(){x1.off('bad',()=>{})}).toThrow('off: no such event bad')
		})

		it('should not remove unknown handler', () => {
			x1.defineEvent('test')
			x1.defineEvent('test2')

			var cb = { callback: ()=>{}, callback2: ()=>{} }
			
			x1.on('test',cb.callback)
			x1.on('test2',cb.callback2)
			x1.off('test',cb.callback2)

			expect(x1._events['test2']).toEqual([ cb.callback2 ])
		})

		it('should correctly remove valid event', () => {
			x1.defineEvent('test')
			x1.defineEvent('test2')

			var cb = { callback: ()=>{}, callback2: ()=>{} }
			
			x1.on('test', cb.callback)
			x1.on('test2', cb.callback2)
			x1.off('test', cb.callback)

			expect(x1._events['test']).toEqual([])
		})
	})

	describe('defineEvents', () => {
		it('should add events', () => {
			x1.defineEvents(['test','test2'])
			expect(x1._events).toEqual({ test: [], test2: [] })
		})
	})

	describe('undefineEvents', () => {
		it('should remove events', () => {
			x1.defineEvent('test')
			x1.defineEvent('test2')
			x1.undefineEvents(['test'])
			expect(x1._events).toEqual({ test2: [] })
		})
	})

	describe('addEventListener', () => {
		it('should call on', () => {
			spyOn(x1,'on')

			var cb = { callback: ()=>{} }

			x1.addEventListener('test',cb.callback)
			expect(x1.on).toHaveBeenCalledWith('test',cb.callback)
		})
	})

	describe('removeEventListener', () => {
		it('should call on', () => {
			spyOn(x1,'off')

			var cb = { callback: ()=>{} }

			x1.removeEventListener('test',cb.callback)
			expect(x1.off).toHaveBeenCalledWith('test',cb.callback)
		})
	})

	describe('emit', () => {
		it('should throw on bad event', () => {
			expect(function(){x1.emit('bad')}).toThrow('emit: no such event bad')
		})

		it('should call valid event', () => {
			x1.defineEvent('test')

			var cb = { callback: ()=>{} }, f
			spyOn(cb,'callback')
			
			x1.on('test',cb.callback)
			spyOn(global, 'setImmediate').and.callFake((fn)=>{f=fn})
			x1.emit('test',{ one:1 },2)

			expect(global.setImmediate).toHaveBeenCalledWith(jasmine.any(Function))
			f()
			expect(cb.callback).toHaveBeenCalledWith({ one: 1 },2)
		})
	})


	describe('emit', () => {
		it('should not throw on ok event that is not defined', () => {
			x1.defineEvent('item')
			expect(function(){x1.emit('item')}).not.toThrow()
		})
	})

	describe('getEventListeners', () => {
		it('should throw on bad event', () => {
			expect(function(){x1.getEventListeners('bad')}).toThrow('getEventListeners: no such event bad')
		})

		it('should return handlers as an array', () => {
			x1.defineEvent('test')
			var cb = { 
				callback1() {},
				callback2() {},
			}
			x1.on('test',cb.callback1)
			x1.on('test',cb.callback2)
			expect(x1.getEventListeners('test')).toEqual([ cb.callback1, cb.callback2 ])
		})
	})
})