import { createContext, useEffect, useState, useContext } from "react";
import io, { Socket } from "socket.io-client";

export const SocketContext = createContext<Socket | undefined>(undefined);

export const SocketProvider = ({
  children,
  orgUserId,
  orgId,
}: {
  children: JSX.Element[] | JSX.Element | string;
  orgUserId: string;
  orgId: string;
}) => {
  const [socket, setSocket] = useState<Socket | undefined>(undefined);

  useEffect(() => {
    if (!orgUserId || !orgId) return;
    if (socket) return;

    const nSocket = io("ws://localhost:3000", {
      query: { orgUserId, orgId },
      autoConnect: false,
    });

    setSocket(nSocket);

    nSocket.on("connect", () => {
      console.debug("quiz socket connected");
    });
  }, [orgUserId, orgId]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
