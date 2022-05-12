import Pet from "./Pet";

const Results = ({ pets }) => {
  return (
    <div className="search">
      {!pets.length ? ( //this checks if there is pets founds or not + it's useful cause we can't use if conditon here is we pick ? instead.
        <h1>No Pets Found</h1>
      ) : (
        pets.map((pet) => {
          return (
            <Pet
              animal={pet.animal}
              key={pet.id}
              name={pet.name}
              breed={pet.breed}
              images={pet.images}
              location={`${pet.city}, ${pet.state}`}
              id={pet.id}
            />
          );
        })
      )}
    </div>
  );
};

export default Results;
