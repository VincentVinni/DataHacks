"use client"
import React, { useState, ChangeEvent, KeyboardEvent } from 'react';
import Image from "next/image";
import Link from 'next/link';
import Message from '../components/message';
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton"
import { PulseLoader } from 'react-spinners';


interface MessageProps {
  message: string;
  isHuman: boolean;
}

const Chat: React.FC = () => {
  const [loading, setLoading] = useState<Boolean>(false); 
  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<MessageProps[]>([
    { message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", isHuman: false },
    { message: "Start the conversation...", isHuman: false }
  ]);

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event.target.value);
  };

  const handleKeyPress = async (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevents newline insertion
      
      // Add the user's message immediately
      const userMessage = { message, isHuman: true };
      setMessages((prevMessages) => [...prevMessages, userMessage]);
      setMessage(''); // Clear the textarea
      setLoading(true)
      try {
        const ai_payload = { "message": message }
        const db_payload = { "sender": "human", "message": message }

        const [uploadResponse, testAIResponse] = await Promise.all([
          fetch('http://localhost:6969/api/uploadConversation', {
            method: 'PUT', 
            headers: {
              'Content-Type': 'application/json',
            }, 
            body: JSON.stringify(db_payload)
          }), 
          
          fetch('http://localhost:6969/testAI', {
            method: 'PUT', 
            headers: {
              'Content-Type': 'application/json',
            }, 
            body: JSON.stringify(ai_payload)
          })
        ]);

        if (!uploadResponse.ok) {
          console.error('Failed to upload conversation');
        }

        if (!testAIResponse.ok) {
          console.error('Failed to get AI response');
        }

        const contentType = testAIResponse.headers.get('content-type');
        let testAIData;
        if (contentType && contentType.includes('application/json')) {
          testAIData = await testAIResponse.json();
        } else {
          testAIData = await testAIResponse.text();
        }
        console.log(testAIData); // Log the response to inspect its structure

        const aiUploadRes = await fetch('http://localhost:6969/api/uploadConversation', {
          method: 'PUT', 
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({"sender": "AI", "message": testAIData}),
        }); 

        if (!aiUploadRes.ok) {
          console.error("Error uploading AI data to Supabase")
        }

        setMessages((prevMessages) => [...prevMessages, { message: testAIData, isHuman: false }]);
        setLoading(false)
      } catch (error) {
        console.error("Error: ", error); 
      }
    }
  };

  return (
    <div className="flex flex-col h-full p-4 overflow-hidden">
      <div className="flex-1 overflow-y-auto p-4 rounded-lg shadow-lg">
        <div className="flex flex-col space-y-4 special_class">
          {messages.map((msg, index) => (
            <div key={index}>
              <Message message={msg.message} isHuman={msg.isHuman} />
            </div>
          ))}

          {loading ? (
            <Message message={<PulseLoader color='#2F2F2F'/>} isHuman={false}/>
            ) : (<></>)
          }

        </div>
      </div>

      <div className="grid justify-items-center">
        <Textarea 
          className="bg-black w-1/3 p-2 fixed bottom-5 resize-none" 
          placeholder="Type your message here." 
          value={message} 
          onChange={handleChange} 
          onKeyPress={handleKeyPress}
        />
      </div>
    </div>
  );
};

export default Chat;
