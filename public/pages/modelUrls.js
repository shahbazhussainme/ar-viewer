function modelUrls() {
  const [models, setmodels] = React.useState("");
  const [paramId, setparamId] = React.useState("");

  React.useEffect(() => {
    const paramId = window.location.hash.split("#/modelUrls/")[1];
    setparamId(paramId);
    getModels(paramId);
  }, []);
  const getModels = async (paramId) => {
    const res = await axios.post(`${BASE_URL}/customers/getModel`, {
      uniqueId: paramId,
    });
    const { models_url } = res.data.model;
    setmodels(models_url);
  };
  const handleDelete = async (id) => {
    try {
      const res = await axios.post(`${BASE_URL}/customers/deleteModel`, {
        model_url: id,
        uniqueId: paramId,
      });
      alert(res.data.message);
      // window.location.reload();
    } catch (error) {
      alert(error.response.data.message);
    }
  };
  return (
    <>
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">Models Url</h6>
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
                  <th>Url</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {models && models.length > 0
                  ? models.map((url, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>

                        <td>{url}</td>
                        <td>
                          <a
                            href="#"
                            onClick={() => handleDelete(url)}
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
