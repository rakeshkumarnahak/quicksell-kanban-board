import React, { useState } from "react";
import { FaSignal } from "react-icons/fa";
import { MdAdd } from "react-icons/md";
import { BsThreeDots } from "react-icons/bs";
import Card from "./Card";
import classes from "./KanbanBoard.module.css";

const StatusGroupedColumns = (props) => {
  let tasks = props.tasks;

  const status = [
    ...new Set(tasks.reduce((acc, val) => acc.concat(val.status), [])),
  ];

  let prioritySortedTasks;
  let titleSortedTasks;

  switch (props.orderBy) {
    case "priority":
      prioritySortedTasks = tasks
        .slice()
        .sort((a, b) => a.priority - b.priority);
      tasks = prioritySortedTasks;

      break;
    case "title":
      titleSortedTasks = tasks.slice().sort((a, b) => a.title - b.title);
      tasks = titleSortedTasks;
      break;
    default:
    // setTasks(tasks.priority.sort());
  }

  return (
    <div className={classes["kanban-board"]}>
      {status.map((column) => (
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
            .filter((task) => task.status === column)
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

export default StatusGroupedColumns;
