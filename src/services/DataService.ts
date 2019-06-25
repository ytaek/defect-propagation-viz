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

export class ProjectAttributes {
  product: string;
  productApply: string;
  imsProjectName: string;
  // parentProjectCode: string;
  oem: string;
  fwVersion: string;
  capacity: string;
  density: string;
  formFactor: string;
  nandCell: string;
  nandDesign: string;

  constructor() {
    this.product = "";
    this.productApply = "";
    this.imsProjectName = "";
    this.oem = "";
    this.fwVersion = "";
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

    this._criteriaData = metaData.map((d: MetaDatumInterface) => {
      const cValues: CriterionValueInterface[] = d.values.map(
        (item: string) => ({ name: item, weight: 0 })
      );

      const criterion: CriterionInterface = {
        name: d.name,
        values: cValues,
        weight: 0
      };
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
