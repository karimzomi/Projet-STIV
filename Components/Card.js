import { Component } from "React";

class Card extends Component{
    constructor(props){
        super(props)
        this.state = {
            text:':)'
        }

    }

    render(){
        return <>
            <div>
                <h1>{this.state.text}</h1>
                <button onClick={()=>{this.setState({text:'nigger'})}} >Test</button>
            </div>
        </>
    }
}
export default Card