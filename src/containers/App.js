import React, { useState, useEffect } from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import './App.css';

function App() {

  // robots 是一個 state，setRobots 是幫我們更改 state 的 function
  const [robots, setRobots] = useState([])
  const [searchfield, setSerachfield] = useState('')
  const [count,setCount] = useState(0)

  // 讓 useEffect 只跑一次要用 [] 當作第二個參數
  useEffect(()=>{
      fetch('https://jsonplaceholder.typicode.com/users')
        .then(response=> response.json())
        .then(users => {setRobots(users)});
      
  },[])

  const onSearchChange = (event) => {
    setSerachfield(event.target.value)
  }

  const filteredRobots = robots.filter(robot =>{
    return robot.name.toLowerCase().includes(searchfield.toLowerCase());
  })

  return !robots.length ?
    <h1>Loading</h1> :
    (
      <div className='tc'>
        <h1 className='f1'>RoboFriends</h1>
        <button onClick = {()=>setCount(count+1)}>Click Me!</button>
        <SearchBox searchChange={onSearchChange}/>
        <Scroll>
          <CardList robots={filteredRobots} />
        </Scroll>
      </div>
    );
  }


export default App;