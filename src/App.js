import "./App.css";
import Navbar from "./components/Navbar";
import KanbanBoard from "./components/KanbanBoard";
import { useState } from "react";

function App() {
  const [groupBy, setGroupBy] = useState("status");
  const [orderBy, setOrderBy] = useState("priority");
  return (
    <div>
      <Navbar setGroupBy={setGroupBy} setOrderBy={setOrderBy} />
      <KanbanBoard groupBy={groupBy} orderBy={orderBy} />
    </div>
  );
}

export default App;
