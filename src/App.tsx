import React from "react";
import { Character } from "./features/character/Character";

function App() {
  return (
    <div className='container flex sm:flex-col lg:flex-row lg:items-stretch sm:items-center  lg:flex-nowrap w-full h-full min-h-screen py-4 mx-auto lg:bg-gray-700 justify-around'>
      <Character ix={0} />
      <Character ix={1} />
      <Character ix={2} />
    </div>
  );
}

export default App;
