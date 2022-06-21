function modelUrls() {
  const [models, setmodels] = React.useState("");

  React.useEffect(() => {
    const paramId = window.location.hash.split("#/modelUrls/")[1];

    getModels(paramId);
  }, []);
  const getModels = async (paramId) => {
    const res = await axios.post(`${BASE_URL}/customers/getModel`, {
      uniqueId: paramId,
    });
    const { models_url } = res.data.model;
    setmodels(models_url);
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
                </tr>
              </thead>

              <tbody>
                {models && models.length > 0
                  ? models.map((url, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>

                        <td>{url}</td>
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
