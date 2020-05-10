const Packet = require("../lib/Packet")
const AnnouncePacket = require("../lib/AnnouncePacket")

describe('AnnouncePacket', () => {
	it('should allow New', () => {
		var x1 = new AnnouncePacket()
		var x2 = new AnnouncePacket()

		expect(x1).not.toBe(x2)
	})

	describe('toBuffer', () => {
		it('should return correct buffer',()=>{
			var x1 = new AnnouncePacket()
			x1.now = new Date('2020-01-01T15:14:13Z')
			x1.services = {
				mysql: { port: 3306 }
			}

			expect([...x1.toBuffer()]).toEqual([ 255, 13, 2, 68, 0, 128, 88, 190, 26, 246, 118, 66, 111, 34, 5, 109, 121, 115, 113, 108, 111, 34, 4, 112, 111, 114, 116, 73, 212, 51, 123, 1, 123, 1 ])
		})
	})

	describe('fromBuffer', () => {
		it('should return an AnnouncePacket from a correct buffer',()=>{
			var x1 = Packet.fromBuffer(Buffer.from([ 255, 13, 2, 68, 0, 128, 88, 190, 26, 246, 118, 66, 111, 34, 5, 109, 121, 115, 113, 108, 111, 34, 4, 112, 111, 114, 116, 73, 212, 51, 123, 1, 123, 1 ]))

			expect(x1 instanceof AnnouncePacket).toBeTruthy()
			expect(x1.packetType).toEqual(Packet.ID_ANNOUNCE)
			expect(x1.now).toEqual(new Date('2020-01-01T15:14:13Z'))
			expect(x1.services).toEqual({mysql: { port: 3306 }})
		})
	})
})