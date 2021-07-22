import { findMaximumPool, IClash, IPerson } from "..";

const people: IPerson[] = [
  { id: "1", amount: 1000 },
  { id: "2", amount: 500 },
  { id: "3", amount: 400 },
  { id: "4", amount: 800 },
  { id: "5", amount: 600 },
  { id: "6", amount: 900 },
];

describe("WHEN findMaximumPool", () => {
  describe("WHEN given a list with no clashes", () => {
    it("SHOULD return everyone", () => {
      const clashes: IClash[] = [];

      expect(findMaximumPool(people, clashes)).toEqual(people);
    });
  });

  describe("WHEN given a list with non-overlapping clashes", () => {
    it("SHOULD return the list with the max amount", () => {
      const clashes: IClash[] = [
        [people[0], people[1]],
        [people[2], people[3]],
        [people[4], people[5]],
      ];

      expect(findMaximumPool(people, clashes)).toEqual([
        people[0],
        people[3],
        people[5],
      ]);
    });
  });
});
