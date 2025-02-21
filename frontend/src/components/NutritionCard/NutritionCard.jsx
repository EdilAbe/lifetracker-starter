import * as React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import "./NutritionCard.css";

export default function NutritionCard({
  nutritionId,
  imageUrl = "",
  name,
  calories,
  quantity,
  category,
  createdAt,
}) {
  const isImage = imageUrl.trim() !== "";
  return (
    <div className="nutrition-card">
      <div className="nutrition-info">
        {/* {isImage && <img src={imageUrl} alt={name} className="nutrition-image"/>} */}
        {isImage ? (
          <img src={imageUrl} alt={name} className="nutrition-image" />
        ) : (
          <div className="nutrition-ico">
            <i class="fa fa-solid fa-utensils fa-3x"></i>
          </div>
        )}
        <div className="el-1-1">
          <Link to={"/nutrition/id/" + nutritionId} className="nutrition-name">
            <h1>{name}</h1>
          </Link>
          <p className="nutrition-calories">
            {calories} {calories == 1 ? "calorie" : "calories"}
          </p>
        </div>
      </div>
      <p className="nutrition-quantity">Quantity: {quantity}</p>
      <p className="nutrition-category">{category}</p>
      <p className="nutrition-date">
        {moment(new Date(createdAt)).format("MM/DD/YYYY")}
      </p>
    </div>
  );
}
