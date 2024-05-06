import "./App.css";
import { Co2Level } from "./Component/Co2Level";
import { SensorHistory } from "./Component/SensorHistory";
import { Co2Home } from "./Component/Co2/Co2Home";
import NavBar from "./Component/NavBar";

export const App = () => {
  return (
    <>
      <NavBar />

      <div className="content">
        <Co2Home />
        <SensorHistory />
      </div>
    </>
  );
};
