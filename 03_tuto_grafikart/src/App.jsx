import {useState} from "react";

function App() {

  const [person, setPerson] = useState({
    firstName: 'John',
    lastName: 'Doe',
    age: 18
  })

  const [count, setCount] = useState(0);

  const incrementAge =  () => {
    setPerson({...person, age: person.age + 1})
  }

  return <>
    <p>Age de {person.firstName} : {person.age}</p>
    <button onClick={incrementAge}>Gagner une année</button>
  </>
}


export default App
