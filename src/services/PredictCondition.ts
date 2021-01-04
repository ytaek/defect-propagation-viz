


export class PredictCondition {

    private mode : string;  // negative or positive
    private threshold : number;  // max number of conditions to be set

    private path : string = "../data/projects.json";  // can change it 
    private cirteriaTypes : Array<string> = [
        "oem", 
        "capacity",
        "density",
        "formFactor",
        "nandCell",
        "nandDesign"
    ];

    constructor(mode : string, threshold : number) {
        this.mode = mode;
        this.threshold = threshold;
    }

    set setMode(newMode : string) { this.mode = newMode; }
    set setThreshold(newThreshold : number) { this.threshold = newThreshold; }

    predict(products : Array<string>) {
        let prediction : {
            [key: string] : number
        } = {};
        // 각 criteria type (oem, nandCell, formFactor, density, nandDesign, capcity)
        // 에 대해 얼마나 criteria들이 퍼져 있는지 정도를 entropy로 구함
        // entropy가 높을수록 그 criteria type의 중요도가 높음 (candidate들을 이루는지 여부에 대한 불확실성 증가)
        // 이후 확률별로 나눠주면됨 


        // step 1: make dictionary while setting product code as key
        const entireProductList : Array<string> = require(this.path);

        let productsSet : Set<string> = new Set(products);
        let productsDict = {};
        products.forEach(product => {
            if (productsSet.has(product)) {
                productsDict[product["code"]] = product;
            }
        });
        // step 2: calculate cross entropy per types
        let criteriaTypeInfo : any = {};
        
        
        let minEntropy = Number.MAX_VALUE;
        this.cirteriaTypes.forEach(type => {
            let criteriaDict : {[key:string] : number}= {};
            Object.values(productsDict).forEach(product => {
                if (product["type"] in Object.keys(criteriaDict))
                    criteriaDict[product["type"]] += 1;
                else 
                    criteriaDict[product["type"]] = 1;
            });
            Object.keys(criteriaDict).forEach(key => {
                criteriaDict[key] = criteriaDict[key] / products.length;
            });


            let entropy : number = 0;
            Object.values(criteriaDict).forEach(prob => {
                entropy += - prob * Math.log2(prob);
            })
            criteriaTypeInfo[type] = {
                "criteriaProbs" : criteriaDict,
                "entropy" : entropy
            };
            minEntropy = minEntropy < entropy ? minEntropy : entropy;
        });

        let predictionList = [];
        // step 3 : calculate default weight for each criteria type
        Object.keys(criteriaTypeInfo).forEach(type => {
            let typeEntropy : number = criteriaTypeInfo[type]["entropy"];
            criteriaTypeInfo[type]["defaultWeight"] = minEntropy / typeEntropy;
            Object.keys(criteriaTypeInfo[type]["criteriaProbs"]).forEach(criteria => {
                let weight = criteriaTypeInfo[type]["criteriaProbs"][criteria] * criteriaTypeInfo[type]["defaultWeight"];
                predictionList.push([criteria, weight]);
            });
        });

        // step 4: sort and cut off criterias with smaller weight with threshold
        




        console.log(prediction);


        return prediction;
    }

};

export default PredictCondition;