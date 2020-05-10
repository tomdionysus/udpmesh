const { DefaultSerializer, DefaultDeserializer } = require('v8')

var __packetTypes = {}

class Packet {
	constructor(options = {}) {
		this.packetType = Packet.ID_GENERIC
	}

	toBuffer() {
		var ser = new DefaultSerializer()
		ser.writeHeader()
		ser.writeUint32(this.packetType)
		this.serialise(ser)
		return ser.releaseBuffer()
	}

	serialise(ser) {
		// Override here
	}

	deserialise(des) {
		// Override here
	}

	static fromBuffer(buffer) {
		var des = new DefaultDeserializer(buffer)
		des.readHeader()
		var klass = __packetTypes[des.readUint32()]
		if(!klass) return null
		var out = new klass()
		out.deserialise(des)
		return out
	}

	static registerPacket(type, klass) {
		__packetTypes[type] = klass
	}
}

Packet.ID_GENERIC = 0xFFFFFFFF
Packet.registerPacket(Packet.ID_GENERIC, Packet)

module.exports = Packet