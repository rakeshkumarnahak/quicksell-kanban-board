import React, { useState, useEffect } from "react";
import { FaSignal } from "react-icons/fa";
import { MdAdd } from "react-icons/md";
import { BsThreeDots } from "react-icons/bs";
import Card from "./Card";
import classes from "./KanbanBoard.module.css";

const KanbanBoard = () => {
  const [tasks, setTasks] = useState([]);
  //The Default grouping is according to the Status
  const columns = ["Todo", "In progress", "Backlog"];

  useEffect(() => {
    // Fetch data from the API
    fetch("https://api.quicksell.co/v1/internal/frontend-assignment")
      .then((response) => response.json())
      .then((data) => {
        // Extract tasks from the JSON response
        const fetchedTasks = data.tickets.map((ticket) => ({
          id: ticket.id,
          title: ticket.id,
          description: ticket.title,
          tag: ticket.status,
          userStatus: data.users.find((user) => user.id === ticket.userId)
            .available
            ? "online"
            : "offline",
        }));
        setTasks(fetchedTasks);
        console.log(fetchedTasks);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div className={classes["kanban-board"]}>
      {columns.map((column) => (
        <div key={column} className={classes["kanban-column"]}>
          <div className={classes["column-header"]}>
            <div className={classes["column-title-group"]}>
              <FaSignal className={classes["signal-icon"]} />
              <h3 className={classes["column-title"]}>{column}</h3>
            </div>
            <div className={classes["additional-title-icons"]}>
              <MdAdd className={classes["add-icon"]} />
              <BsThreeDots className={classes["dots-icon"]} />
            </div>
          </div>
          {tasks
            .filter((task) => task.tag === column)
            .map((task) => (
              <Card
                key={task.id}
                title={task.id}
                description={task.description}
                tag={task.tag}
                userStatus={task.userStatus}
              />
            ))}
        </div>
      ))}
    </div>
  );
};

export default KanbanBoard;
