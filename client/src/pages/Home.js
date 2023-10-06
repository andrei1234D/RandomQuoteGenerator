import '../styles/Home.css';
import React, { useState, useEffect } from 'react';
import { ImBin } from 'react-icons/im';
import {
  AiOutlineArrowUp,
  AiOutlineArrowDown,
  AiFillTwitterCircle,
  AiOutlineEdit,
} from 'react-icons/ai';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

const apiKey = 'y5MJThH96B02OHR2ynL7PA==uSqAaXtmVNQSKsp9';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Home() {
  const [data, setData] = useState([]);
  const [extendedData, setExtendedData] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [category, setCategory] = useState('Random');
  const [number, setNumber] = useState(5);
  const [open, setOpen] = useState(false);

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  const handleChangeNr = (event) => {
    setNumber(event.target.value);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    let options;
    if (category === 'Random') {
      options = {
        method: 'GET',
        headers: {
          'X-Api-Key': apiKey,
        },
      };
    } else {
      options = {
        method: 'POST',
        headers: {
          'X-Api-Key': apiKey,
        },
      };
    }

    try {
      const apiUrl =
        category === 'Random'
          ? `http://localhost:8080/api/quotes?limit=${number}`
          : `http://localhost:8080/api/quotes?category=${category}&limit=${number}`;

      const response = await fetch(apiUrl, options);

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
    setData(updatedExtendedData);
    setExtendedData(updatedExtendedData);
  };
  const handleMoveUp = (indexToMove) => {
    if (indexToMove > 0) {
      const updatedExtendedData = [...extendedData]; // Copy the state array
      const movedItem = updatedExtendedData.splice(indexToMove, 1)[0]; // Remove the item
      updatedExtendedData.splice(indexToMove - 1, 0, movedItem); // Insert it at the new position

      // Update the state with the new array
      setExtendedData(updatedExtendedData);
    }
  };
  const handleMoveDown = (indexToMove) => {
    if (indexToMove < extendedData.length) {
      const updatedExtendedData = [...extendedData]; // Copy the state array
      const movedItem = updatedExtendedData.splice(indexToMove, 1)[0]; // Remove the item
      updatedExtendedData.splice(indexToMove + 1, 0, movedItem); // Insert it at the new position

      // Update the state with the new array
      setExtendedData(updatedExtendedData);
    }
  };
  const handleEdit = (indexToEdit) => {
    let txt = document.getElementById(indexToEdit);
    console.log(txt);
  };
  const handleClickOpenDeleteConfirmation = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <div>
        {extendedData?.map((item, index) => (
          <div className="card" id={index} key={index}>
            <div className="modifiersTop">
              <AiOutlineEdit
                size={30}
                className="edit"
                onClick={() => handleEdit(index)}
              />
              <AiFillTwitterCircle
                size={30}
                className="twitter"
                onClick={() => handleRemoveSubmit(index)}
              />
            </div>
            <div className="quoteCard">
              <div className="quote">"{item.quote}"</div>
              <div className="author">
                <p>~ {item.author} ~</p>
              </div>
            </div>
            <div className="modifiers">
              <AiOutlineArrowUp
                size={30}
                className="order"
                onClick={() => handleMoveUp(index)}
              />
              <ImBin
                size={30}
                className="bin"
                onClick={() => handleClickOpenDeleteConfirmation}
              />
              <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
              >
                <DialogTitle>{'Are you sure you want to delete?'}</DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-slide-description">
                    This action is not reversible,are you sure?
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>No</Button>
                  <Button onClick={handleRemoveSubmit(index)}>Yes</Button>
                </DialogActions>
              </Dialog>
              <AiOutlineArrowDown
                size={30}
                className="order"
                onClick={() => handleMoveDown(index)}
              />
            </div>
          </div>
        ))}
      </div>
      <Box
        style={{
          width: '33vw',
          marginLeft: '33vw',
          marginTop: '5vh',
          padding: '1vw',
          background: 'var(--card_background)',
        }}
      >
        <FormControl
          style={{ width: '50%', marginLeft: '25%', marginTop: '3vh' }}
        >
          <InputLabel
            id="demo-simple-select-label"
            style={{
              fontSize: '1.2vw',
            }}
          >
            Categories
          </InputLabel>
          <Select
            labelId="simple-select-label-category"
            id="demo-simple-select-category"
            value={category}
            label="Category"
            placeholder="Random"
            onChange={handleChange}
            style={{
              width: '17vw',
              fontSize: '1.2vw',
              background: 'var(--quote_card_background)',
            }}
          >
            <MenuItem value="Random">Random</MenuItem>
            <MenuItem value="age">Age</MenuItem>
            <MenuItem value="alone">Alone</MenuItem>
            <MenuItem value="amazing">Amazing</MenuItem>
            <MenuItem value="anger">Anger</MenuItem>
            <MenuItem value="architecture">Architecture</MenuItem>
            <MenuItem value="art">Art</MenuItem>
            <MenuItem value="attitude">Attitude</MenuItem>
            <MenuItem value="beauty">Beauty</MenuItem>
            <MenuItem value="best">Best</MenuItem>
            <MenuItem value="birthday">Birthday</MenuItem>
            <MenuItem value="business">Business</MenuItem>
            <MenuItem value="car">Car</MenuItem>
            <MenuItem value="change">Change</MenuItem>
            <MenuItem value="communications">Communications</MenuItem>
            <MenuItem value="computers">Computers</MenuItem>
            <MenuItem value="cool">Cool</MenuItem>
            <MenuItem value="courage">Courage</MenuItem>
            <MenuItem value="dad">Dad</MenuItem>
            <MenuItem value="dating">Dating</MenuItem>
            <MenuItem value="death">Death</MenuItem>
            <MenuItem value="design">Design</MenuItem>
            <MenuItem value="dreams">Dreams</MenuItem>
            <MenuItem value="education">Education</MenuItem>
            <MenuItem value="environmental">Environmental</MenuItem>
            <MenuItem value="equality">Equality</MenuItem>
            <MenuItem value="experience">Experience</MenuItem>
            <MenuItem value="failure">Failure</MenuItem>
            <MenuItem value="faith">Faith</MenuItem>
            <MenuItem value="family">Family</MenuItem>
            <MenuItem value="famous">Famous</MenuItem>
            <MenuItem value="fear">Fear</MenuItem>
            <MenuItem value="fitness">Fitness</MenuItem>
            <MenuItem value="food">Food</MenuItem>
            <MenuItem value="forgiveness">Forgiveness</MenuItem>
            <MenuItem value="freedom">Freedom</MenuItem>
            <MenuItem value="friendship">Friendship</MenuItem>
            <MenuItem value="funny">Funny</MenuItem>
            <MenuItem value="future">Future</MenuItem>
            <MenuItem value="god">God</MenuItem>
            <MenuItem value="good">Good</MenuItem>
            <MenuItem value="government">Government</MenuItem>
            <MenuItem value="graduation">Graduation</MenuItem>
            <MenuItem value="great">Great</MenuItem>
            <MenuItem value="happiness">Happiness</MenuItem>
            <MenuItem value="health">Health</MenuItem>
            <MenuItem value="history">History</MenuItem>
            <MenuItem value="home">Home</MenuItem>
            <MenuItem value="hope">Hope</MenuItem>
            <MenuItem value="humor">Humor</MenuItem>
            <MenuItem value="imagination">Imagination</MenuItem>
            <MenuItem value="inspirational">Inspirational</MenuItem>
            <MenuItem value="intelligence">Intelligence</MenuItem>
            <MenuItem value="jealousy">Jealousy</MenuItem>
            <MenuItem value="knowledge">Knowledge</MenuItem>
            <MenuItem value="leadership">Leadership</MenuItem>
            <MenuItem value="learning">Learning</MenuItem>
            <MenuItem value="legal">Legal</MenuItem>
            <MenuItem value="life">Life</MenuItem>
            <MenuItem value="love">Love</MenuItem>
            <MenuItem value="marriage">Marriage</MenuItem>
            <MenuItem value="medical">Medical</MenuItem>
            <MenuItem value="men">Men</MenuItem>
            <MenuItem value="mom">Mom</MenuItem>
            <MenuItem value="money">Money</MenuItem>
            <MenuItem value="morning">Morning</MenuItem>
            <MenuItem value="movies">Movies</MenuItem>
            <MenuItem value="success">Success</MenuItem>
          </Select>
        </FormControl>
        <FormControl
          style={{ width: '50%', marginLeft: '25%', marginTop: '3vh' }}
        >
          <InputLabel
            id="demo-simple-select-label"
            style={{ fontSize: '1.2vw' }}
          >
            Number of Quotes
          </InputLabel>
          <Select
            labelId="simple-select-label-number"
            id="simple-select-label-number"
            value={number}
            label="Number Select"
            onChange={handleChangeNr}
            style={{
              width: '17vw',
              fontSize: '1.2vw',
              background: 'var(--quote_card_background)',
            }}
          >
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={4}>4</MenuItem>
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={6}>6</MenuItem>
            <MenuItem value={7}>7</MenuItem>
            <MenuItem value={8}>8</MenuItem>
            <MenuItem value={9}>9</MenuItem>
            <MenuItem value={10}>10</MenuItem>
          </Select>
        </FormControl>

        <div className="addQuoteBtn">
          <Button
            variant="contained"
            onClick={handleClick}
            style={{
              marginTop: '2vh',
              width: '17vw',
              fontSize: '1.1vw',
              background: 'var(--quote_card_background)',
              color: '#4c4c4c',
            }}
          >
            Add more Quotes
          </Button>
        </div>
      </Box>
    </div>
  );
}

export default Home;
