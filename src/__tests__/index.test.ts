import { add } from "..";

describe("WHEN add", () => {
  describe("WHEN doing 1 + 1", () => {
    it("SHOULD return 2", () => {
      expect(add(1, 1)).toBe(2);
    });
  });
});
