import prisma from '~/prisma';

export async function getPaginationAndFilters({
  page,
  limit,
  filter,
  filterFields,
  entity,
  additionalCondition = {},
  orderCondition = {},
  include = {}
}: any) {
  const skip: number = (page - 1) * limit;

  const conditions = filterFields.map((field: string) => {
    return { [field]: { contains: filter, mode: 'insensitive' } };
  });

  const where = filter
    ? {
        OR: conditions
      }
    : {};

  const [data, totalCounts] = await Promise.all([
    (prisma[entity] as any).findMany({
      where: { ...where, ...additionalCondition },
      orderBy: { ...orderCondition },
      include,
      skip,
      take: +limit
    }),
    (prisma[entity] as any).count({
      where: { ...where, ...additionalCondition }
    })
  ]);

  return { data, totalCounts };
}
