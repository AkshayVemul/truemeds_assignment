import Login from "./pages/Login";
import { Routes, Route } from "react-router-dom";
import Article from "./pages/Article";
import GlobalLoader from "./components/GlobalLoader";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="articles" element={<Article />} />
        <Route path="*" element={<div>PAGE Not FOUND</div>} />
      </Routes>
      <GlobalLoader />
    </>
  );
}

export default App;
