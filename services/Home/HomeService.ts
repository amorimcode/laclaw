import { getInstance } from "../instance";

const HomeService = {
  getHome: async (source: string) => {
    return await getInstance().get("/api", {
      params: {
        source,
      },
    });
  },
};

export default HomeService;
