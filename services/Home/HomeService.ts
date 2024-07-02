import { getInstance } from "../instance";

const HomeService = {
  getHome: async () => {
    return await getInstance().get("/api");
  },
};

export default HomeService;
