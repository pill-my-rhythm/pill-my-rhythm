import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./routes/PR/Main";
import Header from "./routes/_shared/Header";
import Schedule from "./routes/Schedule/Schedule";

function Router() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/schedule" element={<Schedule />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
