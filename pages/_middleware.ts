import { jwtVerify } from '@libs/jwt'
import type { NextFetchEvent, NextRequest } from 'next/server'

export async function middleware(req: NextRequest, ev: NextFetchEvent) {
  // if ('x-jwt' in req.headers) {
  //   const token = req.headers['x-jwt']
  //   const decoded = jwtVerify(token.toString())
  //   if (typeof decoded === 'object') {
  //     try {
  //       // const { user, ok } = await this.userService.findById(decoded['id']);
  //       // if (ok) {
  //       //   req['user'] = user;
  //       // }
  //     } catch (error) {}
  //   }
  // }
  // return new Response('Hello, world!')
}
