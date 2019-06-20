import meta from "./data/meta.json";

class DataService {
  getData() {
    return data;
  }
}

const dataService = new DataService();

export { dataService };
