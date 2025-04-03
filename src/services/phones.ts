import PhoneRepository from "../repositories/phones";
import ClientRepository from "../repositories/clients";
import { CreatePhone, PhoneWithCarrier } from "../protocols/types/Phone";
import { ValidationError, ConflictError, NotFoundError } from "../errors";

export default {
  async createPhone(data: CreatePhone): Promise<PhoneWithCarrier> {
    const errors: string[] = [];

    if (data.number.length !== 11) {
      errors.push("Número deve conter DDD + 9 dígitos");
    }

    if (!data.carrier_id) {
      errors.push("Operadora é obrigatória");
    }

    if (errors.length > 0) {
      throw new ValidationError("Dados inválidos", errors);
    }

    let client = await ClientRepository.findByDocument(data.document);
    if (!client) {
      client = await ClientRepository.createClient(data.document);
    }

    const phoneCount = await PhoneRepository.countByClient(client.id);
    if (phoneCount >= 3) {
      throw new ConflictError("Limite máximo de 3 telefones por CPF atingido");
    }

    const phoneData = { ...data, client_id: client.id };
    return PhoneRepository.insert(phoneData);
  },

  async getPhonesByDocument(document: string): Promise<PhoneWithCarrier[]> {
    const phones = await PhoneRepository.findByDocument(document);
    if (phones.length === 0) {
      throw new NotFoundError("Nenhum telefone encontrado para este CPF");
    }
    return phones;
  },
};
