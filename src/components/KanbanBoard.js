import React, { useState, useEffect } from "react";
import StatusGroupedColumns from "./StatusGroupedColumns";
import PriorityGroupedColumns from "./PriorityGroupedColumns";
import UserGroupedColumns from "./UserGroupedColumns";

const KanbanBoard = (props) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    fetch("https://api.quicksell.co/v1/internal/frontend-assignment", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        const fetchedTasks = data.tickets.map((ticket) => ({
          id: ticket.id,
          title: ticket.id,
          description: ticket.title,
          tag: ticket.tag,
          status: ticket.status,
          priority: ticket.priority,
          user: data.users.find((user) => user.id === ticket.userId).name,
          userStatus: data.users.find((user) => user.id === ticket.userId)
            .available
            ? "online"
            : "offline",
        }));
        setTasks(fetchedTasks);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  console.log(props);

  // Render the appropriate component based on selectedGrouping
  switch (props.groupBy) {
    case "status":
      return (
        <StatusGroupedColumns
          tasks={tasks}
          groupBy={props.groupBy}
          orderBy={props.orderBy}
        />
      );
    case "priority":
      return (
        <PriorityGroupedColumns
          tasks={tasks}
          groupBy={props.groupBy}
          orderBy={props.orderBy}
        />
      );
    case "user":
      return (
        <UserGroupedColumns
          tasks={tasks}
          groupBy={props.groupBy}
          orderBy={props.orderBy}
        />
      );
    default:
      return (
        <StatusGroupedColumns
          tasks={tasks}
          groupBy={props.groupBy}
          orderBy={props.orderBy}
        />
      );
  }
};

export default KanbanBoard;
