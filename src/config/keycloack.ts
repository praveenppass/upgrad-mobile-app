import { ENV } from "@config/env";
import { RNKeycloak } from "@react-keycloak/native";

export const keycloak = new RNKeycloak({
	url: ENV.keycloakURL,
	realm: ENV.keycloakRealm as string,
	clientId: ENV.keyCloackClientId as string,
});
