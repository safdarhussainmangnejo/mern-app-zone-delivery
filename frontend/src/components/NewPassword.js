import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';
function NewPassword() {

    const {token} = useParams()
    console.log(token)
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [response, setResponse]=useState('');
    const navigate = useNavigate()

    useEffect(() => {
        const auth = localStorage.getItem('token');
        if (auth) {
            navigate('/Home');
        }
    }, [])

    
    const submitData = async (e) => {

        e.preventDefault();

        if(!password) {
            setError(true);
            return false;
        }
        console.log("password sending to reset API: ", password)
        await axios.post(`http://localhost:5000/api/new-password`, { password:password, token:token })
        .then(res=>{
            console.log("Response from rset API: ", res.data)
           if(res.data.status === 422){
                setResponse(res.data.error);

           }
           else{
                setResponse(res.data.message);
                navigate('/Login')
           }
        }).catch(err=>{
            setResponse(err.message);
            console.log(err)
        })
    }
    

    return <>
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
                <h1 className="fs-4 card-title fw-bold mb-4">Reset Password</h1>
        <form onSubmit={(e) => {
            submitData(e);
        }} >


            <div className="form-outline mb-4">
                <input type="password" id="form2Example1" placeholder='Enter New Password' className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} name="password" />
                {/* <label className="form-label" for="form2Example1">password address</label> */}
                {error && !password &&<span style={{color:"red", fontSize:"16px"}}>Enter valid password</span>}
            </div>

            <button type="submit" className="btn btn-primary btn-block mb-4">Update Password</button>
        </form>
        </div>
            </div>
          </div>
        </div>
      </div>
      {!response ? " ": <div className="container" style={{width:'450px'}}>
      <div className="alert alert-danger d-flex align-items-center" role="alert">
        <div>
        {response}
        </div>
      </div>
      </div>}
    </section>
    </>
}
export default NewPassword;