import './Weather.css'

const Weather = ({ condition }) => {
  if (condition.main == "Clear") return (
    <div class="weather-sun">
      <div class="sun">
        <div class="rays"></div>
        <div class="rays"></div>
        <div class="rays"></div>
        <div class="rays"></div>
      </div>
    </div>
  )

  if (condition.main == "Clouds") {
    if (condition.description == "few clouds") {
      return (
        <div class="weather-cloudAndSun">
      <div class="cloud"></div>
      <div class="sun">
        <div class="rays"></div>
        <div class="rays"></div>
        <div class="rays"></div>
        <div class="rays"></div>
      </div>
    </div>
      )
    }
      return (
      <div class="weather-cloud">
      <div class="cloud"></div>
      <div class="cloud"></div>
    </div>
      )
  }

  if (condition.main == "Rain") return (
    <div class="weather-rain">
      <div class="cloud"></div>
      <div class="rain"></div>
      <div class="rain"></div>
      <div class="rain"></div>
      <div class="rain"></div>
    </div>
  )
  return (
    <div class="weather"></div>)
}

export default Weather;
