import { findMaximumPool, getExcludedResourcesOnSelect } from "..";
import { IConflict, IResource } from "../interfaces";

const resources: IResource[] = [
  { id: "0", value: 1000 },
  { id: "1", value: 500 },
  { id: "2", value: 400 },
  { id: "3", value: 800 },
  { id: "4", value: 600 },
  { id: "5", value: 900 },
];

describe("WHEN getExcludedResourcesOnSelect", () => {
  for (const resource of resources) {
    describe(`WHEN given conflicts with all other resources (${resource.id})`, () => {
      it("SHOULD return a list with everything else", () => {
        const excludedResources = getExcludedResourcesOnSelect(
          resources,
          resources.filter((p) => p !== resource).map((p) => [resource, p]),
          resource
        );

        expect(excludedResources).toHaveLength(5);
        expect(excludedResources).not.toContain(resource);
      });
    });
  }

  for (const resource of resources) {
    describe(`WHEN given conflicts with no other resource (${resource.id})`, () => {
      it("SHOULD return an empty list", () => {
        const excludedResources = getExcludedResourcesOnSelect(
          resources,
          [],
          resource
        );

        expect(excludedResources).toHaveLength(0);
      });
    });
  }

  describe("WHEN given a single resource list", () => {
    it("SHOULD return an empty list", () => {
      const excludedResources = getExcludedResourcesOnSelect(
        [resources[0]],
        [],
        resources[0]
      );

      expect(excludedResources).toHaveLength(0);
    });
  });
});

describe("WHEN findMaximumPool", () => {
  describe("WHEN given a list with no conflicts", () => {
    it("SHOULD return everyone", () => {
      const conflicts: IConflict[] = [];

      expect(findMaximumPool(resources, conflicts)).toEqual(resources);
    });
  });

  describe("WHEN given a list with non-overlapping conflicts", () => {
    it("SHOULD return the list with the max amount", () => {
      const conflicts: IConflict[] = [
        [resources[0], resources[1]],
        [resources[2], resources[3]],
        [resources[4], resources[5]],
      ];

      expect(findMaximumPool(resources, conflicts)).toEqual([
        resources[0],
        resources[3],
        resources[5],
      ]);
    });
  });

  describe("WHEN given a list with complicated conflicts", () => {
    it("SHOULD return the list with the max amount", () => {
      const conflicts: IConflict[] = [
        [resources[0], resources[1]],
        [resources[0], resources[2]],
        [resources[0], resources[3]],
        [resources[0], resources[4]],
        [resources[0], resources[5]],
      ];

      expect(findMaximumPool(resources, conflicts)).toEqual([
        resources[1],
        resources[2],
        resources[3],
        resources[4],
        resources[5],
      ]);
    });
  });

  describe("WHEN given a list where a single resource has conflicts with all others but has the highest value", () => {
    it("SHOULD return just the single resouce", () => {
      const highValueResource = { ...resources[0], value: 6000 };

      const conflicts: IConflict[] = [
        [highValueResource, resources[1]],
        [highValueResource, resources[2]],
        [highValueResource, resources[3]],
        [highValueResource, resources[4]],
        [highValueResource, resources[5]],
      ];

      expect(
        findMaximumPool(
          [highValueResource].concat(resources.slice(1)),
          conflicts
        )
      ).toEqual([highValueResource]);
    });
  });

  describe("WHEN given a list where the last resource has conflicts with all others but has the highest value", () => {
    it("SHOULD return just the single resouce", () => {
      const highValueResource = { ...resources[5], value: 8000 };

      const conflicts: IConflict[] = [
        [highValueResource, resources[0]],
        [highValueResource, resources[1]],
        [highValueResource, resources[2]],
        [highValueResource, resources[3]],
        [highValueResource, resources[4]],
      ];

      expect(
        findMaximumPool(
          resources.slice(0, 5).concat(highValueResource),
          conflicts
        )
      ).toEqual([highValueResource]);
    });
  });

  describe("WHEN given a list where the every resource has conflicts with all others and all have equal value", () => {
    it("SHOULD return just one of the resouces", () => {
      const resources: IResource[] = [
        { id: "0", value: 1000 },
        { id: "1", value: 1000 },
        { id: "2", value: 1000 },
        { id: "3", value: 1000 },
        { id: "4", value: 1000 },
        { id: "5", value: 1000 },
      ];

      const conflicts: IConflict[] = [];
      for (let i = 0; i < resources.length; i++) {
        for (let j = i + 1; j < resources.length; j++) {
          conflicts.push([resources[i], resources[j]]);
        }
      }

      expect(findMaximumPool(resources, conflicts)).toEqual([resources[4]]);
    });
  });

  describe("WHEN given a list where the every resource has conflicts (duplicated) with all others and all have equal value", () => {
    it("SHOULD return just one of the resouces", () => {
      const resources: IResource[] = [
        { id: "0", value: 1000 },
        { id: "1", value: 1000 },
        { id: "2", value: 1000 },
        { id: "3", value: 1000 },
        { id: "4", value: 1000 },
        { id: "5", value: 1000 },
      ];

      const conflicts: IConflict[] = [];
      for (let i = 0; i < resources.length; i++) {
        for (let j = 0; j < resources.length; j++) {
          if (i === j) {
            continue;
          }

          conflicts.push([resources[i], resources[j]]);
        }
      }

      expect(findMaximumPool(resources, conflicts)).toEqual([resources[4]]);
    });
  });
});
