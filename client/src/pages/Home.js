import '../styles/Home.css';
import React, { useState, useEffect, useRef } from 'react';

//ICON IMPORTS
import { ImBin } from 'react-icons/im';
import {
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiFillTwitterCircle,
  AiOutlineEdit,
} from 'react-icons/ai';

//MUI IMPORTS

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
import Tooltip from '@mui/material/Tooltip';
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
  //This data is used for the eventuality that there is a need for a list of all quotes regardless of the modifications sustained by
  //The array that is used for displaying cards
  const [data, setData] = useState([]);

  //The array used for displaying
  const [extendedData, setExtendedData] = useState([]);

  //If i had a premium key these would be used for sending the variables to the be
  const [category, setCategory] = useState('Random');
  const [number, setNumber] = useState(1);

  const [open, setOpen] = useState(false);
  const [editMsg, setEditMsg] = useState('');
  const [editOpen, setEditOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const pElementRef = useRef(null);

  const [index, setIndex] = useState(0);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  //on first load fetch data
  useEffect(() => {
    fetchData();
  }, []);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  //The post method is the same as get because the api only allows for a limited amount of requests
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
      //if i had a premium api key this would be how i sent variables to be then to the api
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

      const updatedData = [...extendedData, ...jsonData];
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
    // Disable the button to prevent multiple clicks during the delay
    setIsButtonDisabled(true);

    // Add a 1-second (1000 milliseconds) delay
    setTimeout(() => {
      // Enable the button after the delay
      setIsButtonDisabled(false);
    }, 1000); // 1000 milliseconds = 1 second

    // Your other click event logic here
  };
  const handleRemoveSubmit = (indexToRemove) => {
    console.log(index);
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
  const handleClickOpenDeleteConfirmation = (indexToDelete) => {
    console.log(indexToDelete);
    setIndex(indexToDelete);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleCloseEdit = (indexToEdit) => {
    const updatedData = [...extendedData];
    updatedData[indexToEdit].q = pElementRef.current.innerText;

    setExtendedData([...updatedData]);
    setEditOpen(false);
  };
  const handleEdit = (indexToEdit) => {
    setEditMsg(extendedData[indexToEdit].q);
    setIndex(indexToEdit);
    setEditOpen(true);
  };

  return (
    <div>
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
              fontFamily: "'Young Serif', 'serif'",
              color: 'var(--text_color)',
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
              fontFamily: "'Young Serif', 'serif'",
              height: '5vh',
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
            style={{
              fontSize: '1.2vw',
              fontFamily: "'Young Serif', 'serif'",
              color: 'var(--text_color)',
            }}
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
              fontFamily: "'Young Serif', 'serif'",
              height: '5vh',
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
              fontFamily: "'Young Serif', 'serif'",
              marginTop: '2vh',
              width: '17vw',
              fontSize: '0.7vw',
              background: 'var(--quote_card_background)',
              color: 'var(--text_color)',
            }}
            disabled={isButtonDisabled}
          >
            Add more Quotes
          </Button>
        </div>
      </Box>
      <div className="quotesContainer">
        {loading && (
          <Stack sx={{ width: '100%', color: 'grey.500', position: 'fixed' }}>
            <LinearProgress color="success" />
          </Stack>
        )}

        {extendedData?.map((item, index) => (
          <div className="card" id={index} key={index}>
            <div className="modifiersTop">
              <Tooltip
                title="Edit"
                arrow
                placement="top-start"
                enterDelay={200}
                leaveDelay={200}
              >
                <div>
                  <AiOutlineEdit
                    className="edit"
                    onClick={() => handleEdit(index)}
                  />
                </div>
              </Tooltip>
              <Tooltip
                title="Share to twitter"
                arrow
                placement="top-end"
                enterDelay={200}
                leaveDelay={200}
              >
                <a
                  className="twitter-share-button"
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                    extendedData[index].q
                  )}&url=${encodeURIComponent(window.location.href)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <AiFillTwitterCircle className="twitter" />
                </a>
              </Tooltip>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignContent: 'center',
              }}
            >
              <div className="quoteCard">
                <div className="quote">"{item.q}"</div>
                <div className="author">
                  <p style={{ fontFamily: "'Cedarville Cursive', 'cursive'" }}>
                    ~ {item.a} ~
                  </p>
                </div>
              </div>
            </div>
            <div className="modifiers">
              <Tooltip
                title="Move this quote to the left"
                arrow
                placement="bottom-start"
                enterDelay={200}
                leaveDelay={200}
              >
                <div>
                  <AiOutlineArrowLeft
                    className="order"
                    onClick={() => handleMoveUp(index)}
                  />
                </div>
              </Tooltip>
              <Tooltip
                title="Remove this Quote"
                arrow
                placement="bottom"
                enterDelay={200}
                leaveDelay={200}
              >
                <div>
                  <ImBin
                    className="bin"
                    onClick={() => handleClickOpenDeleteConfirmation(index)}
                  />
                </div>
              </Tooltip>
              <Tooltip
                title="Move this quote to the right"
                arrow
                placement="bottom-end"
                enterDelay={200}
                leaveDelay={200}
              >
                <div>
                  <AiOutlineArrowRight
                    className="order"
                    onClick={() => handleMoveDown(index)}
                  />
                </div>
              </Tooltip>
            </div>
          </div>
        ))}
      </div>
      <Dialog
        open={editOpen}
        Style={{ background: '#2E3B55' }}
        onClose={() => setEditOpen(false)}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle
          id="responsive-dialog-title"
          style={{ textAlign: ' center' }}
        >
          {'Edit your quote!'}
        </DialogTitle>
        <DialogContent style={{ Width: '30vh', minHeight: '25vh' }}>
          <p contenteditable="true" class="text" ref={pElementRef}>
            {editMsg}
          </p>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleCloseEdit(index)}>Save</Button>
        </DialogActions>
      </Dialog>
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
          <DialogContentText>This action is irreversible!</DialogContentText>
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
    </div>
  );
}

export default Home;
