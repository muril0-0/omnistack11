const GenerateUniqueId = require("../../src/utils/GenerateUniqueId");

describe("Generate Unique Id", () => {
  it("should generate an unique ID", () => {
    const id = GenerateUniqueId();
    expect(id).toHaveLength(8);
  });
});
