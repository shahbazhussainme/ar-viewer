function Models() {
  const [models, setmodels] = React.useState("");
  React.useEffect(() => {
    getModels();
  }, []);
  const getModels = async () => {
    const res = await axios.get("http://localhost:5005/api/models");
    setmodels(res.data.models);
  };
  const handleDelete = async (paramId) => {
    try {
      const res = await axios.delete(
        `http://localhost:5005/api/models/${paramId}`
      );
      alert(res.data.message);
      window.location.reload();
    } catch (error) {
      alert(error.response.data.message);
    }
  };
  return (
    <>
      <div className="d-sm-flex align-items-center justify-content-end mb-4">
        <a
          href="#/createModel"
          className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"
        >
          <i className="fas fa-plus fa-sm text-white-50"></i> Add Model
        </a>
      </div>
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">Models</h6>
        </div>

        <div className="card-body">
          <div className="table-responsive">
            <table
              className="table table-bordered"
              id="dataTable"
              width="100%"
              cellSpacing={0}
            >
              <thead>
                <tr>
                  <th>#Sr </th>

                  <th>Customer Email</th>

                  <th>Url</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {models && models.length > 0
                  ? models.map(({ _id, customer_email, url }, index) => (
                      <tr key={_id}>
                        <td>{index + 1}</td>

                        <td>{customer_email}</td>

                        <td>{url}</td>
                        <td>
                          <a
                            href={`/#/editModel/${_id}`}
                            className="btn btn-danger btn-circle mr-2"
                          >
                            <i className="fas fa-edit"></i>
                          </a>
                          <a
                            onClick={() => handleDelete(_id)}
                            className="btn btn-danger btn-circle"
                          >
                            <i className="fas fa-trash"></i>
                          </a>
                        </td>
                      </tr>
                    ))
                  : null}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
