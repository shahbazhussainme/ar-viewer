function Layout({ children }) {
  return (
    <div id="wrapper">
      {/* Sidebar */}
      <SideBar />
      {/* End of Sidebar */}
      {/* Content Wrapper */}
      <div id="content-wrapper" className="d-flex flex-column">
        {/* Main Content */}
        <div id="content">
          {/* Topbar */}
          <NavBar />
          {/* End of Topbar */}
          {/* Begin Page Content */}
          <div className="container-fluid">
            {/* Page Heading */}
            {children}
          </div>
          {/* /.container-fluid */}
        </div>
        {/* End of Main Content */}
        {/* Footer */}
        <Footer />
        {/* End of Footer */}
      </div>
      {/* End of Content Wrapper */}
    </div>
  );
}
