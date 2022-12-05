import React, { useEffect } from "react";

function ComponentName(props) {
  return (
    <div className="floating-alerts">
      {props.messages.map((msg, index) => {
        return (
          <div key={index} className="alert alert-success text-center floating-alert shadow-sm">
            {msg}
          </div>
        );
      })}
    </div>
  );
}

export default ComponentName;
