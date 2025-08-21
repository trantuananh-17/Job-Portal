export function serializeData(data: any, dataConfig: any) {
  const clonedData = { ...data };

  console.log(clonedData);

  for (const [key, value] of Object.entries(dataConfig)) {
    for (const newObj of value as any) {
      const { newKey, property } = newObj as any;

      console.log({ key, newKey, property, x: clonedData[key] });

      clonedData[newKey] = clonedData[key][property];
    }
    clonedData[key] = undefined;
  }

  return clonedData;
}
