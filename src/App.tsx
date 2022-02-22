import { Character } from "./features/character/Character";
import { ThemeProvider } from "styled-components";
import { icrpgTheme } from "./theme";
function App() {
  return (
    <ThemeProvider theme={icrpgTheme}>
      <div>
        <Character ix={0} />
      </div>
    </ThemeProvider>
  );
}

export default App;
