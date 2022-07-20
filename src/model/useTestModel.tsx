import { useState } from 'react';

export default function useGlobalModel() {
  const [testMount, setTestMount] = useState(1);

  return {
    testMount,
    setTestMount,
  };
}
