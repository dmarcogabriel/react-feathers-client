import React, {useEffect, useState} from 'react';
import client from './feathers';

const App = () => {
  const [notifications, setNotifications] = useState([]);

  const loadNotifications = async () => {
    const response = await client.service('notifications').find();

    setNotifications(response);
  };

  useEffect(() => {
    loadNotifications();

    client.service('notifications')
        .on('created', (notification) => {
          setNotifications((oldNotifications) =>
            [...oldNotifications, notification]);
        });

    return () => client.removeListener('notifications');
  }, []);

  return (
    <div>
      <h1>Hello Socket</h1>

      {notifications.map((notification) =>
        <p key={notification.id}>{notification.text}</p>)}
    </div>
  );
};

export default App;
