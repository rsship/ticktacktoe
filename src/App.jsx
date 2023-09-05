import { useState, useCallback } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function generateGrid(size) {
  const grid = []; 
  for (let  i = 0;i<size;i++) {
    grid.push([...Array(size)]);
  }
  return grid;
}

function horizontalChecking(grid) {
  for (let i =0;i<grid.length;i++) {
    let d = new Set(grid[i]);
    if (!d.has(undefined) && d.size == 1) {
      return true;
    }
  }

  return false;
}

function verticalChecking(grid) {
  let i = 0;
  let j = 0;
  let temp = [];
  while(true) {
    temp.push(grid[i][j]);
    i +=1;
    if (i == grid.length) {
      j +=1;
      i = 0;
      let d = new Set(temp);
      if(!d.has(undefined) && d.size == 1) {
        return true; 
      }
      temp = [];
    }

    if (j == grid.length) {
      break;
    }
  }

  return false;
}

function subWinCase(array) {
  let temp = new Set(array);
  if (!temp.has(undefined) && temp.size == 1) {
    return true;
  }
  return false;
}


function diagnalChecking(grid) {
  
  let increment = 0;
  let decrement = grid.length-1;
  let temp  = [[], []];
  while(increment < grid.length) {
    temp[0].push(grid[increment][increment]); 
    temp[1].push(grid[increment][decrement]);
    increment +=1;
    decrement -=1;
  }

  if (subWinCase(temp[0])) {
    return true;
  }

  if (subWinCase(temp[1])) {
    return true;
  }

  return false;

}


function handlewinCase(grid) {
  ///horizontal;
  if (horizontalChecking(grid)) {
    return true;
  }

  // vertical 
  if (verticalChecking(grid)) {
    return true;
  }

  if (diagnalChecking(grid)) {
    return true;
  }

}

function App() {
  const [grid, setGrid] = useState(generateGrid(3));
  const [symbol, setSymbol] = useState("X");

  const handleClick = (i,j) => {
      grid[i][j] = symbol;
      setGrid([...grid]);
      if (handlewinCase(grid)) {
        console.log(`winner is ${symbol}`)
        setGrid(generateGrid(3))
      }
      setSymbol(symbol == "X" ? "O" : "X");
  }


  return (
    <>
      {grid.map((_, i) => {
        return (
          <div key={i+1} style={{
                display: "flex", 
          }}>
            {grid[i].map((_, j) => {
              return <div key={i*j} style={{
                width: "100px", 
                display: "flex", 
                height: "100px",
                border: "1px solid red",
                justifyContent: "center", 
                alignItems: "center"
              }} onClick={() => handleClick(i,j)}>{grid[i][j]}</div>
            })} 
          </div>);
      })}
    </>
  )
}

export default App
