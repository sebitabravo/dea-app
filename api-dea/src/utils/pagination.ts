export const parsePagination = (limitQuery: unknown, offsetQuery: unknown) => {
    const limitNumber = Number(limitQuery);
    const offsetNumber = Number(offsetQuery);

    const limit = Number.isInteger(limitNumber) && limitNumber > 0 ? Math.min(limitNumber, 100) : 50;
    const offset = Number.isInteger(offsetNumber) && offsetNumber >= 0 ? offsetNumber : 0;

    return { limit, offset };
};
