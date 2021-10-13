import React from "react";
import { Character } from "./features/character/Character";

function App() {
  return (
    <div className="bg-gray-600 container mx-auto h-full py-4 min-h-screen flex justify-evenly">
      <Character />
      <Character />
      <Character />
    </div>
  );
}

export default App;
