import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { X, Send } from 'lucide-react';

// Connect to backend
const SOCKET_URL = import.meta.env.VITE_API_URL 
  ? import.meta.env.VITE_API_URL.replace('/api', '') 
  : 'http://localhost:5000';

const socket = io.connect(SOCKET_URL);

// FIX: Added userId and recipientId to the props here
export function ChatBox({ roomId, username, userId, recipientId, onClose }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  // Join the room on mount
  useEffect(() => {
    if (roomId) {
      socket.emit("join_room", roomId);
    }
  }, [roomId]);

  // Listen for incoming messages
  useEffect(() => {
    const receiveMessageHandler = (data) => {
      setMessageList((list) => [...list, data]);
    };

    socket.on("receive_message", receiveMessageHandler);

    return () => {
      socket.off("receive_message", receiveMessageHandler);
    };
  }, []);

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: roomId,
        author: username,
        authorId: userId,       // Now this variable exists!
        recipientId: recipientId, // Now this variable exists!
        message: currentMessage,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  return (
    <Card className="fixed bottom-4 right-4 w-80 h-96 shadow-2xl flex flex-col z-50 border-primary/20 animate-in slide-in-from-bottom-10">
      <CardHeader className="bg-primary text-primary-foreground p-3 flex flex-row justify-between items-center rounded-t-xl">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          Live Chat
        </CardTitle>
        <Button variant="ghost" size="icon" className="h-6 w-6 text-primary-foreground hover:bg-primary-foreground/20" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      
      <CardContent className="flex-grow overflow-y-auto p-3 space-y-3 bg-slate-50">
        {messageList.length === 0 && (
          <p className="text-xs text-center text-muted-foreground mt-10">
            Start the conversation! Negotiate price or ask about delivery.
          </p>
        )}
        {messageList.map((msg, idx) => (
          <div key={idx} className={`flex flex-col ${username === msg.author ? "items-end" : "items-start"}`}>
            <div className={`max-w-[85%] rounded-lg p-2 text-sm shadow-sm ${
              username === msg.author 
                ? "bg-primary text-primary-foreground rounded-br-none" 
                : "bg-white border text-slate-800 rounded-bl-none"
            }`}>
              <p>{msg.message}</p>
            </div>
            <span className="text-[10px] text-muted-foreground mt-1 px-1">{msg.time}</span>
          </div>
        ))}
      </CardContent>

      <CardFooter className="p-3 border-t bg-white gap-2">
        <Input 
          value={currentMessage} 
          placeholder="Type a message..." 
          className="h-9"
          onChange={(e) => setCurrentMessage(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && sendMessage()}
        />
        <Button size="icon" className="h-9 w-9 shrink-0" onClick={sendMessage}>
          <Send className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}