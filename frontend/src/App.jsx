import './App.css'
import { Co2Level } from './Component/Co2Level'
import { SensorHistory } from './Component/SensorHistory'
import { Co2Home } from "./Component/Co2/Co2Home"
import RoomSelector from './Component/RoomSelector'

export const App = () => {
  return (
   <>
    <Co2Home />
    <Co2Level />
    <SensorHistory />

    <RoomSelector />
   </>
  )
}