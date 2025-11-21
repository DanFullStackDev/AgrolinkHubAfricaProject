import { useEffect, useState } from 'react';
import api from '../services/api';
import { ChatBox } from '../components/ChatBox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useAuth } from '../contexts/AuthContext';

export function MessagesPage() {
  const { user } = useAuth();
  const [conversations, setConversations] = useState([]);
  const [activeChat, setActiveChat] = useState(null);

  useEffect(() => {
    const fetchConversations = async () => {
      const { data } = await api.get('/api/chat/conversations');
      setConversations(data);
    };
    fetchConversations();
  }, []);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">My Messages</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* List of Convos */}
        <Card className="md:col-span-1">
          <CardHeader><CardTitle>Inbox</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            {conversations.map((convo) => (
              <div 
                key={convo._id} 
                onClick={() => setActiveChat(convo)}
                className="flex items-center gap-3 p-3 hover:bg-muted rounded-lg cursor-pointer border"
              >
                <Avatar>
                  <AvatarFallback>{convo.otherUser?.name[0]}</AvatarFallback>
                </Avatar>
                <div className="overflow-hidden">
                  <p className="font-semibold truncate">{convo.otherUser?.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{convo.lastMessage.text}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Chat Window */}
        <div className="md:col-span-2 h-[500px] border rounded-xl bg-slate-50 relative">
          {activeChat ? (
            <ChatBox 
              roomId={activeChat._id} 
              username={user.name}
              userId={user._id}
              recipientId={activeChat.otherUser?._id}
              onClose={() => setActiveChat(null)}
            />
          ) : (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              Select a conversation to start chatting
            </div>
          )}
        </div>
      </div>
    </div>
  );
}