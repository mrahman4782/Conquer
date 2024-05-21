import React, { useEffect, useState } from 'react';
import { Container, Typography, Grid, Card, CardContent, Button, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import getAllGroups from '../../functions/getAllGroups';
import Message from './../../components/alertMessage/alertMessage';

function Groups() {
  const [groupChats, setGroupChats] = useState([]);
  const [checkClicked, setCheckClicked] = useState([]);
  const [userProfile, setUserProfile] = useState('');
  const [showErrMsg, setShowErrMsg] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const setAllGroups = async () => {
      try {
        const data = await getAllGroups();
        setGroupChats(data.data);
        setCheckClicked(Array(data.data.length).fill(false)); // Initialize the checkClicked state based on the data length
      } catch (error) {
        setErrorMessage("Failed to fetch groups");
        setShowErrMsg(true);
      }
    };

    setAllGroups();
  }, []);

  const handleIconClick = (index) => {
    const newClicked = [...checkClicked];
    newClicked[index] = true;
    setCheckClicked(newClicked);
  };

  return (
    <Container>
      <div className="headerText">
        <h1>Join a group!</h1>
      </div>
      {showErrMsg && <Message message={errorMessage} />}
      <Grid container spacing={1}>
        {groupChats ? groupChats.map((group, index) => (
          <Grid item xs={12} sm={6} key={group.id}>
            <Card style={{ borderRadius: '10px', boxShadow: 'none', position: 'relative' }}>
              <CardContent>
                <Typography variant="h6">{group.chatName}</Typography>
                <div style={{ width: '30px', height: '30px', position: 'absolute', top: 10, right: 10 }}>
                  <IconButton
                    size="small"
                    style={{ padding: '0', width: '30px', height: '30px' }}
                    onClick={() => handleIconClick(index)}
                  >
                    {checkClicked[index] ? <CheckIcon style={{ fontSize: '16px' }} /> : <AddIcon style={{ fontSize: '16px' }} />}
                  </IconButton>
                </div>
              </CardContent>
            </Card>
          </Grid>
        )) : null}
      </Grid>
      <Grid container spacing={2} justifyContent="center" style={{ marginTop: '10px' }}>
        <Grid item xs={12}>
          <Button variant="contained" fullWidth style={{ backgroundColor: 'black' }}>
            Create New Group
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Groups;
