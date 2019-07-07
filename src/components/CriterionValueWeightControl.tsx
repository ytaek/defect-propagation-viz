import * as React from "react";

interface Props {
    name: string,
    weight: number
}

interface State{
    weight: number
}

export class CriterionValueWeightControl extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props)

        this.state = {
            weight: props.weight
        }

        this.handleClick = this.handleClick.bind(this)
    }

    handleClick() {
        this.setState(prevState => {
            console.log(prevState)
            
            if (prevState.weight === 0) {
                return {
                    weight: 0.5
                }
            } else if (prevState.weight === 0.5) {
                return {
                    weight: 1
                }
            } else {
                return {
                    weight: 0
                }
            }
        })
    }

    render(){
        return (<div className="category btn btn-light" onClick={this.handleClick}>
                <div className="name">{this.props.name}</div>
                <div className="weight">{this.state.weight}</div>
              </div>)
    }
}