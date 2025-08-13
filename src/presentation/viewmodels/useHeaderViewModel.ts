import { useState } from 'react';

export const useHeaderViewModel = () => {
  const [title] = useState('Track your flight');
  const [subtitle] = useState('Keep you informed in real time!');

  return {
    title,
    subtitle,
  };
};
