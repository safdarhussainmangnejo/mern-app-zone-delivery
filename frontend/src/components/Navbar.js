import Logout from './Logout';
import {useNavigate} from 'react-router-dom';
function Navbar() {
    const navigate = useNavigate();
    function LogoutApp(){
        
        localStorage.clear();
        navigate('/login');
    }
  return (
    <nav
      className="navbar navbar-expand-lg navbar-light "
      style={{ backgroundColor: '#e3f2fd' }}
    >
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <img
            src="https://zonedeliveryservices.com/wp-content/uploads/2022/02/cropped-ZDS.png"
            alt="logo"
            width="80"
            height="50"
          />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" href="#">
                Link
              </a>
            </li>
          </ul>
          <button className="btn btn-outline-success" type="submit" onClick={LogoutApp}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
export default Navbar;
