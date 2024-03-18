import React, { useState } from "react";
import "../App.css";

import LoginSignUpModal from "../components/modals/auth/loginSignUpModal";

function Home() {
  const [openAuthModal, setOpenAuthModal] = useState(false);

  // Auth Modal Handling
  const handleOpenAuthModal = () => {
    setOpenAuthModal(true);
  };

  return (
    <>
      <h1>Home</h1>
      <button onClick={handleOpenAuthModal}>Open Auth Modal</button>
      <LoginSignUpModal
        open={openAuthModal}
        onClose={() => setOpenAuthModal(false)}
      />
    </>
  );
}

export default Home;
