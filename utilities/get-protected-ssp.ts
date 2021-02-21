import { parse } from 'cookie';

import { COOKIE_NAME } from '../configuration';

const redirect = {
  destination: '/signin',
  permanent: false,
};

export default function getProtectedSSP(context): any {
  const cookies = context.req.headers.cookie;
  if (!cookies) {
    return {
      redirect,
    };
  }

  try {
    const parsedCookies = parse(cookies);
    if (!(parsedCookies && parsedCookies[COOKIE_NAME])) {
      return {
        redirect,
      };
    }

    const token = parsedCookies[COOKIE_NAME];

    return {
      props: {
        token,
      },
    };
  } catch {
    return {
      redirect,
    };
  }
}
