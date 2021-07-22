export interface IPerson {
  id: string;
  amount: number;
}

export type IClash = [IPerson, IPerson];

export const findMaximumPool = (
  people: IPerson[],
  clashes: IClash[]
): IPerson[] => {
  if (clashes.length === 0) {
    return people;
  }

  const pool: IPerson[] = [];

  for (const [first, second] of clashes) {
    pool.push(first.amount > second.amount ? first : second);
  }

  return pool;
};
