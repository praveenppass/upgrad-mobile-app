import "react-native-modalfy";
import type { IAppModalViewParams } from "@interface/app.interface";

declare module "react-native-modalfy" {
	interface ModalfyCustomParams extends IAppModalViewParams {}
}
