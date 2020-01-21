import React, { useState } from "react";

function VolumesList(props) {
  const { volumes, onVolumeChange } = props;
  return (
    <div className="col-4 list-group">
      {volumes.map((volume, i) => {
        return (
          <VolumeListItem
            key={volume.name}
            volume={volume}
            onClick={() => onVolumeChange(i)}
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
      className="list-group-item list-group-item-action flex-column align-items-start"
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

export { VolumesList, VolumeDetail };
