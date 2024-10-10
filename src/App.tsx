import { Fragment } from 'react/jsx-runtime';
import styles from './App.module.css';
import { AddUserEatCount, GetTotalUserEatCount, UserName } from './utils/EatCount';

function App() {
  const userName = UserName();

  const addCount = (name: string) => {
    console.log(name);
    AddUserEatCount(name);
  };

  const getTotal = GetTotalUserEatCount();

  const getColorForName = (name: string) => {
    // 名前に基づいて色を生成するロジック
    const hash = Array.from(name).reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const color = `hsl(${hash % 360}, 70%, 50%)`;
    return color;
  };

  return (
    <>
      <h1>
        合計&nbsp;
        {getTotal}
      </h1>
      <main>
        {userName.map((name) => (
          <Fragment key={name}>
            <p
              className={styles.userName}
              style={{ '--user-name-color': getColorForName(name) } as React.CSSProperties}
            >
              {name}
            </p>
            <button onClick={() => addCount(name)} type="button">
              食べた
            </button>
          </Fragment>
        ))}
      </main>
    </>
  );
}

export default App;
