import { Link, Outlet } from "react-router-dom";
import { FaShoppingCart, FaWallet, FaCalendar, FaHome } from "react-icons/fa";

const Dashboard = () => {
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
          {/* Sidebar content here */}
          <li>
            <Link><FaHome></FaHome>User Home</Link>
          </li>
          <li>
            <Link><FaCalendar></FaCalendar>My Enrolled Classes</Link>
          </li>
          <li>
            <Link><FaWallet></FaWallet>Payment History</Link>
          </li>
          <li>
            <Link to='/dashboard/mycart'><FaShoppingCart></FaShoppingCart>My Cart</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
