import { useState } from 'react';
const GroupedTeamMembers = ({ employees, selectedTeam, setTeam }) => {
  const [groupedEmployees, setGroupedData] = useState(groupTeamMembers());
  function groupTeamMembers() {
    let teams = [];
    let set = new Set();
    for (const employee of employees) {
      if (set.has(employee.teamName)) continue;
      set.add(employee.teamName);
      let teamName = employee.teamName;
      let employeeList = employees.filter(
        (employee) => employee.teamName === teamName
      );
      let team = {};
      team.members = employeeList;
      team.team = teamName;
      team.collapsed = selectedTeam === teamName ? false : true;
      teams.push(team);
    }
    return teams;
  }
  function handleTeamClick(event) {
    var newGroupedData = groupedEmployees.map((groupedData) =>
      groupedData.team === event.currentTarget.id
        ? { ...groupedData, collapsed: !groupedData.collapsed }
        : groupedData
    );
    setGroupedData(newGroupedData);
    console.log(event.currentTarget.id);
    setTeam(event.currentTarget.id);
    console.log(selectedTeam);
  }
  return (
    <main className="container">
      {groupedEmployees.map((item) => {
        return (
          <div
            key={item.team}
            id={item.team}
            className="card mt-2"
            onClick={handleTeamClick}
            style={{ cursor: 'pointer' }}>
            <h4 className="card-header text-secondary bg-white">
              Team Name: {item.team}
            </h4>
            <div
              id={'collapse_' + item.team}
              className={item.collapsed === true ? 'collapse' : ''}>
              <hr />
              {item.members.map((member) => {
                return (
                  <div key={member.id} className="mt-2">
                    <h5 className="card-title mt-2">
                      <span className="text-dark">
                        <b>Full Name:</b> {member.fullName}
                      </span>
                    </h5>
                    <p className="card-text text-dark mt-2">
                      <b>Designation:</b> {member.designation}
                    </p>
                  </div>
                );
              })}
              <hr />
            </div>
          </div>
        );
      })}
    </main>
  );
};

export default GroupedTeamMembers;