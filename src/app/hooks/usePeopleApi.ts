// usePeopleApi.ts
import { useState, useEffect } from 'react';
import DisplayUser from '../Components/Interface';

const usePeopleApi = () => {
  const [user, setUser] = useState<DisplayUser | null>(null);
  const [activeIcon, setActiveIcon] = useState("user");
  const [Loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch("https://randomuser.me/api/");
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const data: DisplayUser = await response.json();
        setUser(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setUser(null);
      }
      finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return { user, activeIcon, setActiveIcon };
};

export default usePeopleApi;