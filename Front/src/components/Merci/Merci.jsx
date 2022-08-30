import { useLocation } from "react-router-dom";

function Merci() {
  const location = useLocation();
  if (!location.state) {
    window.location.replace("http://localhost:3000");
  }

  return (
    <div>
      <h1>Merci</h1>
    </div>
  )
}

export default Merci