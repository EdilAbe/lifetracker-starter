import * as React from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";

export default function LandingPage() {
  const navigate = useNavigate();
  return (
    <div className="landing-page">
      <div className="hero">
        <img
          className="hero-img"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsSdknRBQ5-4033yXDeYuvXwQKYZxkxJwX9w&usqp=CAU"
          alt="hero image"
        />
        <div className="title">
          <h1 id="landing-title">LIFE TRACKER</h1>
          <p id="landing-message">
            Helping you<br></br> take back control <br></br> of your world
          </p>
        </div>
      </div>
      <div className="categories">
        <div className="category">
          <img
            className="img"
            src="https://th.bing.com/th/id/OIP.nO4_m0Bq67pL3yAiTKDWVgHaEo?w=308&h=192&c=7&r=0&o=5&dpr=1.5&pid=1.7"
            alt="fitness"
          ></img>
          <p>Fitness</p>
        </div>
        <div className="category">
          <img
            className="img"
            src="https://th.bing.com/th/id/OIP.D2dBcHq8QOQqQ2zk4K65fAHaFj?w=264&h=198&c=7&r=0&o=5&dpr=1.5&pid=1.7"
            alt="food"
          ></img>
          <p>Food</p>
        </div>
        <div className="category">
          <img
            className="img"
            src="https://th.bing.com/th/id/OIP.sRZ_wb6_D6qpbSkubRakLAHaEK?w=302&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7"
            alt="rest"
          ></img>
          <p>Rest</p>
        </div>
        <div className="category">
          <img
            className="img"
            src="	https://th.bing.com/th/id/OIP.LBI8tP39JZZKbMFoIT2iPgHaIs?w=148&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7"
            alt="planner"
          ></img>
          <p>Planner</p>
        </div>
      </div>
    </div>
  );
}
