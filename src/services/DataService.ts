export interface MetaDatumInterface {
  name: string;
  values: string[];
}

export enum CriterionValueStatus {
  CAND = 'CAND',
  NONCAND = "NONCAND",
  WEIGHT = "WEIGHT"
}

export interface CriterionValueInterface {
  id: number;
  name: string;
  weight: number;
  status: CriterionValueStatus;
  criterion?: CriterionInterface;
}

export interface CriterionInterface {
  id: number;
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

export class ProjectAttributes {
  // product: string;
  // productApply: string;
  // imsProjectName: string;
  // parentProjectCode: string;
  oem: string;
  // fwVersion: string;
  capacity: string;
  density: string;
  formFactor: string;
  nandCell: string;
  nandDesign: string;

  constructor() {
    // this.product = "";
    // this.productApply = "";
    // this.imsProjectName = "";
    this.oem = "";
    // this.fwVersion = "";
    this.capacity = "";
    this.density = "";
    this.formFactor = "";
    this.nandCell = "";
    this.nandDesign = "";
  }
}

export class DataService {
  private _criteriaData: CriterionInterface[];
  private _projectsData: ProjectInterface[];

  constructor() {
    const metaData = require("../data/meta.json");
    const prjData = require("../data/projects.json");

    this._criteriaData = metaData.map((d: MetaDatumInterface, ci: number) => {
      const cValues: CriterionValueInterface[] = d.values.map(
        (item: string, cvi:number) => ({ 
          id: cvi,
          name: item, 
          weight: 0, 
          status: CriterionValueStatus.WEIGHT
        })
      );

      const criterion: CriterionInterface = {
        id: ci,
        name: d.name,
        values: cValues,
        weight: 0
      };
      cValues.forEach(cv => (cv.criterion = criterion));

      return criterion;
    });
console.log("keys", Object.keys(new ProjectAttributes()));
    this._projectsData = prjData.map( (d: any) => {
      const prjAttr = Object.keys(new ProjectAttributes()).reduce( (prev, cur) => {
            prev[cur] = d[cur];
            return prev;
          }, {});
      return {
        code: d.code,
        score: 0,
        isPropCandidate: false,
        attributes: prjAttr
      };
    });

    console.log("prjData", prjData, this._projectsData);
  }

  get criteriaData(): CriterionInterface[] {
    return this._criteriaData;
  }

  get projectsData(): ProjectInterface[] {
    return this._projectsData;
  }
}

export default DataService;
