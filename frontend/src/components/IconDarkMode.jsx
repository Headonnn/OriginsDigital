import React, { useState } from "react";
import DayNightToggle from "react-day-and-night-toggle";

function IconDarkMode() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  return (
    <DayNightToggle
      onChange={() => setIsDarkMode(!isDarkMode)}
      checked={isDarkMode}
      size={22}
    />
  );
}

export default IconDarkMode;
