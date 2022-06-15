import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./routes/PR/Main";
import Header from "./routes/_shared/Header";
import Schedule from "./routes/Schedule/Schedule";
import Register from "./routes/User/Reigsterform";
import Login from "./routes/User/Login";
import Dispatcher from "./Dispatcher";
import Result from "./routes/PR/Result";

function Router() {
  return (
    <Dispatcher>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Main />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/login" element={<Login />} />
          <Route path="/result" element={<Result />} />
        </Routes>
      </BrowserRouter>
    </Dispatcher>
  );
}

export default Router;
