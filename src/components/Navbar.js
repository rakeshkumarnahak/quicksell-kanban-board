import React, { useState, useEffect, useRef } from "react";
import { BsChevronDown } from "react-icons/bs";
import { IoIosOptions } from "react-icons/io";
import classes from "./Navbar.module.css";

const Navbar = () => {
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
                <option>Status</option>
                <option>User</option>
                <option>Priority</option>
              </select>
            </div>
            <div className={classes.subDropdown}>
              <div className={classes.label}>Ordering</div>
              <select className={classes.select}>
                <option>Priority</option>
                <option>Title</option>
              </select>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
