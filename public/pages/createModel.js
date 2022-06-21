function createModel() {
  const [formData, setformData] = React.useState({
    customer_email: "",
    url: "",
    email: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setformData({ ...formData, [name]: value });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5005/api/models",
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
        <h1 className="h3 mb-0 text-gray-800">Add Model</h1>
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
            onChange={handleChange}
            className="form-control form-control-user"
            placeholder="model url..."
          />
        </div>

        <input
          value="Create"
          type="submit"
          className="btn btn-primary btn-user btn-block"
        />
      </form>
    </div>
  );
}
