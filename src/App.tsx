import { FC, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { auth, db } from "./shared/firebase";
import { doc, setDoc } from "firebase/firestore";

import BarWave from "react-cssfx-loading/src/BarWave";
import Chat from "./pages/Chat";
import Home from "./pages/Home";
import PrivateRoute from "./components/PrivateRoute";
import SignIn from "./pages/SignIn";
import { onAuthStateChanged } from "firebase/auth";
import { useStore } from "./store";
import AddPosition from "./components/Features/Position/AddPosition";
import AssignWork from "./pages/AsignWork";
import Info from "./pages/Info/Info";

const App: FC = () => {
  const currentUser = useStore((state) => state.currentUser);
  const setCurrentUser = useStore((state) => state.setCurrentUser);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        setDoc(doc(db, "users", user.uid), {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          phoneNumber: user.phoneNumber || user.providerData?.[0]?.phoneNumber,
        });
      } else setCurrentUser(null);
    });
  }, []);

  if (typeof currentUser === "undefined")
    return (
      <div className="flex min-h-screen items-center justify-center">
        <BarWave />
      </div>
    );

  return (
    <Routes>
      <Route
        index
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />
      <Route path="sign-in" element={<SignIn />} />
      <Route path="/cinfo/" element={<Info />} />
      <Route path="/addposition/" element={<AddPosition />} />
      <Route path="/assignwork/" element={<AssignWork currentUser={currentUser} />} />
      <Route
        path=":id"
        element={
          <PrivateRoute>
            <Chat />
          </PrivateRoute>
        }
      />

      <Route path="*" element={<div>Not Found</div>} />
    </Routes>
  );
};

export default App;
