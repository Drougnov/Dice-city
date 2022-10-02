export default function App(){
  return(
    <div className='board'>
      <div className="counter">
        <div className="counter__time">
          <i class="fa-solid fa-stopwatch"></i>
          <span>01:00:00</span>
        </div>
        <div className="counter__roll">
          <i class="fa-solid fa-dice"></i>
          <span>15</span>
        </div>
      </div>
      <div className="die-container">
        <i class="fa-solid fa-dice-one"></i>
        <i class="fa-solid fa-dice-one"></i>
        <i class="fa-solid fa-dice-one"></i>
        <i class="fa-solid fa-dice-one"></i>
        <i class="fa-solid fa-dice-one"></i>
        <i class="fa-solid fa-dice-one"></i>
        <i class="fa-solid fa-dice-one"></i>
        <i class="fa-solid fa-dice-one"></i>
        <i class="fa-solid fa-dice-one"></i>
        <i class="fa-solid fa-dice-one"></i>
        <i class="fa-solid fa-dice-one"></i>
        <i class="fa-solid fa-dice-one"></i>
        <i class="fa-solid fa-dice-one"></i>
        <i class="fa-solid fa-dice-one"></i>
        <i class="fa-solid fa-dice-one"></i>
      </div>
      <div className="btns">
        <button><i class="fa-solid fa-volume-xmark"></i><i class="fa-solid fa-volume-high"></i></button>
        <button><i class="fa-solid fa-dice"></i></button>
        <button><i class="fa-solid fa-moon"></i><i class="fa-solid fa-sun"></i></button>
      </div>
    </div>
  )
}