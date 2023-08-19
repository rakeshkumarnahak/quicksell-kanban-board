import React, { useState, useEffect, useRef } from "react";
import { BsChevronDown } from "react-icons/bs";
import { IoIosOptions } from "react-icons/io";
import classes from "./Navbar.module.css";

const Navbar = (props) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dropdownRef = useRef(null); // Reference to the main dropdown container

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  // Attach a click event listener to the document to close the dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        closeDropdown();
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  function handleGroupingSubmission(selected) {
    props.setGroupBy(selected);
    console.log(selected);
  }

  return (
    <nav className={classes.navbar}>
      <div className={classes.dropdownContainer} ref={dropdownRef}>
        <div className={classes.displayContainer} onClick={toggleDropdown}>
          <IoIosOptions className={classes.icon} />
          <div className={classes.displayText}>Display</div>
          <BsChevronDown
            className={`${classes.icon} ${
              isDropdownOpen ? classes.rotated : ""
            }`}
          />
        </div>
        {isDropdownOpen && (
          <div className={classes.dropdownContent}>
            <div className={classes.subDropdown}>
              <div className={classes.label}>Grouping</div>
              <select className={classes.select}>
                <div onClick={handleGroupingSubmission("status")}>Status</div>
                <option onClick={handleGroupingSubmission("user")}>User</option>
                <option onClick={handleGroupingSubmission("priority")}>
                  Priority
                </option>
              </select>
            </div>
            <div className={classes.subDropdown}>
              <div className={classes.label}>Ordering</div>
              <select className={classes.select}>
                <option onClick={props.setOrderBy("priority")}>Priority</option>
                <option onClick={props.setOrderBy("title")}>Title</option>
              </select>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
