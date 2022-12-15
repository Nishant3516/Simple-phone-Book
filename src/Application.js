import React, { useState } from "react";
import ReactDOM from "react-dom";

const style = {
  table: {
    borderCollapse: "collapse",
  },
  tableCell: {
    border: "1px solid gray",
    margin: 0,
    padding: "5px 10px",
    width: "max-content",
    minWidth: "150px",
  },
  form: {
    container: {
      padding: "20px",
      border: "1px solid #F0F8FF",
      borderRadius: "15px",
      width: "max-content",
      marginBottom: "40px",
    },
    inputs: {
      marginBottom: "5px",
    },
    submitBtn: {
      marginTop: "10px",
      padding: "10px 15px",
      border: "none",
      backgroundColor: "lightseagreen",
      fontSize: "14px",
      borderRadius: "5px",
    },
  },
};

function PhoneBookForm(props) {
  const initCon = {
    id: null,
    first: "Coder",
    last: "Byte",
    phone: "8885559999",
  };
  const [user, setUser] = useState(initCon);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user.first || !user.last || !user.phone) return;
    props.addUser(user);
    setUser(initCon);
  };

  return (
    <form onSubmit={handleSubmit} style={style.form.container}>
      <label>First name:</label>
      <br />
      <input
        style={style.form.inputs}
        className="userFirstname"
        name="first"
        type="text"
        value={user.first}
        onChange={handleChange}
      />
      <br />
      <label>Last name:</label>
      <br />
      <input
        style={style.form.inputs}
        className="userLastname"
        name="last"
        type="text"
        value={user.last}
        onChange={handleChange}
      />
      <br />
      <label>Phone:</label>
      <br />
      <input
        style={style.form.inputs}
        className="userPhone"
        name="phone"
        type="text"
        value={user.phone}
        onChange={handleChange}
      />
      <br />
      <input
        style={style.form.submitBtn}
        className="submitButton"
        type="submit"
        value="Add User"
      />
    </form>
  );
}

function InformationTable(props) {
  const sorted = props.users.sort((a, b) => a.last.localeCompare(b.last));
  const disp =
    sorted.length > 0 ? (
      sorted.map((user, index) => (
        <tr key={index}>
          <td style={style.tableCell}>{user.first}</td>
          <td style={style.tableCell}>{user.last}</td>
          <td style={style.tableCell}>{user.phone}</td>
        </tr>
      ))
    ) : (
      <tr>
        <td colSpan={3}>&nbsp;</td>{" "}
      </tr>
    );
  return (
    <table style={style.table} className="informationTable">
      <thead>
        <tr>
          <th style={style.tableCell}>First name</th>
          <th style={style.tableCell}>Last name</th>
          <th style={style.tableCell}>Phone</th>
        </tr>
      </thead>
      <tbody>{disp}</tbody>
    </table>
  );
}

function Application(props) {
  const usersObj = [];
  const [users, setUsers] = useState(usersObj);
  const addUser = (user) => {
    user.id = users.length + 1;
    setUsers([...users, user]);
  };
  return (
    <section>
      <PhoneBookForm addUser={addUser} />
      <InformationTable users={users} />
    </section>
  );
}

export default Application;
