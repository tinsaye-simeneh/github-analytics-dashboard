import { Paper, Text, Title, Button } from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons-react";

interface NoDataProps {
  title: string;
  description: string;
  onRetry?: () => void;
}

const NoData = ({ title, description, onRetry }: NoDataProps) => {
  return (
    <div className="flex justify-center items-center h-full">
      <Paper
        shadow="sm"
        p="xl"
        withBorder
        className="flex flex-col justify-center items-center space-y-4 max-w-md mx-auto"
      >
        <IconAlertCircle size={48} className="text-gray-500" />
        <Title order={3} className="text-center text-gray-800">
          {title}
        </Title>
        <Text className="text-center text-gray-600">{description}</Text>

        {onRetry && (
          <Button onClick={onRetry} color="blue" variant="outline" fullWidth>
            Retry
          </Button>
        )}
      </Paper>
    </div>
  );
};

export default NoData;
