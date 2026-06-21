"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

export type Message = {
  id: string;
  sender: "user" | "ai";
  text: string;
};

type GlobalStateContextType = {
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  activeDossier: string | null;
  setActiveDossier: React.Dispatch<React.SetStateAction<string | null>>;
};

const defaultState: GlobalStateContextType = {
  messages: [
    {
      id: "1",
      sender: "ai",
      text: "Authority acknowledged. Intelligence system active. Dossier **DX-77492 (West River Block)** is loaded and ready for analysis. What specific parameters of the expropriation order require clarification?",
    }
  ],
  setMessages: () => {},
  activeDossier: null,
  setActiveDossier: () => {},
};

const GlobalStateContext = createContext<GlobalStateContextType>(defaultState);

export const GlobalStateProvider = ({ children }: { children: ReactNode }) => {
  const [messages, setMessages] = useState<Message[]>(defaultState.messages);
  const [activeDossier, setActiveDossier] = useState<string | null>(null);

  return (
    <GlobalStateContext.Provider value={{ messages, setMessages, activeDossier, setActiveDossier }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

export const useGlobalState = () => useContext(GlobalStateContext);
