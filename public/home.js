function Home(props) {
  let isAuthenticate = localStorage.getItem("token");

  // React.useEffect(() => {
  //   let address = window.location;
  //   if (address) {
  //     let token = address.hash.split("?")[1];

  //     if (token) {
  //       let _token = address.hash.split("?")[1].split("=")[1];
  //       let _user = address.hash.split("?")[1].split("&")[1].split("=")[1];
  //       localStorage.setItem("token", _token);
  //       localStorage.setItem("username", _user);
  //       window.location.href = "/";
  //     }

  //     if (!isAuthenticate) {
  //       window.location.href = "#/login/";
  //     }
  //   }
  // }, []);

  return (
    <div>
      {/* End of Page Wrapper */}

      <h1>Home</h1>
    </div>
  );
}
