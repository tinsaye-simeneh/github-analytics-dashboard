"use client";

import { Button, Container, Text, Title, Center } from "@mantine/core";
import Link from "next/link";

const NotFound = () => {
  return (
    <Container style={{ textAlign: "center" }} className="pt-20">
      <Title order={1} className="text-4xl font-bold text-gray-800">
        404 - Page Not Found
      </Title>
      <Text size="lg" className="text-gray-600 mt-2">
        Oops! The page you&apos;re looking for doesn&apos;t exist.
      </Text>
      <Center mt="lg">
        <Link href="/">
          <Button color="blue" size="md">
            Go Home
          </Button>
        </Link>
      </Center>
    </Container>
  );
};

export default NotFound;
