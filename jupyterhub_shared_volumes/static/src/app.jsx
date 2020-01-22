/**
 * UI State:
 * 1. List of Volumes
 * 2. Currently selected Volume
 */
import React, { useState } from "react";
import ReactDOM from "react-dom";
import { VolumesList, VolumeDetail } from "./volumes";

const DUMMY_VOLUMES = {
  1: {
    name: "My Volume",
    description: "Some description of this volume",
    users: [{ name: "Yuvi Panda", access: ["read"] }],
    access: "write"
  },
  2: {
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
};

function App(props) {
  // Current list of volumes is top level state!
  const [volumes, setVolumes] = useState(DUMMY_VOLUMES);
  const [currentVolume, setCurrentVolume] = useState(1);
  return (
    <div className="container">
      <PageHeader />

      <main className="row">
        <VolumesList
          volumes={volumes}
          currentVolumeId={currentVolume}
          onVolumeChange={id => {
            setCurrentVolume(id);
          }}
        />
        <VolumeDetail
          volume={volumes[currentVolume]}
          onNewUser={(name, access) => {
            let newVolumes = Object.assign({}, volumes);
            newVolumes[currentVolume].users.push({
              name: name,
              access: access
            });
            console.log(newVolumes);
            setVolumes(newVolumes);
          }}
        />
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
