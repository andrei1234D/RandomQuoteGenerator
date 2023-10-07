import '../styles/Home.css';
import React, { useState, useEffect, useRef } from 'react';
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
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';

import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

const menuItemData = [
  { value: 'Random', label: 'Random' },
  { value: 'Anxiety', label: 'Anxiety' },
  { value: 'Change', label: 'Change' },
  { value: 'Choice', label: 'Choice' },
  { value: 'Confidence', label: 'Confidence' },
  { value: 'Courage', label: 'Courage' },
  { value: 'Death', label: 'Death' },
  { value: 'Dreams', label: 'Dreams' },
  { value: 'Excellence', label: 'Excellence' },
  { value: 'Failure', label: 'Failure' },
  { value: 'Fairness', label: 'Fairness' },
  { value: 'Fear', label: 'Fear' },
  { value: 'Forgiveness', label: 'Forgiveness' },
  { value: 'Freedom', label: 'Freedom' },
  { value: 'Future', label: 'Future' },
  { value: 'Happiness', label: 'Happiness' },
  { value: 'Inspiration', label: 'Inspiration' },
  { value: 'Kindness', label: 'Kindness' },
  { value: 'Leadership', label: 'Leadership' },
  { value: 'Life', label: 'Life' },
  { value: 'Living', label: 'Living' },
  { value: 'Love', label: 'Love' },
  { value: 'Pain', label: 'Pain' },
  { value: 'Past', label: 'Past' },
  { value: 'Success', label: 'Success' },
  { value: 'Time', label: 'Time' },
  { value: 'Today', label: 'Today' },
  { value: 'Truth', label: 'Truth' },
  { value: 'Work', label: 'Work' },
];

function Home() {
  const [data, setData] = useState([]);
  const [extendedData, setExtendedData] = useState([]);
  const [category, setCategory] = useState('Random');
  const [number, setNumber] = useState(5);
  const [open, setOpen] = useState(false);
  const [editMsg, setEditMsg] = useState('');
  const [editOpen, setEditOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const pElementRef = useRef(null);
  useEffect(() => {
    fetchData();
  }, []);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  let options;
  const fetchData = async () => {
    setLoading(true);
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
    setLoading(false);
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
    setExtendedData(updatedExtendedData);
    setOpen(false);
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
  const handleClickOpenDeleteConfirmation = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleCloseEdit = (indexToEdit) => {
    const updatedData = [...extendedData];
    updatedData[indexToEdit].q = pElementRef.current.innerText;
    if (extendedData.length === 1) {
      setExtendedData([...updatedData]);
    } else updatedData.splice(indexToEdit, 1);
    setExtendedData([...updatedData]);
    setEditOpen(false);
  };
  const handleEdit = (indexToEdit) => {
    setEditMsg(extendedData[indexToEdit].q);
    setEditOpen(true);
  };

  return (
    <div>
      <div>
        {loading && (
          <Stack sx={{ width: '100%', color: 'grey.500', position: 'fixed' }}>
            <LinearProgress color="success" />
          </Stack>
        )}

        {extendedData?.map((item, index) => (
          <div className="card" id={index} key={index}>
            <div className="modifiersTop">
              <AiOutlineEdit
                size={30}
                className="edit"
                onClick={() => handleEdit(index)}
              />
              <Dialog
                open={editOpen}
                onClose={handleCloseEdit}
                aria-labelledby="responsive-dialog-title"
              >
                <DialogTitle
                  id="responsive-dialog-title"
                  style={{ textAlign: ' center' }}
                >
                  {'Edit your quote!'}
                </DialogTitle>
                <DialogContent>
                  <p contenteditable="true" class="text" ref={pElementRef}>
                    {editMsg}
                  </p>
                </DialogContent>
                <DialogActions>
                  <Button onClick={() => handleCloseEdit(index)}>Close</Button>
                </DialogActions>
              </Dialog>

              <a
                className="twitter-share-button"
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                  extendedData[index].q
                )}&url=${encodeURIComponent(window.location.href)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
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
                onClick={handleClickOpenDeleteConfirmation}
              />
              <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
              >
                <DialogTitle id="responsive-dialog-title">
                  {'Are you sure you want to delete this quote?'}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    This action is irreversible!
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button autoFocus onClick={handleClose}>
                    No
                  </Button>
                  <Button onClick={() => handleRemoveSubmit(index)} autoFocus>
                    Yes
                  </Button>
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
