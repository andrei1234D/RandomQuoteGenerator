import '../styles/Home.css';
import React, { useState, useEffect, useReducer } from 'react';
import { ImBin } from 'react-icons/im';
import { AiOutlineArrowUp, AiOutlineArrowDown } from 'react-icons/ai';
import Button from '@mui/material/Button';

let apiKey = 'y5MJThH96B02OHR2ynL7PA==uSqAaXtmVNQSKsp9';
const options = {
  method: 'GET',
  headers: {
    'X-Api-Key': apiKey,
  },
};
const apiURL = 'https://api.api-ninjas.com/v1/quotes?limit=5';

function Home() {
  const [data, setData] = useState([]);
  const [extendedData, setExtendedData] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(apiURL, options);
      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.statusText}`);
      }
      const jsonData = await response.json();
      // Combine existing data with the new data
      const updatedData = [...data, ...jsonData];
      setData(updatedData);
      setExtendedData(updatedData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    fetchData();
  };
  const handleRemoveSubmit = (indexToRemove) => {
    const updatedExtendedData = [...extendedData];
    updatedExtendedData.splice(indexToRemove, 1);
    console.log(extendedData);
  };
  return (
    <div>
      <div>
        {extendedData?.map((item, index) => (
          <div className="card" id={index}>
            <div className="quoteCard">
              <div className="quote">"{item.quote}"</div>
              <div className="author">
                <p>~ {item.author} ~</p>
              </div>
            </div>
            <div className="modifiers">
              <AiOutlineArrowUp size={30} className="order" />
              <ImBin
                size={30}
                className="bin"
                onClick={() => handleRemoveSubmit(index)}
              />
              {console.log(extendedData)}
              <AiOutlineArrowDown size={30} className="order" />
            </div>
          </div>
        ))}
      </div>

      <div className="addQuoteBtn">
        <Button
          variant="contained"
          onClick={handleClick}
          style={{ marginTop: '2vh' }}
        >
          Add more Quotes
        </Button>
      </div>
    </div>
  );
}

export default Home;
