import "../PresentationN.css";

function PresentationNRight(props) {
  return (
    <div className="PresentationN PresentationNRight">
      <div className="content">
        <h2>{props.h2}</h2>
        <p>{props.p}</p>
      </div>
      <img src={props.img} alt="" />
      <img className="deco" src={props.deco} alt="" />
    </div>
  )
}

export default PresentationNRight;