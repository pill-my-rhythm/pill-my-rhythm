import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./routes/Search/Main";
import Header from "./routes/_shared/Header";
import Calendar from "./routes/Schedule/Calendar";
import Register from "./routes/User/Reigsterform";
import Login from "./routes/User/Login";
import Dispatcher from "./Dispatcher";
import Result from "./routes/Search/Result";
import Mypage from "./routes/User/MyPage";
import Subscribe from "./routes/Schedule/Mobile/Subscribe";
import PushCheckList from "./routes/Schedule/Mobile/PushCheckList";
import Pmrguide from "./routes/Pmr";
import Footer from "./routes/_shared/Footer";
import Demo from "./routes/Schedule/YearlyChecklist";
import Aboutus from "./routes/_shared/Footer/Aboutus";
import SupSearch from "./routes/SupSearch/SupSearch";

function Router() {
  return (
    <Dispatcher>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/pillmyrhythm" element={<Pmrguide />} />
          <Route path="/mypage" element={<Mypage />} />
          <Route path="/schedule" element={<Calendar />} />
          <Route path="/search" element={<SupSearch />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/result" element={<Result />} />
          <Route path="/mypage" element={<Mypage />} />
          <Route path="/m/subscribe" element={<Subscribe />} />
          <Route path="/m/checklist" element={<PushCheckList />} />
          <Route path="/yearly/checklist" element={<Demo />} />
          <Route path="/aboutus" element={<Aboutus />} />
        </Routes>
        {/* <Footer /> */}
      </BrowserRouter>
    </Dispatcher>
  );
}

export default Router;
