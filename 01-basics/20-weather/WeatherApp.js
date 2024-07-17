import { defineComponent } from 'vue/dist/vue.esm-bundler.js'
import { getWeatherData, WeatherConditionIcons } from './weather.service.ts'

export default defineComponent({
  name: 'WeatherApp',
  setup() {
    const weatherData = getWeatherData();
    const formatTemperature = (temp) => {
      return (temp - 273.15).toFixed(1)
    }
    const formatPressure = (pressure) => {
      return Math.round(pressure*0.75)
    }
    const getDescription = (alert) => {
      return `${alert.sender_name}: ${alert.description}`
    }
    const checkIsSunUp = (weatherCard) => {
      const {sunset, sunrise, dt} = weatherCard.current
      const isAfterSunrise = dt > sunrise
      const isBeforeSunset = dt < sunset
      return isAfterSunrise &&  isBeforeSunset
    }
    return {
      weatherData,
      formatTemperature,
      formatPressure,
      getDescription,
      checkIsSunUp,
      WeatherConditionIcons
    }
  },

  template: `
    <div>
      <h1 class="title">Погода в Средиземье</h1>
      <ul class="weather-list unstyled-list">
        <li v-for="weatherCard in weatherData" class="weather-card" :class="{
          'weather-card--night': !checkIsSunUp(weatherCard)
        }">
          <div class="weather-alert" v-if="weatherCard.alert">
            <span class="weather-alert__icon">⚠️</span>
            <span class="weather-alert__description">{{getDescription(weatherCard.alert)}}</span>
          </div>
          <div>
            <h2 class="weather-card__name">
              {{ weatherCard.geographic_name }}
            </h2>
            <div class="weather-card__time">
              {{ weatherCard.current.dt }}
            </div>
          </div>
          <div class="weather-conditions">
            <div class="weather-conditions__icon" :title="weatherCard.current.weather.description">{{ WeatherConditionIcons[weatherCard.current.weather.id] }}</div>
            <div class="weather-conditions__temp">{{ formatTemperature(weatherCard.current.temp) }} °C</div>
          </div>
          <div class="weather-details">
            <div class="weather-details__item">
              <div class="weather-details__item-label">Давление, мм рт. ст.</div>
              <div class="weather-details__item-value">{{ formatPressure(weatherCard.current.pressure) }}</div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Влажность, %</div>
              <div class="weather-details__item-value">{{ weatherCard.current.humidity }}</div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Облачность, %</div>
              <div class="weather-details__item-value">{{ weatherCard.current.clouds }}</div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Ветер, м/с</div>
              <div class="weather-details__item-value">{{ weatherCard.current.wind_speed }}</div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  `,
})
