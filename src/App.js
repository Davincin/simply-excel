import './App.css';
import { useCallback, useEffect, useState } from 'react';

function App() {

  const [n, setN] = useState(3);
  const [arr, setArr] = useState();
  const [allSub, setAllSub] = useState();

  useEffect(() => {
    handleFillFields();
  }, [n])


  useEffect(() => {
    Array.isArray(arr) && handleSubRows();
  }, [arr, n])


  const handleFillFields = () => {
    const rows = [];

    for(let i = 1; i <= n; i++) {
      rows.push({row: i - 1, values: []})
    }

    for(let row of rows) {
      for(let i = 1; i <= n; i++) {
        row.values.push({col: i - 1, value: Math.floor((Math.random() * 998) + 1)});
      }
    }
    setArr(rows);
  }

  const handleChangeValue = (e, row, col) => {
    const newArr = [...arr]

    if(Number(e.target.value) <= 999 && Number(e.target.value) >= 0) {
      newArr[`${row.row}`].values[col.col].value = e.target.value
    } else {
      return 0;
    }
    
    setArr(newArr)
    handleSubRows();
  }

  const handleSubRows = useCallback(() => {
    let allSub = 0;
    
    for(const row of arr) {
      let add = 0;
      
      for(const field of row.values) {
        add += Number(field.value);
      }

      row.sub = add;
      allSub += add;
    }

    setAllSub(allSub);
  }, [arr, n])

  const handleIncrementN = () => {
    if(n + 1 < 15) {
      setN(n+1);
    }
  };

  const handleDecrementN = () => {
    if(n - 1 >= 2) {
      setN(n-1);
    }
  };

  return (
    <>
      <div className="row">
        {arr && arr.map(row => (
          <div className="fields">
            {row.values.map(col => (
              <input key={`${row.row}${col.col}${col.value}`} className='field' type="number" value={col.value} onChange={e => handleChangeValue(e, row, col)}/>
            ))}
            <p readOnly className='fields__results'>{row.sub}</p>
          </div>
        ))}
        <p>Suma całej matrycy: {allSub}</p>
      </div>
      <div className="row">
        <p>Wielkość matrycy: {`${n} x ${n}`}</p>
        <div className="buttons">
        <button className='button button--increment' onClick={handleIncrementN} title='Powiększ matrycę'>+</button>
        <button className='button button--decrement' onClick={handleDecrementN} title='Zmniejsz matrycę'>-</button>
        </div>
      </div>
    </>
  );
}

export default App;
