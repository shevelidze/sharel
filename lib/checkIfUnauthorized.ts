import { GetServerSideProps } from 'next';

const checkIfUnauthorized: GetServerSideProps = async (context) => {
  if (context.req.cookies.is_authorized === 'true') {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }
  else {
    return {
      props: {}
    }
  }
}

export default checkIfUnauthorized;