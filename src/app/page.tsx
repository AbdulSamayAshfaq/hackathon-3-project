import BlueHeader from "./components/blue-header/page";
import Carausel from "./components/carausel/page";
import Editors from "./components/editors-pick/page";
import Footer from "./components/footer";
import GreenDiv from "./components/green-div";
import Lastdiv from "./components/lastdiv/page";
import Navbar from "./components/navbar";
import ProductsCard from "./components/products-card/page";
import Whitediv from "./components/white-dic/page";

export default function Home(){
  return(
    <div>
      <BlueHeader/>
      <Navbar/>
      <Carausel/>
      <Editors/>
      <ProductsCard/>
      <GreenDiv/>
      <Whitediv/>
      <Lastdiv/>
      <Footer/>
           
    </div>
  )
}