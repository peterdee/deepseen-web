import { parse } from 'cookie';

import { COOKIE_NAME } from '../configuration';

const notAuthenticated = {
  props: {
    authenticated: false,
  },
};

export default function getCommonSSP(context): any {
  const cookies = context.req.headers.cookie;
  if (!cookies) {
    return notAuthenticated;
  }

  try {
    const parsedCookies = parse(cookies);
    if (!(parsedCookies && parsedCookies[COOKIE_NAME])) {
      return notAuthenticated;
    }

    return {
      props: {
        authenticated: true,
      },
    };
  } catch {
    return notAuthenticated;
  }
}
