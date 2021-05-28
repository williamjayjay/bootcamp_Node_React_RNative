import React, { useState, useEffect } from "react";
import api from "./services/api";

function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get("projects").then((res) => {
      console.log(res);
      setProjects(res.data);
    });
  }, []);

  async function handleAddProject() {
    // setProjects([...projects, `Novo Projeto ${Date.now()}`]);
    // console.log(projects);

    const response = await api.post("projects", {
      title: `Novo Projeto ${Date.now()}`,
      owner: "William",
    });

    const reqProject = response.data;

    // console.log("novo dado: ", response.data);
    setProjects([...projects, reqProject]);
  }

  return (
    <>
      <ul>
        {projects.map((proj) => (
          <li key={proj.id}>{proj.title}</li>
        ))}
      </ul>

      <button type="button" onClick={handleAddProject}>
        Add Projeto
      </button>
    </>
  );
}

export default App;
