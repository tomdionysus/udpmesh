const MeshNode = require("../lib/MeshNode")

describe('MeshNode', () => {
	it('should allow New', () => {
		var x1 = new MeshNode()
		var x2 = new MeshNode()

		expect(x1).not.toBe(x2)
	})
})