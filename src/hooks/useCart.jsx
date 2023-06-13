import { useQuery } from '@tanstack/react-query'
import { AuthContext } from '../provider/AuthProvider';
import { useContext } from 'react';

const useCart = () => {

    const {user} = useContext(AuthContext);
    const token = localStorage.getItem('access-token');


    const {  refetch, data: cart = []} = useQuery({
        queryKey: ['selectedClass', user?.email],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/selectedClass?email=${user.email}`, { headers: {
                authorization: `bearer ${token}`
            }})
            return res.json();
        },
      })

      return [cart, refetch]




}

export default useCart;