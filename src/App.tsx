import { Character } from "./features/character/Character";
import { ThemeProvider } from "styled-components";
import { icrpgTheme } from "./theme";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";

function App() {
  return (
    <ThemeProvider theme={icrpgTheme}>
      <DndProvider backend={HTML5Backend}>
        <div>
          <Character ix={0} />
        </div>
      </DndProvider>
    </ThemeProvider>
  );
}

export default App;
