const dgram = require('dgram')
const crypto = require('crypto')

const Logger = require('./Logger')
const ScopedLogger = require('./ScopedLogger')
const HasEventsMixin = require('./HasEventsMixin')

class MeshNode {
	constructor(options = {}) {
		HasEventsMixin(this, options)

		this.defineEvents(['started','stopped','node_joined','node_left','node_awol'])

		this.logger = new ScopedLogger('MeshNode', options.logger || new Logger())

		this.announceInterval = options.announceInterval || 5000
		this.remoteTimeout = options.remoteTimeout || 10000
		this.address = options.address || '0.0.0.0'
		this.port = options.port || 43234

		this._nodes = {}
		this._services = {}

		this.id = options.id || crypto.randomBytes(16).toString('hex')
		this._myServices = {}

		this._socket = dgram.createSocket('udp4')
		
		this._socket.on('error', this._onSocketError.bind(this))
		this._socket.on('message', this._onSocketMessage.bind(this))
		this._socket.on('listening', this._onSocketListening.bind(this))

		this._running = false
	}

	start() {
		if(this._running) return
		this.logger.debug("Starting")
		this._running = true
		this._announceInt = setInterval(this._announce.bind(this))
		this._socket.bind(this.port)
		this.logger.debug("Started, ID "+this.id)
		this.trigger('started', this)
	}

	stop() {
		if(!this._running) return
		clearInterval(this._announceInt)
		this._socket.close()
		this._running = false
		this.trigger('stopped', this)
	}

	addService(name, address = null, port) {
		this._myServices[name] = { address: address, port: port }
	}

	removeService(name) {
		delete this._myServices[name]
	}

	getServices() {
		return Object.keys(this._services)
	}

	getServiceNodes(name) {
		return this._services[name]
	}

	_onSocketError(err) {

	}

	_onSocketMessage(rmsg, info) {

	}

	_onSocketListening() {
		this._socket.setBroadcast(true)
	}

	_announce() {
	}
}

module.exports = MeshNode