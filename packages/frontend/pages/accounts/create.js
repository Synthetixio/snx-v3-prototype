import CreateAccount from '../../components/accounts/CreateAccount';
import { Container, Box, Text, Link } from '@chakra-ui/react';
import Head from 'next/head';
import Subnav from '../../components/accounts/Subnav/index';
//import { useDeploymentWrite } from '../../utils/hooks/useDeploymentWrite';

export default function Create() {

    const createAccount = () => {
        //const deployment = useDeploymentWrite('synthetix.AccountToken', 'mint');
        // toast appropriately
    };

    return (
        <Box>
            <Head>
                <title>Create Account</title>
                <meta name="description" content="Create Account" />
            </Head>
            <Container maxW="container.sm" py="8">
                <Subnav />
                <CreateAccount />
                <Text mt="6">Or <Link onClick={(e) => { e.preventDefault(); createAccount(); }} fontWeight="semibold" color="blue.400">create an account</Link> and stake collateral later.</Text>
            </Container>
        </Box>
    );
}
