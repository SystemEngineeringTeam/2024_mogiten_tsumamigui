import type { EatData } from '../types/EatData';
import { UserNames } from './UserNames';

export const getUserEatCounts = (): EatData[] => {
  if (!localStorage.getItem('eat_count')) {
    const eatCounts: EatData[] = UserNames.map((name) => ({ name, count: 0 }));
    localStorage.setItem('eat_count', JSON.stringify({ eatCounts }));
  }

  const storedData = JSON.parse(localStorage.getItem('eat_count') || '{}');
  const eatCounts = storedData.eatCounts as EatData[];

  console.log(eatCounts);

  return eatCounts;
};

export const saveEatCount = (eatCounts: EatData[]): void => {
  localStorage.setItem('eat_count', JSON.stringify({ eatCounts }));
};

export const getTotalUserEatCount = (eatCounts: EatData[]): number => {
  return eatCounts.reduce((acc, eatCount) => acc + eatCount.count, 0);
};
