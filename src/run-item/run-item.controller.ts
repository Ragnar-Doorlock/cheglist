import { Body, Controller, Param, Patch } from "@nestjs/common";
import { UpdateRunItemDto } from "./dto/update-run-item.dto";
import { TokenDataDecorator } from "src/token-data.decorator";
import type { TokenData } from "src/token-data.type";
import { RunItemService } from "./run-item.service";

@Controller('run-items')
export class RunItemController {
    constructor(
        private service: RunItemService,
    ) {}

    @Patch(':runId/items/:runItemId')
    update(
        @Param('runId') runId: string,
        @Param('runItemId') runItemId: string,
        @Body() dto: UpdateRunItemDto,
        @TokenDataDecorator() tokenData: TokenData,
    ) {
        const requestUserId = tokenData.id;
        return this.service.updateItem(
            runId,
            runItemId,
            dto,
            requestUserId,
        );
    }
}
