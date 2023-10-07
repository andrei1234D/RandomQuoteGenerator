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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const menuItemData = [
  { value: 'Random', label: 'Random' },
  { value: 'age', label: 'Age' },
  { value: 'alone', label: 'Alone' },
  { value: 'amazing', label: 'Amazing' },
  { value: 'anger', label: 'Anger' },
  { value: 'architecture', label: 'Architecture' },
  { value: 'art', label: 'Art' },
  { value: 'attitude', label: 'Attitude' },
  { value: 'beauty', label: 'Beauty' },
  { value: 'best', label: 'Best' },
  { value: 'birthday', label: 'Birthday' },
  { value: 'business', label: 'Business' },
  { value: 'car', label: 'Car' },
  { value: 'change', label: 'Change' },
  { value: 'communications', label: 'Communications' },
  { value: 'computers', label: 'Computers' },
  { value: 'cool', label: 'Cool' },
  { value: 'courage', label: 'Courage' },
  { value: 'dad', label: 'Dad' },
  { value: 'dating', label: 'Dating' },
  { value: 'death', label: 'Death' },
  { value: 'design', label: 'Design' },
  { value: 'dreams', label: 'Dreams' },
  { value: 'education', label: 'Education' },
  { value: 'environmental', label: 'Environmental' },
  { value: 'equality', label: 'Equality' },
  { value: 'experience', label: 'Experience' },
  { value: 'failure', label: 'Failure' },
  { value: 'faith', label: 'Faith' },
  { value: 'family', label: 'Family' },
  { value: 'famous', label: 'Famous' },
  { value: 'fear', label: 'Fear' },
  { value: 'fitness', label: 'Fitness' },
  { value: 'food', label: 'Food' },
  { value: 'forgiveness', label: 'Forgiveness' },
  { value: 'freedom', label: 'Freedom' },
  { value: 'friendship', label: 'Friendship' },
  { value: 'funny', label: 'Funny' },
  { value: 'future', label: 'Future' },
  { value: 'god', label: 'God' },
  { value: 'good', label: 'Good' },
  { value: 'government', label: 'Government' },
  { value: 'graduation', label: 'Graduation' },
  { value: 'great', label: 'Great' },
  { value: 'happiness', label: 'Happiness' },
  { value: 'health', label: 'Health' },
  { value: 'history', label: 'History' },
  { value: 'home', label: 'Home' },
  { value: 'hope', label: 'Hope' },
  { value: 'humor', label: 'Humor' },
  { value: 'imagination', label: 'Imagination' },
  { value: 'inspirational', label: 'Inspirational' },
  { value: 'intelligence', label: 'Intelligence' },
  { value: 'jealousy', label: 'Jealousy' },
  { value: 'knowledge', label: 'Knowledge' },
  { value: 'leadership', label: 'Leadership' },
  { value: 'learning', label: 'Learning' },
  { value: 'legal', label: 'Legal' },
  { value: 'life', label: 'Life' },
  { value: 'love', label: 'Love' },
  { value: 'marriage', label: 'Marriage' },
  { value: 'medical', label: 'Medical' },
  { value: 'men', label: 'Men' },
  { value: 'mom', label: 'Mom' },
  { value: 'money', label: 'Money' },
  { value: 'morning', label: 'Morning' },
  { value: 'movies', label: 'Movies' },
  { value: 'success', label: 'Success' },
];
const menuItemData2 = Array.from({ length: 10 }, (_, index) => ({
  value: index + 1,
  label: String(index + 1),
}));
function Home() {
  const [data, setData] = useState([]);
  const [extendedData, setExtendedData] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [category, setCategory] = useState('Random');
  const [number, setNumber] = useState(5);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);
  let options;
  const fetchData = async () => {
    if (category === 'Random') {
      options = {
        method: 'GET',
      };
    } else {
      options = {
        method: 'POST',
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

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  const handleChangeNr = (event) => {
    setNumber(event.target.value);
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
              <a class="twitter" target="blank" id={`twitter${index}`}>
                <AiFillTwitterCircle size={30} className="twitter" />
              </a>
            </div>
            <div className="quoteCard">
              <div className="quote">"{item.q}"</div>
              <div className="author">
                <p>~ {item.a} ~</p>
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
            {menuItemData.map((item) => (
              <MenuItem key={item.value} value={item.value}>
                {item.label}
              </MenuItem>
            ))}
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
            {Array.from({ length: 10 }, (_, index) => (
              <MenuItem key={index + 1} value={index + 1}>
                {index + 1}
              </MenuItem>
            ))}
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
