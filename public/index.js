function Spa() {
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
              <Route path="/models" exact component={Models} />
              <Route path="/createCustomer" exact component={createCustomer} />
              <Route path="/editCustomer/:id" exact component={editCustomer} />
              <Route path="/createModel" exact component={createModel} />
              <Route path="/editModel/:id" exact component={editModel} />
              <Route path="/uploadModel/:id" exact component={uploadModel} />
              <Route path="/modelUrls/:id" exact component={modelUrls} />

              <Route path="/CreateAccount/" component={CreateAccount} />
              <Route path="/login/" component={Login} />
              <Route path="/deposit/" component={Deposit} />
              <Route path="/withdraw/" component={Withdraw} />
              {/* <Route path="/transactions/" component={Transactions} /> */}
              <Route path="/balance/" component={Balance} />
              <Route path="/alldata/" component={AllData} />
            </div>
          </UserContext.Provider>
        </div>
      </Layout>
    </HashRouter>
  );
}

ReactDOM.render(<Spa />, document.getElementById("root"));
