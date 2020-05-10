const Packet = require("../lib/Packet")

describe('Packet', () => {
	it('should allow New', () => {
		var x1 = new Packet()
		var x2 = new Packet()

		expect(x1).not.toBe(x2)
	})

	describe('toBuffer', () => {
		it('should return correct buffer',()=>{
			var x1 = new Packet({ from: 'e13e689304581fb2701ef1b9c5f4c581'})

			expect([...x1.toBuffer()]).toEqual([ 255, 13, 255, 255, 255, 255, 15, 225, 62, 104, 147, 4, 88, 31, 178, 112, 30, 241, 185, 197, 244, 197, 129 ])
		})
	})

	describe('fromBuffer', () => {
		it('should return a packet from a correct buffer',()=>{
			var x1 = Packet.fromBuffer(Buffer.from([ 255, 13, 255, 255, 255, 255, 15, 225, 62, 104, 147, 4, 88, 31, 178, 112, 30, 241, 185, 197, 244, 197, 129 ]))

			expect(x1 instanceof Packet).toBeTruthy()
			expect(x1.packetType).toEqual(Packet.ID_GENERIC)
			expect(x1.from).toEqual('e13e689304581fb2701ef1b9c5f4c581')
		})

		it('should return null from a bad header',()=>{
			var x1 = Packet.fromBuffer(Buffer.from([63, 11, 255, 13, 255, 22, 255, 255, 15]))

			expect(x1).toBeNull()
		})

		it('should return null from an incorrect buffer',()=>{
			var x1 = Packet.fromBuffer(Buffer.from([255, 13, 255, 22, 255, 255, 15]))

			expect(x1).toBeNull()
		})
	})
})