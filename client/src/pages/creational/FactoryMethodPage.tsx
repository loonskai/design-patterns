import React, { useState } from 'react';
import { ROLE_TYPES, USERS, User } from '../mocks/users';

type RoleInstance = {
  getUsers(): User[];
}

const getRoleInstance = (type: string): RoleInstance => {
  switch (type) {
  case ROLE_TYPES.customer: return {
    getUsers() {
      return USERS.map(({ name, username, ...toExclude }) => ({ name, username }));
    }
  };
  case ROLE_TYPES.moderator: return {
    getUsers() {
      return USERS.map(({ name, username, email, phone, ...toExclude }) => ({
        name, username, email, phone
      }));
    }
  };
  case ROLE_TYPES.admin: return {
    getUsers() {
      return USERS;
    }
  };
  default: return {
    getUsers() {
      return [];
    }
  };
  }
};

export default function FactoryMethodPage(): JSX.Element {
  const [userType, setUserType] = useState(ROLE_TYPES.customer);
  const [roleInstance, setRoleInstance] = useState<RoleInstance | null>(null);
  
  const updateRoleInstance = () => {
    setRoleInstance(getRoleInstance(userType));
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserType(event.target.value);
  };

  return (
    <div>
      <h1>Factory Method</h1>
      <div>
        <div>Select user permissions type:</div>
        <div>
          <input 
            id={ROLE_TYPES.customer}
            value={ROLE_TYPES.customer}
            onChange={onChange}
            type="radio" 
            name="type"
            checked={userType === ROLE_TYPES.customer}
          />
          <label htmlFor={ROLE_TYPES.customer}>Customer</label>
        </div>
        <div>
          <input 
            id={ROLE_TYPES.moderator}
            value={ROLE_TYPES.moderator}
            onChange={onChange}
            type="radio"
            name="type"
            checked={userType === ROLE_TYPES.moderator}
          />
          <label htmlFor={ROLE_TYPES.moderator}>Moderator</label>
        </div>
        <div>
          <input 
            id={ROLE_TYPES.admin} 
            value={ROLE_TYPES.admin} 
            onChange={onChange} 
            type="radio" 
            name="type"
            checked={userType === ROLE_TYPES.admin}
          />
          <label htmlFor={ROLE_TYPES.admin}>Admin</label>
        </div>
        <button onClick={updateRoleInstance}>Get Users</button>
      </div>
      {roleInstance && <pre className="code">{JSON.stringify(roleInstance.getUsers(), null, 2)}</pre>}
    </div>
  );
}
