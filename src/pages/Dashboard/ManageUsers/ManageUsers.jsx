import { useQuery } from "@tanstack/react-query";


const ManageUsers = () => {

    const {data: users = [], refetch} = useQuery(['users'], async() => {
        const res = await fetch('http://localhost:5000/users')
        return res.json();

    })
    return (
        <div>
            {users.length}
        </div>
    );
};

export default ManageUsers;