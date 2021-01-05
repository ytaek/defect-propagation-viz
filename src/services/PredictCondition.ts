
// 사용법 
/*
const pc : PredictCondition = new PredictCondition(20);  // set threshold
pc.predict(["PMLFUNPJT-0004", "PMLFUNPJT-0100", "PMLFUNPJT-0001", "PRJ-0002", "PMLFUNPJT-0006", "PRJ-0001"]);
 

*/

export class PredictCondition {

    private mode : string;  // negative or positive
    private threshold : number;  // max number of conditions to be set

    private cirteriaTypes : string[] = [
        "oem", 
        "capacity",
        "density",
        "formFactor",
        "nandCell",
        "nandDesign"
    ];

    constructor(threshold : number) {
        this.threshold = threshold;
    }

    set setThreshold(newThreshold : number) { this.threshold = newThreshold; }

    predict(products : string[]):any {
        const prediction : {
            [key: string] : number
        } = {};
        // 각 criteria type (oem, nandCell, formFactor, density, nandDesign, capcity)
        // 에 대해 얼마나 criteria들이 퍼져 있는지 정도를 entropy로 구함
        // entropy가 높을수록 그 criteria type의 중요도가 높음 (candidate들을 이루는지 여부에 대한 불확실성 증가)
        // 이후 확률별로 나눠주면됨 


        // step 1: make dictionary while setting product code as key
        // console.log(this.path);
        const entireProductList : string[] = require("../data/projects.json");

        const productsSet : Set<string> = new Set(products);
        const productsDict : { [key:string] : string}= {};
        const code = "code";
        entireProductList.forEach(product => {
            if (productsSet.has(product[code])) {
                productsDict[product[code]] = product;
            }
        });
        // step 2: calculate cross entropy per types
        const criteriaTypeInfo : any = {};
        
        
        let minEntropy = Number.MAX_VALUE;
        // max Entropy case: maximum distributed (no info about common criteria)
        const maxEntropy = - (1 / products.length) * Math.log2(1 / products.length) * products.length
        this.cirteriaTypes.forEach(type => {
            const criteriaDict : {[key:string] : number}= {};
            Object.values(productsDict).forEach(product => {
                if (product[type] in criteriaDict) {
                    criteriaDict[product[type]] += 1;
                }
                else { 
                    criteriaDict[product[type]] = 1;
                }
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

        console.log(criteriaTypeInfo);

        const predictionList : any[] = [];
        // step 3 : calculate default weight for each criteria type
        Object.keys(criteriaTypeInfo).forEach(type => {
            const entropyLit = "entropy";
            const defaultWeightLit = "defaultWeight";
            const criteriaProbsLit = "criteriaProbs";
            const typeEntropy : number = criteriaTypeInfo[type][entropyLit];
            criteriaTypeInfo[type][defaultWeightLit] = (maxEntropy - typeEntropy) / (maxEntropy - minEntropy);
            Object.keys(criteriaTypeInfo[type][criteriaProbsLit]).forEach(criteria => {
                const weight = criteriaTypeInfo[type][criteriaProbsLit][criteria] * criteriaTypeInfo[type][defaultWeightLit];
                predictionList.push([criteria, weight]);
            });
        });

        // step 4: sort and cut off criterias with smaller weight with threshold
        console.log(predictionList);

        predictionList.sort((a, b) => (b[1] - a[1]));


        predictionList.forEach((d, i) => {
            if(i < this.threshold) {
                prediction[d[0]] = Math.round(d[1] * 10) / 10;
            }
        })
        console.log(prediction);


        return prediction;
    }

};

export default PredictCondition;
