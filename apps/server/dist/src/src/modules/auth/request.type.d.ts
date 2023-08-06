import { Request } from 'express';
import { JwtPayload } from 'types';
export interface RequestWithUser extends Request {
    user: JwtPayload;
}
//# sourceMappingURL=request.type.d.ts.map