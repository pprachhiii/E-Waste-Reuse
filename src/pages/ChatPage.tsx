import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Send, User, Building } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { mockChats } from '@/data/mockData';

export const ChatPage: React.FC = () => {
  const { user } = useAuth();
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');

  if (!user) return null;

  const userChats = mockChats.filter(chat => chat.participants.includes(user.id));
  const activeChat = userChats.find(chat => chat.id === selectedChat);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    console.log('Sending message:', newMessage);
    setNewMessage('');
  };

  const formatTime = (timestamp: string) => new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Messages</h1>
        <p className="text-muted-foreground">Communicate securely with other users</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
        {/* Chat List */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5" /> Conversations
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 overflow-y-auto max-h-[550px]">
            {userChats.length === 0 ? (
              <div className="p-6 text-center">
                <MessageCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No conversations yet</p>
              </div>
            ) : (
              <div className="space-y-1">
                {userChats.map(chat => {
                  const otherParticipant = chat.participantNames.find(name => name !== user.name);
                  const isSelected = selectedChat === chat.id;
                  return (
                    <div
                      key={chat.id}
                      className={`p-4 cursor-pointer hover:bg-muted/50 transition-colors ${isSelected ? 'bg-primary/10 border-r-2 border-primary' : ''}`}
                      onClick={() => setSelectedChat(chat.id)}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                          {user.role === 'consumer' ? <Building className="w-5 h-5" /> : <User className="w-5 h-5" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate">{otherParticipant}</p>
                          <p className="text-xs text-muted-foreground truncate">{chat.lastMessage}</p>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {formatTime(chat.lastMessageTime)}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Chat Window */}
        <Card className="lg:col-span-2 flex flex-col">
          {selectedChat && activeChat ? (
            <>
              <CardHeader className="border-b">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                    {user.role === 'consumer' ? <Building className="w-5 h-5" /> : <User className="w-5 h-5" />}
                  </div>
                  <div>
                    <CardTitle className="text-lg">{activeChat.participantNames.find(name => name !== user.name)}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {user.role === 'consumer' ? 'Business' : 'Consumer'}
                      <Badge variant="outline" className="ml-2">Online</Badge>
                    </p>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="flex-1 flex flex-col justify-between h-96">
                <div className="flex-1 overflow-y-auto space-y-4 p-4">
                  {activeChat.messages.map(message => {
                    const isOwn = message.senderId === user.id;
                    return (
                      <div key={message.id} className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${isOwn ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                          <p className="text-sm">{message.message}</p>
                          <p className={`text-xs mt-1 ${isOwn ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>{formatTime(message.timestamp)}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="border-t p-4">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Type your message..."
                      value={newMessage}
                      onChange={e => setNewMessage(e.target.value)}
                      onKeyPress={e => e.key === 'Enter' && handleSendMessage()}
                      className="flex-1"
                    />
                    <Button onClick={handleSendMessage} size="sm">
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </>
          ) : (
            <CardContent className="flex items-center justify-center h-full">
              <div className="text-center">
                <MessageCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-lg font-medium mb-2">Select a conversation</p>
                <p className="text-muted-foreground">Choose a conversation from the left to start messaging</p>
              </div>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  );
};