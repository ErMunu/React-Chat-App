import React, { useEffect, useState } from 'react';
import TollIcon from '@mui/icons-material/Toll';
import InsertCommentIcon from '@mui/icons-material/InsertComment';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import './Sidebar.css';
import UserProfile from './UserProfile';
import db from '../firebase';
function Sidebar({ currentUser, signOut }) {
  const [allUsers, setAllUsers] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [friendList, setFriendList] = useState([]);
  const [users, setUsers] = useState(false);

  useEffect(() => {
    const getAllUsers = async () => {
      const data = await db.collection('users').onSnapshot((snapshot) => {
        setAllUsers(
          snapshot.docs.filter((doc) => doc.data().email !== currentUser?.email)
        );
      });
    };

    const getFriends = async () => {
      const data = await db
        .collection('Friendlist')
        .doc(currentUser.email)
        .collection('list')
        .onSnapshot((snapshot) => {
          setFriendList(snapshot.docs);
        });
    };

    getAllUsers();
    getFriends();
  }, []);

  const searchedUser = allUsers.filter((user) => {
    if (searchInput) {
      if (
        user.data().fullname.toLowerCase().includes(searchInput.toLowerCase())
      ) {
        return user;
      }
      return null;
    }
  });

  const searchItem = searchedUser.map((user) => {
    return (
      <UserProfile
        name={user.data().fullname}
        photoURL={user.data().photoURL}
        key={user.id}
        email={user.data().email}
      />
    );
  });

  const showUsers = () => {
    setUsers(!users);
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-header-img">
          <img src={currentUser?.photoURL} alt="" />
        </div>
        <div className="name">{currentUser.fullname}</div>
        <div className="sidebar-header-btn">
          <TollIcon />
          <InsertCommentIcon className="btnClicked" onClick={showUsers} />
          <MoreVertIcon className="btnClicked" onClick={signOut} />
        </div>
      </div>

      <div className="sidebar-search">
        <div className="sidebar-search-input">
          <SearchIcon />
          <input
            type="text"
            name="search"
            placeholder="Search..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>
      </div>

      <div className="sidebar-chat-list">
        {users === true ? (
          <div>
            <p className='new-friend'>Add New Chat</p>
            {allUsers.map((user) => (
              <UserProfile
                name={user.data().fullname}
                photoURL={user.data().photoURL}
                email={user.data().email}
              />
            ))}
          </div>
        ) : searchItem.length > 0 ? (
          searchItem
        ) : (
          friendList.map((friend) => (
            <UserProfile
              name={friend.data().fullname}
              photoURL={friend.data().photoURL}
              lastMessage={friend.data().lastMessage}
              email={friend.data().email}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default Sidebar;
