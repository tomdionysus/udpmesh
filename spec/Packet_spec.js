const Packet = require("../lib/Packet")

describe('Packet', () => {
	it('should allow New', () => {
		var x1 = new Packet()
		var x2 = new Packet()

		expect(x1).not.toBe(x2)
	})

	describe('toBuffer', () => {
		it('should return correct buffer',()=>{
			var x1 = new Packet()

			expect([...x1.toBuffer()]).toEqual([255, 13, 255, 255, 255, 255, 15])
		})
	})

	describe('fromBuffer', () => {
		it('should return a packet from a correct buffer',()=>{
			var x1 = Packet.fromBuffer(Buffer.from([255, 13, 255, 255, 255, 255, 15]))

			expect(x1 instanceof Packet).toBeTruthy()
			expect(x1.packetType).toEqual(Packet.ID_GENERIC)
		})

		it('should return null from an incorrect buffer',()=>{
			var x1 = Packet.fromBuffer(Buffer.from([255, 13, 255, 22, 255, 255, 15]))

			expect(x1).toBeNull()
		})
	})
})