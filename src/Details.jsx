import { Component } from "react";
import { useParams } from "react-router-dom";
import Carousel from "./Carousel";

class Details extends Component {
  //any class component must have a render method that returns some sort of JSX / markup / call to React.createElement.
  state = { loading: true };

  async componentDidMount() {
    //here we used componentDidMount in replace of hooks,componentDidMount is a function that's called after the first rendering is completed. This pretty similar to a useEffect call that only calls the first time. This is typically where you want to do data fetching. It doesn't have to be async; we just made it async here to make the data fetching easy.
    const res = await fetch(
      `http://pets-v2.dev-apis.com/pets?id=${this.props.params.id}`
    );
    const json = await res.json();
    this.setState(Object.assign({ loading: false }, json.pets[0])); //so here we should call setstate it will remove the loading message shown and star sowing your pet details like name city breed (pet 0)
  } //here we can replace object assign with spread operator ex: this.setState({loading: false, ...json.pets[o] }); this will work the same.

  render() {
    if (this.state.loading) {
      return <h2> Loading … </h2>;
    }

    const { animal, breed, city, state, description, name, images } =
      this.state;

    return (
      <div className="details">
        <Carousel images={images} />
        <div>
          <h1>{name}</h1>
          <h2>{`${animal} — ${breed} — ${city}, ${state}`}</h2>
          <button>Adopt {name}</button>
          <p>{description}</p>
        </div>
      </div>
    );
  }
}

const WrappedDetails = () => {
  //React Router's API only exposes hooks. If you have a class component that is a route, this is how you can use it, make a wrapper component that uses the hook you need, and then pass that into the component. You'll find yourself frequently making these little wrapper components for things like this.
  const params = useParams();
  return <Details params={params} />;
};

export default WrappedDetails;
