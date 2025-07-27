import { NotFoundException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

// List of allowed IPs for Better Auth related endpoints
const WHITELISTED_IPS: string[] = [
  '::ffff:127.0.0.1', // localhost IPv4
  // '::1', // localhost IPv6
  // Add other trusted IPs here, e.g. production load balancer, internal services, etc.
  // '203.0.113.42',
];

// @Injectable()
// export class IpWhitelistMiddleware implements NestMiddleware {
//   use(req: Request, res: Response, next: NextFunction) {
//     const requestIp = req.ip;
//     console.log(requestIp, 'requestIp');

//     if (!WHITELISTED_IPS.includes(requestIp ?? '')) {
//       throw new NotFoundException();
//     }
//     next();
//   }
// }

export function ipWhiteListMiddleWare(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (
    req.path.startsWith('/api/auth') &&
    !req.path.startsWith('/api/auth/callback')
  ) {
    const requestIp = req.ip;
    if (!WHITELISTED_IPS.includes(requestIp ?? '')) {
      throw new NotFoundException();
    }
  }
  next();
}
