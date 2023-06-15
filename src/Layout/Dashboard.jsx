import { Link, Outlet } from "react-router-dom";
import { FaShoppingCart, FaWallet, FaCalendar, FaHome } from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import useAdmin from "../hooks/useAdmin";

const Dashboard = () => {
  const { user } = useAuth();
  const [isAdmin] = useAdmin(user);

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-center">
        <Outlet></Outlet>
        <label
          htmlFor="my-drawer-2"
          className="btn btn-primary drawer-button lg:hidden"
        >
          Open drawer
        </label>
      </div>
      <div className="drawer-side bg-[#535bd1]">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 h-full text-base-content">
          { (
            <>
              <li>
                <Link to="/"><FaHome></FaHome>Home</Link>
              </li>
              
              <li>
                <Link to="/dashboard/manageClass"><FaHome></FaHome>Manage Classes</Link>
              </li>
              <li>
                <Link to="/dashboard/manageUsers"><FaShoppingCart></FaShoppingCart>Manage Users</Link>
              </li>
              <div className="divider"></div> 
              <li>
                <Link to="/"><FaHome></FaHome>Home</Link>
              </li>
            </>
          )}
          { (
            <>
             
              <li>
                <Link to="/dashboard/enrolledClass"><FaCalendar></FaCalendar>My Enrolled Classes</Link>
              </li>
              <li>
                <Link to="/dashboard/payment"><FaWallet></FaWallet>Payment History</Link>
              </li>
              <li>
                <Link to="/dashboard/mycart"><FaShoppingCart></FaShoppingCart>My Cart</Link>
              </li>
              <li>
                <Link to="/dashboard/enrolledClass"><FaShoppingCart></FaShoppingCart>My enrolled class</Link>
              </li>
              <div className="divider"></div> 
              <li>
                <Link to="/"><FaHome></FaHome>Home</Link>
              </li>
            </>
          )}
          { (
            <>
              <li>
                <Link to="/dashboard/addClass"><FaHome></FaHome>Add Class</Link>
              </li>
              <li>
                <Link to="/dashboard/myClasses"><FaHome></FaHome>My Classes</Link>
              </li>
              
              
              
              
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
