import React from "react";
import Header from "./routes/Header";
import Main from "./routes/Main";

function App() {
  return (
    <>
      <Header />
      <Main />
      <label htmlFor="my-modal" className="btn modal-button">
        open modal
      </label>

      <input type="checkbox" id="my-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Congratulations Typescript & daisyUI Setup!</h3>
          <p className="py-4">해냈다~ 드디어..</p>
          <div className="modal-action">
            <label htmlFor="my-modal" className="btn">
              Yay!
            </label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
