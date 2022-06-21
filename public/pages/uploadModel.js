function uploadModel() {
  const [model, setModel] = React.useState("");
  const [paramId, setparamId] = React.useState("");

  const handleChange = (e) => {
    const file = e.target.files[0];
    setModel(file);
  };
  React.useEffect(() => {
    const paramId = window.location.hash.split("#/uploadModel/")[1];
    setparamId(paramId);
    isParamIDExist(paramId);
  }, []);
  const isParamIDExist = async (paramId) => {
    try {
      const res = await axios.get(
        `http://localhost:5005/api/customers/uniqueId/${paramId}`
      );
      const uniqueId = res.data.customer.uniqueId;
    } catch (error) {
      alert("UniqueId Does Not Exist");
      window.location.href = "#/";
    }
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("model", model);

    try {
      const res = await axios.post(
        `http://localhost:5005/api/models/uploadModel/${paramId}`,
        formData
      );
      alert(res.data.message);
      window.location.href = "/#";
    } catch (error) {
      alert(error.response.data.message);
    }
  };
  return (
    <div>
      <div className="d-sm-flex align-items-c justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Edit Customer</h1>
      </div>
      <form className="user" onSubmit={onSubmit}>
        <div className="form-group">
          <input
            type="text"
            required={true}
            value={paramId}
            accept="/application/octet-stream"
            readonly={true}
            disabled={true}
            className="form-control form-control-user"
          />
        </div>
        <div className="form-group">
          <input
            type="file"
            required={true}
            name="model"
            onChange={handleChange}
            className="form-control "
          />
        </div>

        <input
          value="Upload"
          type="submit"
          className="btn btn-primary btn-user btn-block"
        />
      </form>
    </div>
  );
}
