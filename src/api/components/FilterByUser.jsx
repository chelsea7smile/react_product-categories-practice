import React from 'react';

const FilterByUser = ({ users, selectedUser, setSelectedUser }) => {
  return (
    <div className="panel-tabs has-text-weight-bold">
      <a
        data-cy="FilterAllUsers"
        href="#/"
        onClick={() => setSelectedUser(null)}
        className={!selectedUser ? 'is-active' : ''}
      >
        All
      </a>
      {users.map((user) => (
        <a
          data-cy="FilterUser"
          href="#/"
          key={user.id}
          onClick={() => setSelectedUser(user)}
          className={selectedUser && selectedUser.id === user.id ? 'is-active' : ''}
        >
          {user.name}
        </a>
      ))}
    </div>
  );
};

export default FilterByUser;