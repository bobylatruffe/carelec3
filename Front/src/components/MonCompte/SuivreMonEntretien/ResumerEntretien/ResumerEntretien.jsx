function ResumerEntretien({ vehiculeInfos, aFaire }) {
  return (
    <div>
      <p>Votre véhicule : </p>
      <p>{vehiculeInfos.libelleStandardise.motorisation}</p>
      <p>Plaque d'immatriculation : </p>
      <p>{vehiculeInfos.immat}</p>
      <p>Kilométrage que nous avez indiqué : </p>
      <p>{vehiculeInfos.km} km</p>
      <p>Ce que nous allons réalisé sur votre véhicule :</p>
      <ul>
        {aFaire.map(faire =>
          <li key={faire}>{faire}</li>
        )}
      </ul>
    </div>
  )
}

export default ResumerEntretien;