import React, { useEffect, useState } from 'react';
import { Container, Typography, Grid, Card, CardContent, Button, IconButton, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import getAllGroups from '../../functions/getAllGroups';
import createGroup from '../../functions/createGroup';
import joinGroup from '../../functions/joinGroup';
import responsiveGroupTrack from '../../functions/responsiveGroupTrack';

import Message from './../../components/alertMessage/alertMessage';

function Groups() {
  const [groupChats, setGroupChats] = useState([]);
  const [checkClicked, setCheckClicked] = useState([]);
  const [userProfile, setUserProfile] = useState('');
  const [showErrMsg, setShowErrMsg] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [newGroupClicked, setNewGroupClicked] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [fetchGroups, setFetchGroups] = useState(true); // State to control fetching groups
  const [type, setType] = useState('failure');


  useEffect(() => {
    const setAllGroups = async () => {
      try {
        const data = await getAllGroups();
        setGroupChats(data.data);
        setCheckClicked(Array(data.data.length).fill(false)); // Initialize the checkClicked state based on the data length
      } catch (error) {
        setErrorMessage('Failed to fetch groups. Please ensure you are logged in');
        setShowErrMsg(true);
        setType('failure');
        setTimeout(() => {
          setShowErrMsg(false);
        }, 2000);
    
      }
    };

    if (fetchGroups) {
      setAllGroups();
      responsiveGroupTrack.updateBoolVal();
      setFetchGroups(false); // Reset the fetch flag to prevent infinite loop
    }
  }, [fetchGroups]); // Only depend on fetchGroups

  const handleIconClick = async (index, group) => {
    const newClicked = [...checkClicked];
    newClicked[index] = true;
    setCheckClicked(newClicked);
    try {
      console.log("hi")
      await joinGroup(group.id);

    } catch (error) {
      console.log(error);
    }
  };

  const createGroupButton = async () => {
    // Handle the form submission logic here
    console.log('Submit new group:', groupName);
    setFetchGroups(true); 
    try {
      await createGroup(groupName);
      setType('success');
      setErrorMessage('Successfully created group');
      setShowErrMsg(true);
      setTimeout(() => {
        setShowErrMsg(false);
      }, 2000);
    } catch (error) {
      setType('failure');
      setErrorMessage('Failed to create group. Try again later.');
      setShowErrMsg(true);
      setTimeout(() => {
        setShowErrMsg(false);
      }, 2000);
    }

  };

  const handleGroupNameChange = (event) => {
    setGroupName(event.target.value);
  };

  const newGroupButton = () => {
    setNewGroupClicked(!newGroupClicked);
  };

  return (
    <Container>
      <div className="headerText">
        <h1>Join a group!</h1>
      </div>
      {showErrMsg && <Message show={showErrMsg} message={errorMessage} type={type} />}
      <Grid container spacing={1}>
        {groupChats.map((group, index) => (
          <Grid item xs={12} sm={6} key={group.id}>
            <Card style={{ borderRadius: '10px', boxShadow: 'none', position: 'relative' }}>
              <CardContent>
                <Typography variant="h6">{group.chatName}</Typography>
                <div style={{ width: '30px', height: '30px', position: 'absolute', top: 10, right: 10 }}>
                  <IconButton
                    size="small"
                    style={{ padding: '0', width: '30px', height: '30px' }}
                    onClick={() => handleIconClick(index, group)}
                  >
                    {checkClicked[index] ? (
                      <CheckIcon style={{ fontSize: '16px' }} />
                    ) : (
                      <AddIcon style={{ fontSize: '16px' }} />
                    )}
                  </IconButton>
                </div>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Grid container spacing={2} justifyContent="center" style={{ marginTop: '10px' }}>
        <Grid item xs={12}>
          {newGroupClicked ? (
            <Card sx={{ marginBottom: '10px', boxShadow: 'none' }}>
              <CardContent>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={8}>
                  <TextField
                      type='new'
                      label="Enter group name"
                      variant="outlined"
                      fullWidth
                      value={groupName}
                      onChange={handleGroupNameChange}
                      sx= {{ borderRadius: '4px', padding: 0, margin: 0 }}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      onClick={createGroupButton}
                    >
                      Submit
                    </Button>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          ) : null}
          <Button
            variant="contained"
            fullWidth
            style={{ backgroundColor: 'black' }}
            onClick={newGroupButton}
          >
            Create New Group
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Groups;
