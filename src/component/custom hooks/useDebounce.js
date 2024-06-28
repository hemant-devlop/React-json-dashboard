import React, { useEffect, useState } from 'react'
import axios from 'axios';

const useDebounce = (value,delay) => {
    const[debounceValue,setDebouncevalue]=useState('')
    useEffect(()=>{
     
      const  timer=setTimeout(() => {
            setDebouncevalue(value)
        }, delay);

        return ()=>{
            clearTimeout(timer)
        };
    },[value,delay])
  return debounceValue
};

export default useDebounce
