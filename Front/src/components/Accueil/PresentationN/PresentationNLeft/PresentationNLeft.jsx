import "../PresentationN.css";

function PresentationNLeft(props) {
  return (
    <div className="PresentationN PresentationNLeft">
      <img src={props.img} alt="" />
      <div className="content">
        <h2>{props.h2}</h2>
        <p>{props.p}</p>
      </div>
      {/* <div className="deco"> */}
      <img className="deco" src={props.deco} alt="" />
      {/* </div> */}
    </div>
  )
}

export default PresentationNLeft