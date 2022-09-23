import {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import styled from 'styled-components';
import { Modal, Box, TextField } from '@mui/material';
import {toast} from 'react-toastify';

// import api
import {findAllUsers, findUser, deleteUser, updateUser, addUser} from '../../../apis/api';


const PageWrapper = styled.div`
  display: flex;
  width: 100%;
  padding-bottom: 38px;
  flex-direction: column;
  align-items: center;

  @media ${(props) => props.theme.bkps.device.mobile} {
    padding-top: 80px;
  }
`;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  padding-top: 80px;
`;

const Label = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 30px;
  color: white;
  margin-bottom: 10px;
  margin-top: 10px;
  margin-left: 15px;

  @media ${(props) => props.theme.bkps.device.mobile} {
    text-align: center;
  }
`;

const Button = styled.button`
  background: black;
  border: none;
  color: white;
  width: 100px;
  cursor: pointer;
  font-size: 16px;
  margin-left: -10px;
  margin-bottom: 30px;
`;

const DetailCard = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px;
  color: white;
`;

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: '#111111',
  border: '1px solid #ffcc00',
  borderRadius: '5px',
  p: 4,
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column'
};

const User = () => {
  const [user, setUser] = useState();

  const [username, setUsername] = useState('');
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [open, setOpen] = useState(false);

  // hooks
  const location = useLocation();

  // var
  const id = location.pathname.split('/')[2];

  useEffect(() => {
    (async () => {
      await loadData();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const loadData = async () => {
    const user = await findUser(id);
    setUser(user);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const onUsernameChange = (event) => setUsername(event.target.value);
  const onFirstNameChange = (event) => setFirstName(event.target.value);
  const onLastNameChange = (event) => setLastName(event.target.value);
  const onEmailChange = (event) =>  setEmail(event.target.value);

  const handleUpdateBtn = async () => {
    const response = await updateUser(
      id,
      {
        username,
        first_name: firstname,
        last_name: lastname,
        email
      }
    );

    if (response) {
      toast('Successfully Updated');
      setOpen(false);
    } else {
      console.log('error')
    }
  }

  const handleRemoveBtn = async () => {
    const response = await deleteUser(id);

    if (response) {
      toast('Successfully Deleted');
      window.history.back();
    } else {
      console.log('error')
    }
  }

  return (
    <PageWrapper>
      <StyledContainer>
        <Button onClick={() => window.history.back()}>{`<`} Back</Button>
        <Label>User Detail Page</Label>
        <DetailCard>
          <div>{`HN:${user?._id}`}</div>
          <div>{`UserName:${user?.username}`}</div>
          <div>{`FirstName:${user?.first_name}`}</div>
          <div>{`LastName:${user?.last_name}`}</div>
          <div>{`Email:${user?.email}`}</div>
        </DetailCard>
        <div style={{marginTop: '10px'}}>
            <button onClick={handleOpen} style={{ width: '100px', height: '40px', alignSelf: 'center' }}>Update</button>
            <button onClick={handleRemoveBtn} style={{ width: '100px', height: '40px', alignSelf: 'center' }}>Delete</button>
          </div>
      </StyledContainer>
      <Modal
        open={open}
        onClose={handleClose}
      >
        <Box sx={style}>
          <TextField id="username" label="Username" variant="outlined" sx={{ m: 1, width: 'reset' }} required value={username}
            onChange={onUsernameChange} />
          <TextField id="firstname" label="FirstName" variant="outlined" sx={{ m: 1, width: 'reset' }} required value={firstname}
            onChange={onFirstNameChange} />
          <TextField id="lastname" label="LastName" variant="outlined" sx={{ m: 1, width: 'reset' }} required value={lastname}
            onChange={onLastNameChange} />
          <TextField id="email" label="Email" variant="outlined" sx={{ m: 1, width: 'reset' }} required value={email}
            onChange={onEmailChange} />
          <div style={{marginTop: '10px'}}>
            <button onClick={handleUpdateBtn} style={{ width: '100px', height: '40px', alignSelf: 'center' }}>Update</button>
            <button onClick={handleClose} style={{ width: '100px', height: '40px', alignSelf: 'center' }}>Cancel</button>
          </div>
        </Box>
      </Modal>
    </PageWrapper>
  );
};

export default User;
