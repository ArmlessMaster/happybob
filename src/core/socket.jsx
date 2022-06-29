import io from "socket.io-client";

const socket = io("https://happybobchat.herokuapp.com/", { transports : ['websocket'] });

export default socket;

