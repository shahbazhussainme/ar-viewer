function editCustomer() {
  const [formData, setformData] = React.useState({
    first_name: "",
    last_name: "",
    email: "",
  });
  const [paramId, setparamId] = React.useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setformData({ ...formData, [name]: value });
  };
  React.useEffect(() => {
    const paramId = window.location.hash.split("#/editCustomer/")[1];
    setparamId(paramId);
    getCustomer(paramId);
  }, []);
  const getCustomer = async (paramId) => {
    const res = await axios.get(`${BASE_URL}/customers/${paramId}`);
    const { first_name, last_name, email } = res.data.customer;
    setformData({
      first_name,
      last_name,
      email,
    });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`${BASE_URL}/customers/${paramId}`, formData);
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
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            className="form-control form-control-user"
            id="exampleInputFirstName"
            placeholder=" First Name..."
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="last_name"
            required={true}
            value={formData.last_name}
            onChange={handleChange}
            className="form-control form-control-user"
            id="exampleInputLastName"
            aria-describedby="emailHelp"
            placeholder=" Last Name..."
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            name="email"
            required={true}
            value={formData.email}
            disabled
            onChange={handleChange}
            className="form-control form-control-user"
            id="exampleInputEmail"
            aria-describedby="emailHelp"
            placeholder=" Email Address..."
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
