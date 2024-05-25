import Image from "next/image";
import React from 'react';

interface MessageProps {
  message: string;
  isHuman: boolean;
}

const Message: React.FC<MessageProps> = ({ message, isHuman }) => {
  return (
    <div className="flex justify-center">
      {isHuman ? (
        <div className="flex flex-row items-center justify-end w-1/2 max-w-lg p-4 rounded-lg shadow-md">
          <p className="ml-2">{message}</p>
        </div>
      ) : (
        <div className="flex flex-row items-center justify-start w-1/2 max-w-lg p-4 rounded-lg shadow-md">
          <Image src={"/images/user.png"} width={40} height={40} alt={"User icon for profiles"} />
          <p className="ml-5">{message}</p>
        </div>
      )}
    </div>
  );
};

export default Message;
