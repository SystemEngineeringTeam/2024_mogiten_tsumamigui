import type { EatData } from '../types/EatData';
import { UserNames } from './UserNames';

export const UserName = (): string[] => {
  if (!localStorage.getItem('eat_count')) {
    const eatCounts: EatData[] = UserNames.map((name) => ({ name, count: 0 }));
    localStorage.setItem('eat_count', JSON.stringify({ eatCounts }));
  }

  const storedData = JSON.parse(localStorage.getItem('eat_count') || '{}');
  const eatCounts = storedData.eatCounts as EatData[];

  console.log(eatCounts);

  // user の名前だけを取り出して配列にする
  return eatCounts.map((eatCount) => eatCount.name);
};

export const AddUserEatCount = (name: string): void => {
  const storedData = JSON.parse(localStorage.getItem('eat_count') || '{}');
  const eatCounts = storedData.eatCounts || [];

  const newEatCounts = eatCounts.map((eatCount: EatData) => {
    if (eatCount.name === name) {
      return { name, count: eatCount.count + 1 };
    }
    return eatCount;
  });

  localStorage.setItem('eat_count', JSON.stringify({ eatCounts: newEatCounts }));
};

export const GetTotalUserEatCount = (): number => {
  const storedData = JSON.parse(localStorage.getItem('eat_count') || '{}');
  const eatCounts = storedData.eatCounts as EatData[];
  return eatCounts.reduce((acc, eatCount) => acc + eatCount.count, 0);
};
