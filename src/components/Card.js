import React, { useState } from "react";
import userImage from "../assets/Rakesh LinkedIn Profile Image [Compressed].png";
import classes from "./Card.module.css";

const Card = (props) => {
  const [isChecked, setIsChecked] = useState("false");
  return (
    <div className={classes["card-card"]}>
      <div className={classes["card-header"]}>
        <div className={classes["card-title"]}>{props.title}</div>
        <div className={classes["user-image"]}>
          <div className={classes["user-image_mask"]}>
            <img src={userImage} alt="User" />
          </div>
          <div
            className={`${classes["status-dot"]} ${classes[props.userStatus]}`}
          />
        </div>
      </div>
      <div className={classes["card-description"]}>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={() => setIsChecked(!isChecked)}
        />
        {props.description}
      </div>
      <div className={classes["card-footer"]}>
        {/* <div className={classes["card-options"]}>
          <div className={classes["options-icon"]}>&#8943;</div>
        </div> */}
        <div className={classes["card-tag"]}>
          <div className={classes["tag-dot"]} />
          <div className={classes["tag-text"]}>{props.tag}</div>
        </div>
      </div>
    </div>
  );
};

export default Card;
