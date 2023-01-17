import { BrowserRouter, Routes, Route } from "react-router-dom";
import StorePicker from "./StorePicker";
import App from "./App";
import NotFound from "./NotFound";

const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element ={<StorePicker />} />
      <Route path="/store/:storeId" element={<App />} />
      <Route element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default Router;
