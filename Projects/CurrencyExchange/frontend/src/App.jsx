import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import React, { useEffect } from 'react';
import './App.css'
import axios from 'axios'


function App() {
  const [data, setData] = useState([]);

  useEffect(()=>{
    axios.get('/data')
    .then((response)=>{
      setData(response.data)

    })
.catch((error)=>{
  console.log(error);
})
  })

  return (
    <>
    
      <h1>Currency Data</h1>
      <p>Currency: {data.length}</p>
      <p>Last Fetched: {data.published_on}</p>

      {data.map((data, index) => (
        <div key={data.iso3}>
          <h3>{data.name}</h3>
          <p>Sell : {data.sell}</p>
          <p>Buy : {data.buy}</p>


        </div>
      ))}

    </>
  );
}

export default App
