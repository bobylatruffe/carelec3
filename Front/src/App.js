import { Fragment } from "react";

// import ResumerCurrentRevision from "./components/ResumerCurrentRevision/ResumerCurrentRevision";
// import EtatDesLieux from "./components/EtatDesLieux/EtatDesLieux";
import Fait from "./components/Fait/Fait";

function App() {
  return (
    <Fragment>
      <h1>Carelec</h1>
      {/* <ResumerCurrentRevision />
      <EtatDesLieux type="pickUp" admin={true} /> */}
      <Fait />
    </Fragment>
  );
}

export default App;
