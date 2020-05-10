const PingPacket = require("../lib/PingPacket")

describe('PingPacket', () => {
	it('should allow New', () => {
		var x1 = new PingPacket()
		var x2 = new PingPacket()

		expect(x1).not.toBe(x2)
	})

	describe('toBuffer', () => {
		it('should return correct buffer',()=>{
			var x1 = new PingPacket()
			x1.now = new Date('2020-01-01T15:14:13Z')

			expect([...x1.toBuffer()]).toEqual([255, 13, 1, 68, 0, 128, 88, 190, 26, 246, 118, 66])
		})
	})

	describe('fromBuffer', () => {
		it('should return a PingPacket from a correct buffer',()=>{
			var x1 = PingPacket.fromBuffer(Buffer.from([255, 13, 1, 68, 0, 128, 88, 190, 26, 246, 118, 66]))

			expect(x1 instanceof PingPacket).toBeTruthy()
			expect(x1.packetType).toEqual(PingPacket.ID_PING)
			expect(x1.now).toEqual(new Date('2020-01-01T15:14:13Z'))
		})
	})
})