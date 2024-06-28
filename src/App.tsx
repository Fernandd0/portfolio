import {
  Outlet,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { Home } from "./pages/Home/Home";
import { Navbar } from "./layout/Navbar";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route index element={<Home />} />
        <Route path="/sobre-mi" element={<Home />} />
        <Route path="/proyectos" element={<Home />} />
        <Route path="/contacto" element={<Home />} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
}

const Root = () => {
  return (
    <>
      <Navbar />
      <main className="min-h-[calc(100vh-379px-200px)]">
        <Outlet />
      </main>
    </>
  );
};

export default App;
