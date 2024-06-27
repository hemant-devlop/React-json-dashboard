import React, { useEffect, useState } from 'react'

const useDebounce = (value,delay) => {
    const[debounceValue,setDebouncevalue]=useState(value)
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
