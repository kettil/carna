import { isArray } from '@kettil/tools';

const isSelectedService = <Service extends string>(
  value: Service | readonly Service[] | undefined,
  service: Service,
): boolean => {
  if (isArray(value)) {
    return value.includes(service);
  }

  return typeof value === 'undefined' || value === service;
};

export { isSelectedService };
