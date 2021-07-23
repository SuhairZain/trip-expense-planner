import {
  findMaximumPool,
  getExcludedPeopleOnInclude,
  IClash,
  IPerson,
} from "..";

const people: IPerson[] = [
  { id: "0", amount: 1000 },
  { id: "1", amount: 500 },
  { id: "2", amount: 400 },
  { id: "3", amount: 800 },
  { id: "4", amount: 600 },
  { id: "5", amount: 900 },
];

describe("WHEN getExcludedPeopleOnInclude", () => {
  for (const person of people) {
    describe(`WHEN given clashes with everyone else (${person.id})`, () => {
      it("SHOULD return a list with everyone else", () => {
        const excludedPeople = getExcludedPeopleOnInclude(
          people,
          people.filter((p) => p !== person).map((p) => [person, p]),
          person
        );

        expect(excludedPeople).toHaveLength(5);
        expect(excludedPeople).not.toContain(person);
      });
    });
  }

  for (const person of people) {
    describe(`WHEN given clashes with no one (${person.id})`, () => {
      it("SHOULD return an empty list", () => {
        const excludedPeople = getExcludedPeopleOnInclude(people, [], person);

        expect(excludedPeople).toHaveLength(0);
      });
    });
  }

  describe("WHEN given a single person list", () => {
    it("SHOULD return an empty list", () => {
      const excludedPeople = getExcludedPeopleOnInclude(
        [people[0]],
        [],
        people[0]
      );

      expect(excludedPeople).toHaveLength(0);
    });
  });
});

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

  describe("WHEN given a list with complicated clashes", () => {
    it("SHOULD return the list with the max amount", () => {
      const clashes: IClash[] = [
        [people[0], people[1]],
        [people[0], people[2]],
        [people[0], people[3]],
        [people[0], people[4]],
        [people[0], people[5]],
      ];

      expect(findMaximumPool(people, clashes)).toEqual([
        people[1],
        people[2],
        people[3],
        people[4],
        people[5],
      ]);
    });
  });
});
