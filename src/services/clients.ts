import ClientRepository from "../repositories/clients";

export default {
  async getClientSummary(document: string) {
    return ClientRepository.getClientSummary(document);
  },
};
