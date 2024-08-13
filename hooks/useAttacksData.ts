// hooks/useAttacksData.ts
import { useState, useEffect } from 'react';

interface Attack {
  id: number;
  ipv4: string; // Campo atualizado
  ipRange?: string;
  port: number;
  time: number;
  protocol: string;
  method: string;
  concurrents: number;
  running: boolean;
  createdAt: string;
  userId: string;
}

const useAttacksData = (userId: string) => {
  const [attacks, setAttacks] = useState<Attack[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/send?userId=${userId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result: Attack[] = await response.json();
        setAttacks(result);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchData();
    }
  }, [userId]);

  return { attacks, loading, error };
};

export default useAttacksData;
