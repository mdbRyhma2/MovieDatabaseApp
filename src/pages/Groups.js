import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";


export default function Groups() {

  const [groups, setgroups] = useState([
    { id: 1, name: 'Group 1' },
    { id: 2, name: 'Group 2' },
    { id: 3, name: 'Group 3' },
    { id: 4, name: 'Group 4' },
    { id: 5, name: 'Group 5' }
  ]);

  return (
    <div id="container">
      <section className="groups">
        <h2>Groups</h2>
        <div className="group-list">
          <ul>
            {groups.map((group) => (
              <li key={group.id}>
                <Link to={`/group/${group.id}`} state= {{ groupName: group.name}}>
                  {group.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
