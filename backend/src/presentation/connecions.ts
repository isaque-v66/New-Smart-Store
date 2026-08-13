import { RegisterUseCase } from "../application/useCases/registerUseCase.js";
import { RegisterInfra } from "../infra/persistence/registerInfra.js";


export const registerInfra = new RegisterInfra()


export const registerUseCase = new RegisterUseCase(registerInfra)