 

import  { createContext, useState } from 'react';

// Create the context
export const ReviewsContext = createContext<any>([]);

// Create a provider component
export const ReviewsProvider = ({ children }:any) => {
  const [currentReviews, setCurrentReviews] = useState([]);

  return (
    <ReviewsContext.Provider value={{ currentReviews, setCurrentReviews }}>
      {children}
    </ReviewsContext.Provider>
  );
};