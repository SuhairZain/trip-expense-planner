export interface IPerson {
  id: string;
  amount: number;
}

export type IClash = [IPerson, IPerson];

export const getExcludedPeopleOnInclude = (
  people: IPerson[],
  clashes: IClash[],
  includedPerson: IPerson
) => {
  if (people.length === 1) {
    return [];
  }

  const everyOneElse = people.filter((p) => p !== includedPerson);

  if (clashes.length === 0) {
    return [];
  }

  const clashesWithTheIncluded = clashes
    .filter(([p1, p2]) => p1 === includedPerson || p2 === includedPerson)
    .map(([p1, p2]) => (p1 === includedPerson ? p2 : p1));

  return everyOneElse.filter((p) => clashesWithTheIncluded.includes(p));
};

export const findMaximumPool = (
  people: IPerson[],
  clashes: IClash[]
): IPerson[] => {
  if (clashes.length === 0) {
    return people;
  }

  if (people.length === 0) {
    return [];
  }

  const includedPerson = people[0];
  const excludedPeople = getExcludedPeopleOnInclude(
    people,
    clashes,
    includedPerson
  );

  if (excludedPeople.length === 0) {
    return [includedPerson].concat(
      findMaximumPool(
        people.filter((p) => p !== includedPerson),
        clashes
      )
    );
  }

  const excludedPeopleSum = excludedPeople.reduce(
    (acc, curr) => acc + curr.amount,
    0
  );

  const includedPersonWorthMore = includedPerson.amount >= excludedPeopleSum;

  if (includedPersonWorthMore) {
    const otherThanExcludedAndIncluded = people.filter(
      (p) => !excludedPeople.includes(p) && p !== includedPerson
    );
    const clashesOtherThanExcludedAndIncluded = clashes.filter(
      ([p1, p2]) =>
        !excludedPeople.includes(p1) &&
        !excludedPeople.includes(p2) &&
        p1 !== includedPerson &&
        p2 !== includedPerson
    );

    return [includedPerson].concat(
      findMaximumPool(
        otherThanExcludedAndIncluded,
        clashesOtherThanExcludedAndIncluded
      )
    );
  }

  const clashesWithoutIncluded = clashes.filter(
    ([p1, p2]) => p1 !== includedPerson && p2 !== includedPerson
  );
  return findMaximumPool(
    people.filter((p) => p !== includedPerson),
    clashesWithoutIncluded
  );
};
