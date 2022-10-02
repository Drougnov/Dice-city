export default function Die(props){
    return(
        <div className="die">
            {props.value === 1 && <i className="fa-solid fa-dice-one"></i>}
            {props.value === 2 && <i className="fa-solid fa-dice-two"></i>}
            {props.value === 3 && <i className="fa-solid fa-dice-three"></i>}
            {props.value === 4 && <i className="fa-solid fa-dice-four"></i>}
            {props.value === 5 && <i className="fa-solid fa-dice-five"></i>}
            {props.value === 6 && <i className="fa-solid fa-dice-six"></i>}
        </div>
    )
}