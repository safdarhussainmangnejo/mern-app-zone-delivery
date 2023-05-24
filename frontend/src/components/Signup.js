import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const insertData = () => {
    let result = axios.post(`http://localhost:8080/InsertData`, {
      name: name,
      email: email,
      password: password,
    });

    if (result) {
      alert("Welcome to Yadgar Safar");
      navigate("/SignIn");
    } else {
      alert("User already registered");
      navigate("/Signup");
    }
  };

  return (
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
            <div className="card shadow-lg">
              <div className="card-body p-5">
                <h1 className="fs-4 card-title fw-bold mb-4">Signup</h1>
                <form onSubmit={insertData}>
                  <div className="form-outline mb-4">
                  <input
                      type="name"
                      id="form2Example1"
                      placeholder='User Name'
                      className="form-control"
                      onChange={(e) => setName(e.target.value)}
                      value={name}
                      name="name"
                    />
                    <br/>
                    <input
                      type="email"
                      id="form2Example1"
                      placeholder='Email Address'
                      className="form-control"
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                      name="email"
                    />
                    <br />
                    
                    <input
                      type="password"
                      id="form2Example2"
                      placeholder='Password'
                      className="form-control"
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                      name="password"
                    />
                  </div>

                  <button
                    type="submit"
                    name="signup"
                    className="btn btn-primary btn-block mb-4"
                  >
                    Sign up
                  </button>
                  <div className="text-center">
                    <p>
                      Have an account? <a href="Login">Sign In</a>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Signup;
