import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useAdmin = () => {
    const {user, loading} = useAuth();
    const [axiosSecure] = useAxiosSecure();
    // use axios secure with react query
    console.log('user:', user);
    const {data: isAdmin, isLoading: isAdminLoading} = useQuery({
        queryKey: ['isAdmin', user?.email],
        enabled: !loading,
        queryFn: async () => {
            
            const res = await axiosSecure.get(`/users/${user?.email}`);
            console.log(res.data.admin);
            return res.data.role === 'admin';
           
        }
    })
     console.log('isAdmin:', isAdmin);
    return [isAdmin, isAdminLoading]
}
export default useAdmin;