export interface IMetadatum{
  name: string,
  values: string[]
}

export class DataService {

  private metaData: IMetadatum[]

  constructor(){
    this.metaData = require('./data/meta.json')
  }

  get meta(): IMetadatum[]{
    return this.metaData
  }
}
