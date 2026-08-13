import { LoginUseCase } from "../application/useCases/loginUseCase.js";
import { RegisterUseCase } from "../application/useCases/registerUseCase.js";
import { RegisterInfra } from "../infra/persistence/registerInfra.js";


export const authInfra = new RegisterInfra()


export const registerUseCase = new RegisterUseCase(authInfra)
export const loginUseCase = new LoginUseCase(authInfra)