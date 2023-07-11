import logo from "../../src/assets/images/logo.png";

const Home = () => {
  return (
    <div className="welcomeTemplate">
      <div className="container">
        <img src={logo} alt="userImage" className="img-fluid" />
        <h2 className="welcomeTemplate__title">Welcome to Website</h2>
      </div>
    </div>
  );
};

export default Home;
