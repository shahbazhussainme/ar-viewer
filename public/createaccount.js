function CreateAccount() {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState("");

  return (
    <Card
      bgcolor="primary"
      header="Create Account"
      // status={status}
      body={
        show ? (
          <CreateForm setShow={setShow} setStatus={setStatus} status={status} />
        ) : (
          <CreateMsg setShow={setShow} status={status} setStatus={setStatus} />
        )
      }
    />
  );
}

function CreateMsg(props) {
  return (
    <>
      <h5>Success</h5>
      <button
        type="submit"
        className="btn btn-light"
        onClick={() => props.setShow(true)}
      >
        Add another account
      </button>
      {props.status !== "" ? (
        <h3 style={{ paddingTop: "20px" }}>Error : {props.status}</h3>
      ) : (
        ""
      )}
    </>
  );
}

function CreateForm(props) {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  function handle() {
    // console.log(name, email, password);
    const url = `/account/create/${name}/${email}/${password}`;
    var res = fetch(url)
      .then((response) => response.text())
      .then((text) => {
        try {
          console.log("err:", text);
          if (text.toString() === "User already in exists") {
            props.setStatus(text);
          } else {
            props.setStatus("");
          }
          props.setShow(false);
        } catch (err) {
          // props.setStatus(text);
        }
      });
    props.setShow(false);
  }

  return (
    <>
      Name
      <br />
      <input
        type="input"
        className="form-control"
        placeholder="Enter name"
        value={name}
        onChange={(e) => setName(e.currentTarget.value)}
      />
      <br />
      Email address
      <br />
      <input
        type="input"
        className="form-control"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.currentTarget.value)}
      />
      <br />
      Password
      <br />
      <input
        type="password"
        className="form-control"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.currentTarget.value)}
      />
      <br />
      <button type="submit" className="btn btn-light" onClick={handle}>
        Create Account
      </button>
    </>
  );
}
