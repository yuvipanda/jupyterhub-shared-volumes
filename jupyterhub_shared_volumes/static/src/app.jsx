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
  // FIXME: Normalize the data!
  const [currentVolume, setCurrentVolume] = useState(0);
  return (
    <div className="container">
      <PageHeader />

      <main className="row">
        <VolumesList
          volumes={volumes}
          onVolumeChange={id => {
            setCurrentVolume(id);
          }}
        />
        <VolumeDetail volume={volumes[currentVolume]} />
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
