import { Paper, Text, Title, Button } from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons-react";

interface NoDataProps {
  title: string;
  description: string;
  onRetry?: () => void;
  onGoBack?: () => void;
}

const NoData = ({ title, description, onRetry, onGoBack }: NoDataProps) => {
  return (
    <div className="flex justify-center items-center h-screen">
      {" "}
      <Paper
        shadow="sm"
        p="xl"
        withBorder
        className="flex flex-col justify-center items-center space-y-4 max-w-md mx-auto"
      >
        <div className="flex justify-center items-center mb-4">
          {" "}
          <IconAlertCircle size={48} className="text-gray-500" />
        </div>
        <Title order={3} className="text-center text-gray-800">
          {title}
        </Title>
        <Text className="text-center text-gray-600">{description}</Text>

        {onRetry && (
          <Button onClick={onRetry} color="blue" variant="outline" fullWidth>
            Retry
          </Button>
        )}
        <Button
          color="gray"
          variant="outline"
          fullWidth
          className="mt-10"
          onClick={onGoBack}
        >
          Go Back
        </Button>
      </Paper>
    </div>
  );
};

export default NoData;
