function Spa() {
  let isAuthenticate = localStorage.getItem("token");
  if (isAuthenticate) {
    return (
      <HashRouter>
        <Layout>
          <div>
            <UserContext.Provider
              value={{
                users: [{ name: "", email: "", password: "", balance: 0 }],
              }}
            >
              <div className="container" style={{ padding: "20px" }}>
                <Route path="/" exact component={Customer} />

                <Route
                  path="/createCustomer"
                  exact
                  component={createCustomer}
                />
                <Route
                  path="/editCustomer/:id"
                  exact
                  component={editCustomer}
                />
                <Route path="/uploadModel/:id" exact component={uploadModel} />
                <Route path="/modelUrls/:id" exact component={modelUrls} />
              </div>
            </UserContext.Provider>
          </div>
        </Layout>
      </HashRouter>
    );
  } else {
    return (
      <HashRouter>
        <div>
          <UserContext.Provider
            value={{
              users: [{ name: "", email: "", password: "", balance: 0 }],
            }}
          >
            <div className="container" style={{ padding: "20px" }}>
              <Route path="/" exact component={Login} />
            </div>
          </UserContext.Provider>
        </div>
      </HashRouter>
    );
  }
}

ReactDOM.render(<Spa />, document.getElementById("root"));
