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

function addUser(state, action) {
  const { volumeId, user, access } = action;
  let newState = Object.assign({}, state);
  newState.volumes[volumeId].users.push({
    name: user,
    access: access
  });
  return newState;
}

function selectVolume(state, action) {
  const { selectedVolumeId } = action;
  let newState = Object.assign({}, state);
  newState.selectedVolumeId = selectedVolumeId;
  return newState;
}
function reducer(state, action) {
  switch (action.type) {
    case "ADD_USER":
      return addUser(state, action);
    case "SELECT_VOLUME":
      return selectVolume(state, action);
  }
}

export { reducer, INITIAL_STATE };
