import '@espressive/legacy-css';
import Head from 'next/head';
import { Admin } from '@espressive/cascara';
import { Header, Nav } from '../components';

// NOTE: Anything in the <Head> here is esentially a fallback. These tags can
// be overridden at the page level. <meta> type tags will need a key added
// to them in order for them to be updated, otherwise React will not know
// that the tag is changing. Below the viewport tag does not have a key added
// because that should never be changed. But the description does have a key
// since we will possibly want to change that on a per-page basis.

function MyApp({ Component, pageProps }) {
  return (
    <Admin>
      <Head>
        <title>Cascara</title>
        <meta
          content="Espressive's Functional Design System"
          key='description'
          name='description'
        />
        <meta content='width=device-width, initial-scale=1.0' name='viewport' />
      </Head>

      <Header {...pageProps} />
      <Nav {...pageProps} />
      <Admin.Main>
        <Component {...pageProps} />
      </Admin.Main>
    </Admin>
  );
}

export default MyApp;
