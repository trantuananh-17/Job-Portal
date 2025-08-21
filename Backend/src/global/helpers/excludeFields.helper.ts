export function excludeFields(data: any, excludeFields: string[]) {
  const clonedData = { ...data };

  for (const field of excludeFields) {
    delete clonedData[field];
  }

  return clonedData;
}
