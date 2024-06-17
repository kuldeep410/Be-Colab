import { FC } from "react";
import SideBar from "../components/Home/SideBar";

const Home: FC = () => {
  return (
    <div className="flex">
      <SideBar />

      <div className="hidden flex-grow flex-col items-center justify-center gap-3 md:!flex">
        <img src="https://img.icons8.com/ios-filled/50/ffffff/new-message.png" />
        <h1 className="text-center">Select a conversation to start chatting</h1>
      </div>
    </div>
  );
};

export default Home;
