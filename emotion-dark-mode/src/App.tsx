/** @jsx jsx */
import { jsx } from "@emotion/core"
import { Css } from "./Css";

function App() {
  return (
    <div css={Css.darkMode.$}>
      <div css={Css.primary.bgSecondary.$}>
        some text
      </div>
    </div>
  );
}

export default App;
