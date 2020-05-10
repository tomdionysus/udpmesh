const Packet = require('./Packet')

Packet.ID_PING = 0x00000001

class PingPacket extends Packet {
	constructor(options = {}) {
		super(options)
		this.packetType = Packet.ID_PING
		this.now = options.now
	}

	serialise(ser) {
		super.serialise(ser)
		ser.writeValue(this.now)
	}

	deserialise(des) {
		super.deserialise(des)
		this.now = new Date(des.readValue())
	}
}

Packet.registerPacket(Packet.ID_PING, PingPacket)

module.exports = PingPacket