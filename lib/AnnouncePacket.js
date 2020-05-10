const Packet = require('./Packet')
const PingPacket = require('./PingPacket')

Packet.ID_ANNOUNCE = 0x00000002

class AnnouncePacket extends PingPacket {
	constructor(options = {}) {
		super(options)
		this.packetType = Packet.ID_ANNOUNCE
		this.now = options.now
		this.services = options.services
	}

	serialise(ser) {
		super.serialise(ser)
		ser.writeValue(this.services)
	}

	deserialise(des) {
		super.deserialise(des)
		this.services = des.readValue()
	}
}

Packet.registerPacket(Packet.ID_ANNOUNCE, AnnouncePacket)

module.exports = AnnouncePacket