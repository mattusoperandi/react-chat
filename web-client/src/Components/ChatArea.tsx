import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import ChatItem from './ChatItem';
import { socket } from '../api/socket'
import { Message } from '../Models/Message';

const ChatContainer = styled.div`
    margin: 10px;
    flex: 1;
    background: #fff;
    border-radius: 5px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    transition: all 0.3s cubic-bezier(.25,.8,.25,1);
`

const ChatAreaContainer = styled.div`
    flex: 1;
    background: #eee;
    z-index: -1;
`

export default function ChatArea() {
    const initialState: Message[] = [];
    const [messages, setMessages] = useState(initialState);

    useEffect(() => {
        // setup subscription
        socket.on('receiveMessage', (message: Message) => {
            setMessages([...messages, message])
        });
        // unsubscribe on unmount
        return () => {
            socket.removeEventListener('receiveMessage')
        }
    }, [messages])
    
    return (
        <ChatAreaContainer>
            <ChatContainer>
                {messages.map((message: Message, index: number) => <ChatItem key={index} username={message.user} message={message.message} timestamp={message.timestamp}></ChatItem>)}
            </ChatContainer>
        </ChatAreaContainer>
    )
}