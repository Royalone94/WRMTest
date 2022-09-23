import { useState, useEffect } from 'react';
import styled from 'styled-components';

import Pagination from '@mui/material/Pagination';
import { Modal, Box, TextField } from '@mui/material';

import { Table } from '../../components/Table';
import { Loader } from '../../components/Loader';

import { SearchBox } from '../../components/SearchBox';
import {toast} from 'react-toastify';

// import api
import { findAllUsers, findUser, deleteUser, updateUser, addUser } from '../../apis/api';

const PageWrapper = styled.div`
  display: flex;
  width: 100%;
  max-width: 1315px;
  padding-top: 80px;
  padding-bottom: 38px;
  flex-direction: column;
`;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledPaginationContainer = styled.div`
  padding-top: 38px;
  display: flex;
  justify-content: flex-end;

  @media ${(props) => props.theme.bkps.device.mobile} {
    justify-content: center;
  }
`;

const Label = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 30px;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media ${(props) => props.theme.bkps.device.mobile} {
    text-align: center;
    flex-direction: column;
  }
`;

const Button = styled.button`
  background: #ffcc00;
  border: none;
  border-radius: 5px;
  color: brown;
  width: 100px;
  cursor: pointer;
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

const Users = () => {
  const [page, setPage] = useState(1);
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState('');
  const [username, setUsername] = useState('');
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const onUsernameChange = (event) => setUsername(event.target.value);
  const onFirstNameChange = (event) => setFirstName(event.target.value);
  const onLastNameChange = (event) => setLastName(event.target.value);
  const onEmailChange = (event) =>  setEmail(event.target.value);

  const handleAddBtn = async () => {
    const response = await addUser(
      {
        username,
        first_name: firstname,
        last_name: lastname,
        email
      }
    );

    if (response) {
      toast('Successfully Added');
      setOpen(false);
    } else {
      console.log('error')
    }
  }

  // vars
  const headers = ['HN', 'UserName', 'FirstName', 'LastName', 'Email'];
  const filteredUsers = users?.filter((data) =>
    data.username.includes(query),
  );
  const userRows = filteredUsers
    ?.slice((page - 1) * 20, page * 20)
    .map((user) => {
      const { username, first_name, last_name, email, _id } = user;
      return {
        HN: [`<a href='/users/${_id}'>${_id}</a>`, 'html'],
        UserName: [`${username}`, 'plainText'],
        FirstName: [`${first_name}`, 'plainText'],
        LastName: [`${last_name}`, 'plainText'],
        Email: [`${email}`, 'plainText'],
      };
    });
  const totalPages =
    filteredUsers?.length === 0 ? 1 : filteredUsers?.length / 20;

  useEffect(() => {
    (async () => {
      const users = await findAllUsers();
      setUsers(users);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const onPageChange = (_ignore, newPageNumber) => {
    setPage(newPageNumber);
  };

  const onSearch = (query) => {
    setQuery(query);
  };

  return (
    <PageWrapper>
      <StyledContainer>
        <Label>
          Master Table Page
          <SearchBox placeholder="Search for Users by Username" onSearch={onSearch} />
        </Label>
        <Table headers={headers} rows={userRows} />
        {users?.length === 0 && <Loader />}
      </StyledContainer>
      <StyledPaginationContainer>
        <Button onClick={handleOpen}>ADD USER</Button>
        <Pagination
          count={totalPages ?? 0}
          page={page}
          shape="rounded"
          onChange={onPageChange}
        />
      </StyledPaginationContainer>
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
            <button onClick={handleAddBtn} style={{ width: '100px', height: '40px', alignSelf: 'center' }}>Add</button>
            <button onClick={handleClose} style={{ width: '100px', height: '40px', alignSelf: 'center' }}>Cancel</button>
          </div>
        </Box>
      </Modal>
    </PageWrapper>
  );
};

export default Users;
