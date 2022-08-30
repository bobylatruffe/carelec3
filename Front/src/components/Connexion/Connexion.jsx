import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom";


import hash from "../../utilitaires/hash";

function Connexion() {
  const [email, setEmail] = useState('bozlak.fatih@gmail.com');
  const [portable, setPortable] = useState('0636679200');

  const handlerOnChangeEmail = (e) => {
    setEmail(e.target.value);
  }

  const handlerOnChangePortable = (e) => {
    setPortable(e.target.value);
  }

  const navigate = useNavigate();
  const location = useLocation();
  const handlerOnClick = (e) => {
    e.preventDefault();

    const userId = hash(portable + email);
    fetch(`http://localhost:5000/api/user/${userId}`)
      .then(resp => {
        if (resp.status === 500) {
          window.alert("Impossible de se connecter, créer un compte");
          return null;
        }

        if (location.state) {
          location.state = {
            ...location.state,
            userId: userId,
          }

          console.log(location.state);

          navigate("/prendrerdv", { state: location.state })
        } else
          navigate("/moncompte")
      })
  }

  return (
    <div>
      <form>
        <label>Email :
          <input type="email" required onChange={handlerOnChangeEmail}></input>
        </label>
        <label>Portable :
          <input type="text" required onChange={handlerOnChangePortable}></input>
        </label>
        <button onClick={handlerOnClick}>Connexion</button>
      </form>
    </div>
  )
}

export default Connexion