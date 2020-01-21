import React from "react";
import ReactDOM from "react-dom";
import { VolumesList, VolumeDetail } from "./volumes";

function App(props) {
  const volumes = [
    {
      name: "My Volume",
      description: "Some description of this volume",
      users: [{ name: "Yuvi Panda", access: ["read"] }],
      access: "write"
    },
    {
      name: "Your Volume",
      description: "Some other description of this",
      users: [
        {
          name: "Arfon Smith",
          access: "admin"
        },
        {
          name: "Yuvi Panda",
          access: "read"
        }
      ],
      access: "admin"
    }
  ];
  return (
    <div className="container">
      <PageHeader />

      <main className="row">
        <VolumesList volumes={volumes} />
        <VolumeDetail volume={volumes[1]} />
      </main>
    </div>
  );
}

function PageHeader(props) {
  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
      <div className="container">
        <a className="navbar-brand" href="#">
          JupyterHub Shared Volumes
        </a>
      </div>
    </nav>
  );
}

export default App;
