import React from 'react';
import ReactDOM from 'react-dom';
import Login from './components/login'

class App extends React.Component {
    render() {
        return <Login name="John" />;
    }
}

export default App;

ReactDOM.render(<App />,document.getElementById('app'));