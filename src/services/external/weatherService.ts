import axios from "axios";

interface WeatherResponse {
  current: {
      temp_c: number;
      condition: {
        icon: string;
      }
  }
}


export async function getForcast() {
  try {
    const response = await axios.get<WeatherResponse>(`https://api.weatherapi.com/v1/current.json?key=1c86708e00204dc8953193642241703&q=Tel-Aviv&aqi=no`);
    if (response.status != 200) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.data.current;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}