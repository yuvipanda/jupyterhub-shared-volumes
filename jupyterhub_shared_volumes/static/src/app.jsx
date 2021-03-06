/**
 * UI State:
 * 1. List of Volumes
 * 2. Currently selected Volume
 */
import React, { useState, useReducer } from "react";
import ReactDOM from "react-dom";
import { VolumesList, VolumeDetail } from "./volumes";
import { reducer, INITIAL_STATE } from "./reducer";

function App(props) {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const [selectedVolumeId, setSelectedVolumeId] = useState(1);
  return (
    <div className="container">
      <PageHeader />

      <main className="row">
        <VolumesList
          volumes={state.volumes}
          currentVolumeId={selectedVolumeId}
          onVolumeChange={id => {
            setSelectedVolumeId(id);
          }}
        />
        <VolumeDetail
          volume={state.volumes[selectedVolumeId]}
          onNewUser={(name, access) => {
            dispatch({
              type: "ADD_USER",
              user: name,
              access: access,
              volumeId: state.selectedVolumeId
            });
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
