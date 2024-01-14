import React, {createContext, Dispatch, ReactNode, SetStateAction, useState} from "react";

interface INotificationContextProps {
  notices: string[]
  setNotices: Dispatch<SetStateAction<string[]>>
}

interface iProviderProps {
  children: ReactNode
}

export const NotificationContext = createContext<INotificationContextProps>({notices: [], setNotices: ()=>{}});

const NotificationProviderCtx: React.FC<iProviderProps> = ({children}) => {
  const [notice, setNotice] = useState<string[]>(['Default Notice']);
  return <NotificationContext.Provider value={{notices: notice, setNotices: setNotice}}>
    {children}
  </NotificationContext.Provider>
}

export default NotificationProviderCtx