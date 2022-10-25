import { Box, Button, CircularProgress } from "@chakra-ui/react";

export const CircularIntegration = ({ asyncEvent, success, onClick, text }) => {
  const buttonSx = {
    ...(success && {
      backgroundColor: "green",
      "&:hover": {
        backgroundColor: "gray",
      },
    }),
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ margin: 1, position: "relative" }}>
        <Button
          variant="contained"
          sx={buttonSx}
          disabled={asyncEvent.loading}
          onClick={() => {
            if (onClick) onClick();
            asyncEvent.execute();
          }}
        >
          {text}
          {asyncEvent.loading && (
            <CircularProgress
              isIndeterminate
              color="green.300"
              //   size={24}
              //   sx={{
              //     color: "green",
              //     position: "absolute",
              //     top: "50%",
              //     left: "50%",
              //     marginTop: "-12px",
              //     marginLeft: "-12px",
              //   }}
            />
          )}
        </Button>
      </Box>
    </Box>
  );
};
