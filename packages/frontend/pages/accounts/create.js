import CreateAccount from '../../components/accounts/CreateAccount';
import { Container, Box, Text, Link } from '@chakra-ui/react';
import Head from 'next/head';

export default function Create() {
    return (
        <Box>
            <Head>
                <title>Create Account</title>
                <meta name="description" content="Create Account" />
            </Head>
            <Container maxW="container.sm" py="8">
                <CreateAccount />
                <Text mt="6">Or <Link>create an account</Link> and stake collateral later.</Text>
            </Container>
        </Box>
    );
}
