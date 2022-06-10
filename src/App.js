import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignIn from "./components/login";
import DashboardCheck from "./components/dashboard";
import MsgDetailsCheck from "./components/login";
import InboxCheck from "./components/inbox";
import SignUp from "./components/register";
import Passwordreset from './components/passwordReset'
import ResetForm from './components/newPassword'
import SuccessCard from './components/passwordSuccess'
import ActivationCard from './components/activationCard'



export default function App() {
  return (<>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/forgetpassword" element={<Passwordreset />}></Route>
        <Route path="/resetpassword/:id" element={<ResetForm />}></Route>
        <Route path="/success" element={<SuccessCard />}></Route>
        <Route path="/activated" element={<ActivationCard />}></Route>
        <Route path="/dashboard" element={<DashboardCheck />}></Route>
        <Route path="/details" element={<MsgDetailsCheck />}></Route>
        <Route path="/inbox" element={<InboxCheck />}></Route>
      </Routes>
    </BrowserRouter>
  </>)
}