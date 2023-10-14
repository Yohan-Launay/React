const title = "Bonjour les <strong>gens</strong>";
const style = {color: 'red', backgroundColor: 'blue'};
const showTitle = false;
const todos = [
    'Présenter react',
    'Présenter le JSX',
    'Créer des composants'
]


function App() {
  return <>
    <Title color="green" id="monid" className="demo" data-demo="demo">
      Mon composant
    </Title>
    <input type="text"/>
    <p>
      Lorem
    </p>
    <ul>
      {todos.map(todo => (<li key={todo}>{todo}</li>))}
    </ul>
  </>
}

function Title ({color, hidden, children, ...props}) {
  if (hidden) {
    return null
  }

  return <h1 style={{color: color}} {...props}>{children}</h1>
}

export default App
