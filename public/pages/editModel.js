function editModel() {
  const [formData, setformData] = React.useState({
    customer_email: "",
    url: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setformData({ ...formData, [name]: value });
  };

  const [paramId, setparamId] = React.useState("");

  React.useEffect(() => {
    const paramId = window.location.hash.split("#/editModel/")[1];
    setparamId(paramId);
    getCustomer(paramId);
  }, []);
  const getCustomer = async (paramId) => {
    const res = await axios.get(`http://localhost:5005/api/models/${paramId}`);
    const { customer_email, url } = res.data.model;
    setformData({
      customer_email,
      url,
    });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `http://localhost:5005/api/models/${paramId}`,
        formData
      );
      alert(res.data.message);
      window.location.href = "/#/models";
    } catch (error) {
      alert(error.response.data.message);
    }
  };
  return (
    <div>
      <div className="d-sm-flex align-items-c justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Edit Model</h1>
      </div>
      <form className="user" onSubmit={onSubmit}>
        <div className="form-group">
          <input
            type="text"
            required={true}
            name="customer_email"
            value={formData.customer_email}
            onChange={handleChange}
            className="form-control form-control-user"
            placeholder=" Customer Email..."
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="url"
            required={true}
            value={formData.url}
            disabled={true}
            onChange={handleChange}
            className="form-control form-control-user"
            placeholder="model url..."
          />
        </div>

        <input
          value="Update"
          type="submit"
          className="btn btn-primary btn-user btn-block"
        />
      </form>
    </div>
  );
}
