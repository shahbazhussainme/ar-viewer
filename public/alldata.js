function AllData() {
  const [data, setData] = React.useState("");

  React.useEffect(() => {
    // fetch all accounts from API
    fetch("/account/all")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setData(data);
      });
  }, []);

  return (
    <>
      <h5>All Data in Store:</h5>
      <table>
        <tr>
          <th>#Sr</th>
          <th>Name</th>
          <th>Email</th>
          <th>Balance</th>
          <th>Password</th>
        </tr>
        {data &&
          data.length > 0 &&
          data.map(({ name, email, balance, password }, index) => (
            <tr key={index}>
              <td>{index}</td>
              <td>{name}</td>
              <td>{email}</td>
              <td>{balance}</td>
              <td>{password}</td>
            </tr>
          ))}
      </table>
    </>
  );
}
