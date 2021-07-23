import { IConflict, IResource } from "./interfaces";

export const getExcludedResourcesOnSelect = (
  resources: IResource[],
  conflicts: IConflict[],
  selectedResource: IResource
) => {
  if (resources.length <= 1) {
    return [];
  }

  const otherResources = resources.filter((p) => p !== selectedResource);

  if (conflicts.length === 0) {
    return [];
  }

  const conflictsWithTheSelected = conflicts
    .filter(([r1, r2]) => r1 === selectedResource || r2 === selectedResource)
    .map(([r1, r2]) => (r1 === selectedResource ? r2 : r1));

  return otherResources.filter((p) => conflictsWithTheSelected.includes(p));
};

export const findMaximumPool = (
  resources: IResource[],
  conflicts: IConflict[]
): IResource[] => {
  if (conflicts.length === 0) {
    return resources;
  }

  if (resources.length === 0) {
    return [];
  }

  const selectedResource = resources[0];
  const excludedResources = getExcludedResourcesOnSelect(
    resources,
    conflicts,
    selectedResource
  );

  if (excludedResources.length === 0) {
    return [selectedResource].concat(
      findMaximumPool(
        resources.filter((p) => p !== selectedResource),
        conflicts
      )
    );
  }

  const excludedResourcesSum = excludedResources.reduce(
    (acc, curr) => acc + curr.value,
    0
  );

  const selectedResourceWorthMoreThanExcluded =
    selectedResource.value >= excludedResourcesSum;

  if (selectedResourceWorthMoreThanExcluded) {
    const otherThanExcludedAndSelected = resources.filter(
      (r) => !excludedResources.includes(r) && r !== selectedResource
    );
    const conflictsOtherThanExcludedAndSelected = conflicts.filter(
      ([r1, r2]) =>
        !excludedResources.includes(r1) &&
        !excludedResources.includes(r2) &&
        r1 !== selectedResource &&
        r2 !== selectedResource
    );

    return [selectedResource].concat(
      findMaximumPool(
        otherThanExcludedAndSelected,
        conflictsOtherThanExcludedAndSelected
      )
    );
  }

  const conflictsWithoutSelected = conflicts.filter(
    ([r1, r2]) => r1 !== selectedResource && r2 !== selectedResource
  );
  return findMaximumPool(
    resources.filter((r) => r !== selectedResource),
    conflictsWithoutSelected
  );
};
