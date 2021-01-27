import React, { useEffect, useState } from 'react';

type Post = {
  id: number;
  authorId: number;
  title: string;
  body: string;
  createdAt: string;
}

type UserInstance = {
  getPosts(): Post[];
}

const USER_TYPES = {
  customer: 'CUSTOMER',
  moderator: 'MODERATOR',
  admin: 'ADMIN'
};

const POSTS: Post[] = [
  {
    authorId: 1,
    id: 1,
    title: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
    body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
    createdAt: ''
  },
  {
    authorId: 1,
    id: 2,
    title: 'qui est esse',
    body: 'est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla',
    createdAt: ''
  },
  {
    authorId: 1,
    id: 3,
    title: 'ea molestias quasi exercitationem repellat qui ipsa sit aut',
    body: 'et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut',
    createdAt: ''
  },
  {
    authorId: 1,
    id: 4,
    title: 'eum et est occaecati',
    body: 'ullam et saepe reiciendis voluptatem adipisci\nsit amet autem assumenda provident rerum culpa\nquis hic commodi nesciunt rem tenetur doloremque ipsam iure\nquis sunt voluptatem rerum illo velit',
    createdAt: ''
  },
  {
    authorId: 1,
    id: 5,
    title: 'nesciunt quas odio',
    body: 'repudiandae veniam quaerat sunt sed\nalias aut fugiat sit autem sed est\nvoluptatem omnis possimus esse voluptatibus quis\nest aut tenetur dolor neque',
    createdAt: ''
  },
];

const getUserInstance = (type: string): UserInstance => {
  switch (type) {
  case USER_TYPES.customer: return {
    getPosts() {
      return POSTS.filter(post => post);
    }
  };
  case USER_TYPES.moderator: return {
    getPosts() {
      return POSTS.filter(post => post);
    }
  };
  case USER_TYPES.admin: return {
    getPosts() {
      return POSTS;
    }
  };
  default: return {
    getPosts() {
      return [];
    }
  };
  }
};
// interface User {
//   operation(): string;
// }

// abstract class Creator {
//   public abstract factoryMethod(): User;
// }

// class AdminCreator extends Creator {

// }

// class AdminUser implements User {

// }

// class ModeratorCreator extends Creator {

// }

// class ModeratorUser implements User {

// }

// class CustomerCreator extends Creator {

// }

// class CustomerUser implements User {

// }

export default function FactoryMethodPage(): JSX.Element {
  const [userType, setUserType] = useState(USER_TYPES.customer);
  const [userInstance, setUserInstance] = useState<UserInstance | null>(null);
  
  const updateUserInstance = () => {
    setUserInstance(getUserInstance(userType));
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserType(event.target.value);
  };

  return (
    <div>
      <h1>Factory Method</h1>
      <div>
        <div>Select type object to create:</div>
        <div>
          <input 
            id={USER_TYPES.customer}
            value={USER_TYPES.customer}
            onChange={onChange}
            type="radio" 
            name="type"
            checked={userType === USER_TYPES.customer}
          />
          <label htmlFor={USER_TYPES.customer}>Customer</label>
        </div>
        <div>
          <input 
            id={USER_TYPES.moderator}
            value={USER_TYPES.moderator}
            onChange={onChange}
            type="radio"
            name="type"
            checked={userType === USER_TYPES.moderator}
          />
          <label htmlFor={USER_TYPES.moderator}>Moderator</label>
        </div>
        <div>
          <input 
            id={USER_TYPES.admin} 
            value={USER_TYPES.admin} 
            onChange={onChange} 
            type="radio" 
            name="type"
            checked={userType === USER_TYPES.admin}
          />
          <label htmlFor={USER_TYPES.admin}>Admin</label>
        </div>
        <button onClick={updateUserInstance}>Get Posts</button>
      </div>
      {userInstance && <pre className="code">{JSON.stringify(userInstance.getPosts(), null, 2)}</pre>}
    </div>
  );
}
