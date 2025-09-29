export function serializeData(data: any, dataConfig: any) {
  const clonedData = { ...data };

  for (const [key, value] of Object.entries(dataConfig)) {
    for (const newObj of value as any) {
      const { newKey, property } = newObj as any;

      clonedData[newKey] = clonedData[key][property];
    }
    clonedData[key] = undefined;
  }

  return clonedData;
}
