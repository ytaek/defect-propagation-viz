import * as React from "react";
import { CriterionInterface, CriterionValueInterface } from 'src/services/DataService';

interface Props {
    criterionValue: CriterionValueInterface;    
    onToggleWeight(cv: CriterionValueInterface): void;
}

export class CriterionValueWeightControl extends React.Component<Props> {

    constructor(props: Props) {
        super(props)

        this.handleClick = this.handleClick.bind(this)
    }

    handleClick() {
        this.props.onToggleWeight(this.props.criterionValue);
//         let w = 0;
//         const { weight } = this.props.criterionValue;
// console.log(this.props.criterionValue);
//         if (weight === 0) {
//             w = 0.5;
//         } else if (weight === 0.5) {
//             w = 1;
//         } else {
//             w = 0;
//         }

//         this.props.criterionValue.weight = w;
        // this.props.criterionValue.criterion!.values.filter(cv => cv.name === name)[0].weight = w;

        // this.setState(prevState => {
        //     console.log(prevState)
            
        //     if (prevState.weight === 0) {
        //         return {
        //             weight: 0.5
        //         }
        //     } else if (prevState.weight === 0.5) {
        //         return {
        //             weight: 1
        //         }
        //     } else {
        //         return {
        //             weight: 0
        //         }
        //     }
        // })
    }

    render(){
        return (<div className="category btn btn-light" onClick={this.handleClick}>
                <div className="name">{this.props.criterionValue.name}</div>
                <div className="weight">{this.props.criterionValue.weight}</div>
              </div>)
    }
}