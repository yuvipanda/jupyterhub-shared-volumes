import React, { useState } from "react";

const ACCESS_OPTIONS = {
  read: "Read only",
  write: "Read / Write",
  admin: "Read / Write / Admin"
};

function VolumesList(props) {
  const { volumes, currentVolumeId, onVolumeChange } = props;
  console.log(volumes);
  return (
    <div className="col-4 list-group">
      {Object.keys(volumes).map(volume_id => {
        const volume = volumes[volume_id];
        console.log(volume_id, volume);
        return (
          <VolumeListItem
            key={volume.name}
            volume={volume}
            onClick={() => onVolumeChange(volume_id)}
            active={currentVolumeId === volume_id}
          />
        );
      })}
      <button
        type="button"
        className="list-group-item list-group-item-action list-group-item-dark"
      >
        <i className="fas fa-plus-circle"></i> Create new volume
      </button>
    </div>
  );
}

function VolumeListItem(props) {
  const { name, description, users, access } = props.volume;

  return (
    <a
      href="#"
      className={
        "list-group-item list-group-item-action flex-column align-items-start " +
        (props.active ? "active" : "")
      }
      onClick={props.onClick}
    >
      <div className="d-flex w-100 justify-content-between">
        <h5 className="mb-1">{name}</h5>
        <small>{access}</small>
      </div>
      <p className="mb-1">{description}</p>
      <small>Shared with {users.length} users</small>
    </a>
  );
}

function VolumeDetail(props) {
  const { name, description, users, access } = props.volume;
  return (
    <div className="col border">
      <h1>{name}</h1>
      <p>{description}</p>
      <ul className="list-group">
        <li className="list-group-item list-group-item-light">
          Users with access
        </li>
        {users.map(user => {
          return (
            <a
              className="list-group-item d-flex justify-content-between align-items-center list-group-item-action"
              key={user.name}
              href="#"
            >
              {user.name}
              <span className="badge badge-secondary">{user.access}</span>
            </a>
          );
        })}

        <a
          href="#"
          className="list-group-item list-group-item-action list-group-item-dark"
        >
          <AddUserItem onSave={props.onNewUser} />
        </a>
        {access === "admin" && (
          <a
            href="#"
            className="list-group-item list-group-item-action list-group-item-dark"
          >
            <i className="fas fa-plus-circle"></i> Add user
          </a>
        )}
      </ul>
    </div>
  );
}

function AddUserItem(props) {
  const { onSave } = props;
  const [newUsername, setNewUsername] = useState("");
  const [newAccessControl, setNewAccessControl] = useState("read");

  return (
    <form className="form-inline justify-content-between">
      <label htmlFor="new-username" className="sr-only">
        Username
      </label>
      <input
        type="text"
        className="form-control"
        placeholder="User Name"
        id="new-username"
        className="form-control col-8 pr-2"
        value={newUsername}
        onChange={e => setNewUsername(e.target.value)}
      />
      <label htmlFor="new-state" className="sr-only">
        Access Level
      </label>
      <select
        id="new-state"
        className="form-control col-3"
        value={newAccessControl}
        onChange={e => setNewAccessControl(e.target.value)}
      >
        <option value="read">Read only</option>
        <option value="write">Read / Write</option>
        <option value="admin">Admin</option>
      </select>

      <button
        id="add-user"
        className="btn btn-primary col-1"
        onClick={() => {
          onSave(newUsername, newAccessControl);
        }}
      >
        Add
      </button>
    </form>
  );
}

export { VolumesList, VolumeDetail };
