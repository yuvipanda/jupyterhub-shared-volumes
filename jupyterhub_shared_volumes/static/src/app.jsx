/**
 * UI State:
 * 1. List of Volumes
 * 2. Currently selected Volume
 */
import React, { useState, useReducer } from "react";
import ReactDOM from "react-dom";
import { VolumesList, VolumeDetail } from "./volumes";

const DUMMY_VOLUMES = {
  1: {
    name: "My Volume",
    description: "Some description of this volume",
    users: [{ name: "Yuvi Panda", access: "read" }],
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

const INITIAL_STATE = {
  volumes: DUMMY_VOLUMES,
  selectedVolumeId: 1
};

function reducer(state, action) {
  console.log(action);
  switch (action.type) {
    case "ADD_USER":
      const { volumeId, user, access } = action;
      let newState = Object.assign({}, state);
      newState.volumes[volumeId].users.push({
        name: user,
        access: access
      });
      console.log(newState);
      return newState;
    case "SELECT_VOLUME":
      const { selectedVolumeId } = action;
      // FIXME: Removed 'let' here to re-use var name, ugh
      newState = Object.assign({}, state);
      newState.selectedVolumeId = selectedVolumeId;
      return newState;
  }
}

function App(props) {
  // Current list of volumes is top level state!
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  console.log(state);
  return (
    <div className="container">
      <PageHeader />

      <main className="row">
        <VolumesList
          volumes={state.volumes}
          currentVolumeId={state.selectedVolumeId}
          onVolumeChange={id => {
            dispatch({ type: "SELECT_VOLUME", volumeId: id });
          }}
        />
        <VolumeDetail
          volume={state.volumes[state.selectedVolumeId]}
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
