import { Fragment } from "react";

import ResumerCurrentRevision from "./components/ResumerCurrentRevision/ResumerCurrentRevision";
import EtatDesLieux from "./components/EtatDesLieux/EtatDesLieux";

function App() {
  return (
    <Fragment>
      <h1>Carelec</h1>
      <ResumerCurrentRevision />
      <EtatDesLieux type="pickUp" admin={true} />
    </Fragment>
  );
}

export default App;
