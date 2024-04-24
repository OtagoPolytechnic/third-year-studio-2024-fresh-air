import React, { useState, useEffect } from "react";
import './NavBar.css'

function NavBar() {

  return (
    <>
      <nav class="Nav">
        <ul>
          <li>
            <a href="#">About</a>
          </li>
          <li>
            <a href="#">Rooms</a>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default NavBar;