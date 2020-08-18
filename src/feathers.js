import feathers from '@feathersjs/client';
import io from 'socket.io-client';
import socketio from '@feathersjs/socketio-client';

const socket = io('http://localhost:3030');
const client = feathers();

client.configure(socketio(socket));

export default client;
