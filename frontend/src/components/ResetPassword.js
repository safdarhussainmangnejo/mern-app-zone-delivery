import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
function ResetPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const [response, setResponse] = useState("");
  const [clicked, setClicked] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("token");
    if (auth) {
      navigate("/Home");
    }
  }, []);

  const submitData = async (e) => {
    e.preventDefault();
    setClicked(true);
    setEmail("");
    if (!email) {
      setError(true);
      return false;
    }
    console.log("Email sending to reset API: ", email);
    // calling reset password API to send an email to registered email
    await axios
      .post(`http://localhost:5000/api/reset-password`, { email: email })
      .then((res) => {
        console.log("Response from rset API: ", res.data);
        if (res.data.status === 422) {
          setResponse(res.data.error);
        } else {
          setResponse(res.data.message);
        }
      })
      .catch((err) => {
        setResponse(err.message);
        console.log(err);
      });
  };

  return (
    <>
      <section className="h-100">
        <div className="container h-100">
          <div className="row justify-content-sm-center h-100">
            <div className="col-xxl-4 col-xl-5 col-lg-5 col-md-7 col-sm-9">
              <div className="text-center my-5">
                <img
                  src="https://zonedeliveryservices.com/wp-content/uploads/2022/02/cropped-ZDS.png"
                  alt="logo"
                  width="150"
                />
              </div>
              {!response ? (
                " "
              ) : (
                <div className="container" style={{ width: "420px" }}>
                  <div
                    className="alert alert-danger d-flex align-items-center"
                    role="alert"
                  >
                    <div>{response}</div>
                  </div>
                </div>
              )}
              <div className="card shadow-lg">
                <div className="card-body p-5">
                  <h1 className="fs-4 card-title fw-bold mb-4">
                    Reset Password
                  </h1>
                  <form
                    onSubmit={(e) => {
                      submitData(e);
                    }}
                  >
                    <div className="form-outline mb-4">
                      <input
                        type="email"
                        id="form2Example1"
                        placeholder="Email Address"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        name="email"
                      />
                      {error && !email && (
                        <span style={{ color: "red", fontSize: "16px" }}>
                          Enter valid email
                        </span>
                      )}
                    </div>

                    <button
                      type="submit"
                      className="btn btn-primary btn-block mb-4"
                      disabled={clicked}
                    >
                      Reset Password
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
export default ResetPassword;
