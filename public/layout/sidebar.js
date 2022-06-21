function SideBar() {
  return (
    <ul
      className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
      id="accordionSidebar"
    >
      {/* Sidebar - Brand */}
      <a
        className="sidebar-brand d-flex align-items-center justify-content-center"
        href="index.html"
      >
        <div className="sidebar-brand-icon rotate-n-15">
          <img
            className="img-profile rounded-circle"
            width={50}
            height={50}
            src="img/logo.jpeg"
          />
        </div>
        <div className="sidebar-brand-text mx-3">ArViewer</div>
      </a>
      {/* Divider */}
      <hr className="sidebar-divider my-0" />
      {/* Nav Item - Dashboard */}

      {/* Nav Item - Charts */}
      <li className="nav-item ">
        <a className="nav-link" href="#/">
          <i className="fas fa-fw fa-user" />
          <span>Customers</span>
        </a>
      </li>

      {/* Divider */}
      <hr className="sidebar-divider d-none d-md-block" />
    </ul>
  );
}
