import { useEffect, useState } from 'react';
import styles from './App.module.css';
import { saveEatCount, getTotalUserEatCount, getUserEatCounts } from './utils/EatCount';
import { EatData } from './types/EatData';

function App() {
  const [eatCounts, setEatCounts] = useState<EatData[]>([]);

  const addCount = (name: string) => {
    console.log(name);
    setEatCounts((prev) => {
      return prev.map((data) => {
        if (data.name === name) return { name, count: data.count + 1 };
        return data;
      });
    });
  };

  const total = getTotalUserEatCount(eatCounts);

  const getColorForName = (name: string) => {
    // 名前に基づいて色を生成するロジック
    const hash = Array.from(name).reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const color = `hsl(${hash % 360}, 70%, 50%)`;
    return color;
  };

  useEffect(() => {
    setEatCounts(getUserEatCounts());
  }, []);

  useEffect(() => {
    if (eatCounts.length === 0) return;
    saveEatCount(eatCounts);
  }, [eatCounts]);

  return (
    <>
      <h1>
        合計&nbsp;
        {total}
      </h1>
      <main>
        {eatCounts.map(({ name, count }) => (
          <>
            <div>
              <p
                key={name}
                className={styles.userName}
                style={{ '--user-name-color': getColorForName(name) } as React.CSSProperties}
              >
                {name}
              </p>
              <p className={styles.count}>{`${count}本`}</p>
            </div>
            <button key={name} onClick={() => addCount(name)} type="button">
              食べた
            </button>
          </>
        ))}
      </main>
    </>
  );
}

export default App;
