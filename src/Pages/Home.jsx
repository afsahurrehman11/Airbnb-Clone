import Cards from "../Components/Cards";
import Categories from "../Components/Categories";
// import Footer from "../Components/Footer";
// import LowerNavbar from "../Components/LowerNavbar";
// import Navbar from "../Components/Navbar";
import SearchBar from "../Components/SearchBar";
// import SingleSearchBar from "../Components/SingleSearchBar";

const Home = ({ searchQuery }) => {
  return (
    <div>
      {/* <Navbar />
      <SingleSearchBar /> */}
      <SearchBar />
      <Categories />
      <Cards searchQuery={searchQuery} />
      {/* <Footer />
      <LowerNavbar /> */}
    </div>
  );
};

export default Home;
