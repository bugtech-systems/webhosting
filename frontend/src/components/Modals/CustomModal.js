import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Input from '@mui/material/Input';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { useEffect } from 'react';
import { useState } from 'react';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%', // Adjusted for mobile view
  maxWidth: 600, // Set maximum width for larger screens
  bgcolor: 'background.paper',
  border: '2px solid #000',
  borderRadius: 5,
  boxShadow: 24,
  p: 4,
};

export default function CustomModal({ open, handleClose, values }) {
    const [selectedRef, setSelectedRef] = useState('');
    const [inputValues, setInputValues] = useState({
        databaseName: '',
        collectionName: ''
    });
    
    const handleCreate = async () => {
        handleCancel()
        setSelectedRef('')
        alert(`Created ${values[0].value} successfully`)
    }

    const handleInputChange = (title, value) => {
        console.log(value, title)
      setInputValues(prevState => ({
        ...prevState,
        [title]: value,
      }));
    };
    
    
    const handleSelected = async (event) => {
        setSelectedRef(event.target.value)
    }
    
    const handleCancel = async () => {
        handleClose()
        setInputValues('')
    }
    
    useEffect(() => {
        console.log(values, "OUR VALUES")
        
    },[values, inputValues])
    
  return (
    <div>
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="dynamic-modal-title"
        aria-describedby="dynamic-modal-description"
      >
        <Box sx={style}>
          <Typography id="dynamic-modal-title" variant="h6" component="h2">
            Creating Database
          </Typography>

          {/* First Dynamic Input Field */}
          {values.map((item) => (
          <>
            {item.title.map((e, index) => (
                <>
                <Typography key={index} sx={{ mt: 2 }} variant="subtitle1">
                {e}
            <Tooltip title="" arrow>
              <IconButton size="small">
                <HelpOutlineIcon />
              </IconButton>
            </Tooltip>
          </Typography>

          <Input
            key={index}
            fullWidth 
            variant="outlined" 
            sx={{ 
                borderRadius: '12px', 
                mt: 1 
                }} 
            value={inputValues[e]}
            onChange={(a) => handleInputChange(e, a.target.value)}
            />

          </>
          ))}
          
          {/* Dropdown Field */}
          <Typography sx={{ mt: 2 }} variant="subtitle1">
            Additional Reference
          </Typography>
          <Select
        value={selectedRef}
        onChange={handleSelected}
        fullWidth
        variant="outlined"
        sx={{ borderRadius: '12px', mt: 1 }}
      >
        {item.additionalPreference
            .map((option, index) => (
          <MenuItem key={index} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
          </>
          ))}
          

          {/* Second Dynamic Input Field */}

          

          {/* Buttons */}
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant="contained" color="primary" sx={{ mr: 1 }} disabled={!inputValues || !selectedRef ? true : false} onClick={handleCreate}>
              Create
            </Button>
            <Button variant="contained" color="inherit" onClick={handleCancel}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}