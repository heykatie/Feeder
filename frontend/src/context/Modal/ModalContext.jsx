import {useContext, createContext} from 'react';

export const ModalContext = createContext();

export const useModal = () => useContext(ModalContext);
