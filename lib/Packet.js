const { DefaultSerializer, DefaultDeserializer } = require('v8')

var __packetTypes = {}

class Packet {
	constructor(options = {}) {
		this.packetType = Packet.ID_GENERIC
		this.from = options.from || '00000000000000000000000000000000'
	}

	toBuffer() {
		var ser = new DefaultSerializer()
		ser.writeHeader()
		ser.writeUint32(this.packetType)
		this.serialise(ser)
		return ser.releaseBuffer()
	}

	serialise(ser) {
		ser.writeRawBytes(Buffer.from(this.from, "hex"))
	}

	deserialise(des) {
		this.from = des.readRawBytes(16).toString('hex')
	}

	static fromBuffer(buffer) {
		try {
			var des = new DefaultDeserializer(buffer)
			des.readHeader()
			var klass = __packetTypes[des.readUint32()]
			if(!klass) return null
			var out = new klass()
			out.deserialise(des)
			return out
		} catch {
			return null
		}
	}

	static registerPacket(type, klass) {
		__packetTypes[type] = klass
	}
}

Packet.ID_GENERIC = 0xFFFFFFFF
Packet.registerPacket(Packet.ID_GENERIC, Packet)

module.exports = Packet