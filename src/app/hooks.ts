import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';
import React from "react"
import { RefObject } from 'react';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;


export function useClickOutsideContainer(ref : RefObject<HTMLElement> , callback:Function) {
    React.useEffect(() => {
        const handleClickOutside = (event : MouseEvent) => {
            
            if (ref.current && !ref.current.contains(event.target as Node)) {
                callback(event)
            }
        }

        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [ref, callback])
}

