import DataService, { CriterionValueInterface, CriterionValueStatus } from './DataService';

export class MainService {

    _candidateCriterionValueList: CriterionValueInterface[];
    _nonCandidateCriterionValueList: CriterionValueInterface[];
    _dataService: DataService;

    constructor(_ds: DataService) {
        this._dataService = _ds;
    }
    
    get dataService(): DataService {
        return this._dataService;
    }

    get candidateCriterionValueList(): CriterionValueInterface[] {
        return this.getCriterionValueListByStatus(CriterionValueStatus.CAND);
    }

    get nonCandidateCriterionValueList(): CriterionValueInterface[] {
        return this.getCriterionValueListByStatus(CriterionValueStatus.NONCAND);
    }

    get weightCriterionValueList(): CriterionValueInterface[] {
        return this.getCriterionValueListByStatus(CriterionValueStatus.WEIGHT);
    }

    private getCriterionValueListByStatus(status: CriterionValueStatus): CriterionValueInterface[] {
        const cvList: CriterionValueInterface[] = [];
        return this.dataService.criteriaData.reduce(
            (prev, cv) => (prev.concat(cv.values)), cvList)
            .filter(cv => (cv.status === status));
    }
}