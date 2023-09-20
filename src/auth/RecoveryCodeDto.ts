import { PickType } from "@nestjs/mapped-types";
import { RecoveryDto } from "./RecoveryDto";

export class RecoveryCodeDto extends PickType(RecoveryDto, ['email']) {}