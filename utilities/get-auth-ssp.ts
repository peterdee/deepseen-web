import { parse } from 'cookie';

import { COOKIE_NAME } from '../configuration';

export default function getAuthSSP(context): any {
  const cookies = context.req.headers.cookie;
  if (cookies) {
    try {
      const parsedCookies = parse(cookies);
      if (parsedCookies && parsedCookies[COOKIE_NAME]) {
        return {
          redirect: {
            destination: '/home',
            permanent: false,
          },
        };
      }
    } catch {
      return {
        props: {},
      };
    }
  }

  return {
    props: {},
  };
}
