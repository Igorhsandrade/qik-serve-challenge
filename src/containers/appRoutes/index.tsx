import { Navigate, Route, Routes } from 'react-router-dom';
import { menuRoutes } from '../../constants/routes/routes';
import Store from '../store';
import Contact from '../contact';
import Login from '../login';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={menuRoutes.menu.path} />} />
      <Route path={menuRoutes.menu.path} element={<Store />} />
      <Route path={menuRoutes.contact.path} element={<Contact />} />
      <Route path={menuRoutes.login.path} element={<Login />} />
      <Route path="*" element={<Navigate to={menuRoutes.menu.path} />} />
    </Routes>
  );
};

export default AppRoutes;
