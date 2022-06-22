import { GetServerSideProps } from 'next';


const checkIfAuthorized: GetServerSideProps = async (context) => {
  if (context.req.cookies.is_authorized === 'true') {
    return {
      props: {}
    }
  }
  else {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }
}

export default checkIfAuthorized;