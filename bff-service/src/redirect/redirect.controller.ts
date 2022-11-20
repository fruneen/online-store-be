import {
  Controller,
  Inject,
  CACHE_MANAGER,
  All,
  Req,
  Res,
} from '@nestjs/common';
import { Axios } from 'axios';
import { Cache } from 'cache-manager';
import { isEmpty } from 'lodash';
import { Request, Response } from 'express';

const CACHE_TIME = 120; // 2 minutes

@Controller('*')
export class RedirectController {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  config = {
    product: process.env.PRODUCT_SERVICE_URL,
    cart: process.env.CART_SERVICE_URL,
  };

  getRequestKey(req) {
    return req.originalUrl + req.method + JSON.stringify(req.body);
  }

  async cache(req, res, duration) {
    const key = this.getRequestKey(req);
    const cachedBody = await this.cacheManager.get(key);

    if (cachedBody) {
      res.send(cachedBody);
      console.log('Cached response');

      return;
    } else {
      res.sendResponse = res.send;

      res.send = (body) => {
        this.cacheManager.set(key, body, { ttl: duration });
        res.sendResponse(body);
      };
    }
  }

  @All()
  async redirect(@Req() req: Request, @Res() res: Response) {
    const key = this.getRequestKey(req);
    const cachedBody = await this.cacheManager.get(key);

    if (cachedBody && !['PUT', 'PATCH', 'POST'].includes(req.method)) {
      res.json(cachedBody);
      return;
    }

    console.log('Original URL:', req.originalUrl);
    console.log('Method:', req.method);
    console.log('Body:', req.body);

    let query = `/${req.originalUrl.split('/').slice(2).join('/')}`;

    if (query.endsWith('/')) query = query.slice(0, -1);

    const recipient = req.originalUrl.split('/')[1];
    const recipientURL = this.config[recipient];

    if (recipientURL) {
      try {
        const axiosConfig = {
          method: req.method,
          url: `${recipientURL}${query}`,
          headers: {
            'Content-Type': 'application/json',
            ...(req.headers.authorization && {
              Authorization: req.headers.authorization,
            }),
          },
          ...(!isEmpty(req.body) && {
            data: JSON.stringify(req.body),
          }),
        };

        console.log('Axios config', axiosConfig);
        const axiosService = new Axios(axiosConfig);

        const { data, status } = await axiosService.request(axiosConfig);
        const parsedResponse = JSON.parse(data);

        const responseData = parsedResponse.data || parsedResponse;
        this.cacheManager.set(key, responseData, { ttl: CACHE_TIME });

        res.status(status).json(responseData);
      } catch (error) {
        console.log(error);

        if (error.response) {
          const { status, data } = error.response;
          res.status(status).json(data);

          return;
        }

        res.status(502).json({ error: error.message });
      }
    } else {
      res.status(502).json({ error: 'Cannot process request' });
    }
  }
}
