import { findMaximumPool, IClash, IPerson } from "..";

const people: IPerson[] = [
  { id: "1" },
  { id: "2" },
  { id: "3" },
  { id: "4" },
  { id: "5" },
  { id: "6" },
];

describe("WHEN findMaximumPool", () => {
  describe("WHEN given a list with no clashes", () => {
    it("SHOULD return everyone", () => {
      const clashes: IClash[] = [];

      expect(findMaximumPool(people, clashes)).toEqual(people);
    });
  });
});
