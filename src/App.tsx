import React from "react";
import { Character } from "./features/character/Character";

function App() {
  return (
    <div className='container flex h-full min-h-screen py-4 mx-auto bg-gray-400 justify-evenly'>
      <Character />
      <Character />
      <Character />
    </div>
  );
}

export default App;
