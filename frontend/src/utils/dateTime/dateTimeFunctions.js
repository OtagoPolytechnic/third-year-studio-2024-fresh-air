import { sensorOfflineTimer } from "../constants/constants";

// Check a devices last sensor update > 6 minutes
export const checkOfflineDate = (date) => {
    const currentDate = new Date();
    const lastUpdated = new Date(date);
    const diff = Math.abs(currentDate - lastUpdated) / 1000;
    const minutes = Math.floor(diff / 60);

    if (minutes >= sensorOfflineTimer) {
        return true;
    }
    return false;
  };