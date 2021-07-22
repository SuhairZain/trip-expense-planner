export interface IPerson {
  id: string;
}

export type IClash = [IPerson, IPerson];

export const findMaximumPool = (
  people: IPerson[],
  clashes: IClash[]
): IPerson[] => {
  return people;
};
