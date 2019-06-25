export interface MetaDatumInterface {
  name: string;
  values: string[];
}

export interface CriterionValueInterface {
  name: string;
  weight: number;    
}

export interface CriterionInterface {
  name: string;
  values: CriterionValueInterface[];
  weight: number;
}

export interface ProjectInterface {
  code: string;
  score: number;
  isPropCandidate: boolean;
  attributes: any;
}

export interface ProjectAttributesInterface {
  product: string;
  // productApply: string;
  // imsProjectName: string;
  // parentProjectCode: string;
  oem: string;
  // FWName: string;
  capacity: string;
  density: string;
  formFactor: string;
  nandCell: string;
  nandDesign: string;
}


export class DataService {
  private _criteriaData: CriterionInterface[];

  constructor() {
    const metaData = require('./data/meta.json');

    this._criteriaData = metaData.map( (d: MetaDatumInterface) => {
      const cValues: CriterionValueInterface[] = 
        d.values.map( (item: string) => ({ name: item, weight: 0 }) );

      const criterion: CriterionInterface = {
        name: d.name,
        values: cValues,
        weight: 0
      }
      return criterion;
    });
  }

  get criteriaData(): CriterionInterface[] {
    return this._criteriaData;
  }
}

export default DataService;