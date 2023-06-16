import { Link, Outlet } from "react-router-dom";
import { FaShoppingCart, FaWallet, FaCalendar, FaHome } from "react-icons/fa";
import { motion } from "framer-motion";
import useAuth from "../hooks/useAuth";
import useAdmin from "../hooks/useAdmin";
import useInstructor from "../hooks/useInstructor";

const Dashboard = () => {
  const { user } = useAuth();
  const [isAdmin] = useAdmin(user);
  const [isInstructor] = useInstructor(user);
 
  console.log('isAdmin:', isAdmin);

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
          {isAdmin && (
            <>
              <motion.li
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Link to="/">
                  <FaHome />
                  Home
                </Link>
              </motion.li>

              <motion.li
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Link to="/dashboard/manageClass">
                  <FaHome />
                  Manage Classes
                </Link>
              </motion.li>

              <motion.li
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Link to="/dashboard/manageUsers">
                  <FaShoppingCart />
                  Manage Users
                </Link>
              </motion.li>

              <div className="divider"></div>
            </>
          )}

          {isInstructor && (
            <>
              <motion.li
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Link to="/">
                  <FaHome />
                  Home
                </Link>
              </motion.li>

              <motion.li
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Link to="/dashboard/addClass">
                  <FaHome />
                  Add Class
                </Link>
              </motion.li>

              <motion.li
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Link to="/dashboard/myClasses">
                  <FaHome />
                  My Classes
                </Link>
              </motion.li>

              <div className="divider"></div>
            </>
          )}

          {!isAdmin && !isInstructor && (
            <>
              <motion.li
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Link to="/">
                  <FaHome />
                  Home
                </Link>
              </motion.li>
              <motion.li
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Link to="/dashboard/mycart">
                  <FaShoppingCart />
                  My Cart
                </Link>
              </motion.li>

              <motion.li
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Link to="/dashboard/enrolledClass">
                  <FaCalendar />
                  My Enrolled Classes
                </Link>
              </motion.li>

              <motion.li
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Link to="/dashboard/paymentHistory">
                  <FaWallet />
                  Payment History
                </Link>
              </motion.li>

              <div className="divider"></div>

              
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
