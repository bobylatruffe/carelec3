import { useLocation } from "react-router-dom";

function MesInformations() {
  const location = useLocation();
  const userInfos = location.state?.userInfos;
  if (!userInfos) return null;

  return (
    <div>
      <h1>Mes informations</h1>
      <p>Nom : </p>
      <p>{userInfos.nom}</p>
      <p>Prénom : </p>
      <p>{userInfos.prenom}</p>
      <p>Date de naissance : </p>
      <p>{userInfos.dateOfBirth}</p>
      <p>Adresse postale : </p>
      <p>{userInfos.addrPost} {userInfos.cp} {userInfos.ville}</p>
      <p>Numéro de contact : </p>
      <p>{userInfos.portable}</p>
      <p>Email : </p>
      <p>{userInfos.email}</p>
    </div>
  )
}

export default MesInformations;