//Making our custom hook that will allow the user to know a list of breeds based on which animal is selected +  this would be nice to request once and if a user returns later to the same animal (LOADED CACHE)
import { useState, useEffect } from "react";

const localCache = {}; // so if it loads once, it won't have to reload the same API call in the same session, PS: You could take this further by sticking it in local storage or we could be more intelligent about ETags.

export default function useBreedList(animal) {
  //useBreedList is our custom hook (notice the use to define it as a hook)
  const [breedList, setBreedList] = useState([]);
  const [status, settStatus] = useState("unloaded"); //this is useful to check the status of our component list if there is ana error or it's pending
  useEffect(() => {
    //we used useffect to keep tracking the state as animal changes it will rerender and this instead of making our custom tracking which is hard to implement
    if (!animal) {
      setBreedList([]); //so if someone asks for a breedlist for empty string animal he will get nothing
    } else if (localCache[animal]) {
      setBreedList(localCache[animal]);
    } else {
      requestBreedList();
    }
    async function requestBreedList() {
      setBreedList([]); //this will prevent when user switches from cat to dog as ex, it will stop providing breed as preventing gettin chiwawa for cats :D
      settStatus("loading");
      const res = await fetch(
        `http://pets-v2.dev-apis.com/breeds?animal=${animal}`
      );
      const json = await res.json();
      localCache[animal] = json.breeds || []; //this will help if the user choose as a ex horse it will return to it an empty list
      setBreedList(localCache[animal]);
      settStatus("loaded");
    }
  }, [animal]); // here we declared that useeffect depends on animal, so whenever animal changes it will rerender again
  return [breedList, status];
}
