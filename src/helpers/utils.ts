export const randomInt = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min) + min);

export const prepareFilters = (filters: object) =>
  Object.fromEntries(
    Object.entries(filters).filter(([, v]) => {
      const strV = JSON.stringify(v);
      return v !== '' && strV !== '[]' && strV !== '{}' && strV !== 'null'
    })
  );
