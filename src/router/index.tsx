import { BrowserRouter, Routes } from 'react-router-dom';
import MapRoutes from './maproutes';

const Root = () => {
  return (
    <BrowserRouter>
      <Routes>{MapRoutes}</Routes>
    </BrowserRouter>
  );
};

export default Root;
