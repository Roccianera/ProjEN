import React, { useState } from "react";
import {
  Box,
  Button,
  Drawer,
  TextField,
  IconButton,
  Typography,
  Stack,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";
import AssistentICon from "@mui/icons-material/Assistant";

import { useTheme } from "@mui/material/styles";

// Aggiornamento dell'interfaccia delle props
interface PromptPanelProps {
  promptFunction: (prompt: string) => Promise<any>;
  promptTitle?: string;
  promptDescription?: string;
}

const PromptPanel: React.FC<PromptPanelProps> = ({
  promptFunction,
  promptTitle,
  promptDescription,
}) => {
  const [open, setOpen] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const theme = useTheme();

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
    if (!newOpen) {
      setPrompt(""); // Resetta il prompt quando chiudi il drawer
    }
  };

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const response = await promptFunction(prompt); // Passa il prompt alla funzione di generazione del progetto
    } catch (error) {
      console.error("Errore durante la generazione del progetto:", error);
      setError("Errore durante la generazione del progetto. Riprova.");
    } finally {
      setLoading(false);
    }
    setOpen(false);
    setPrompt("");
  };

  return (
    <Box>
      <Button
        variant="contained"
        color="primary"
        onClick={toggleDrawer(true)}
        sx={{ position: "fixed", right: 16, bottom: 16 }}
      >
        <AssistentICon />
      </Button>

      <Drawer
        anchor="right"
        open={open}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: {
            width: "400px",
            maxWidth: "90vw",
            p: 2,
            height: "100vh",
            borderRadius: 2,
            boxShadow: theme.shadows[3],
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
          }}
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
          >
            <Typography variant="h6">{promptTitle}</Typography>
            <IconButton onClick={toggleDrawer(false)}>
              <CloseIcon />
            </IconButton>
          </Stack>

          <TextField
            multiline
            minRows={6}
            maxRows={12}
            fullWidth
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Write your prompt here..."
            variant="outlined"
            sx={{ flexGrow: 1, mb: 2 }}
          />

          <Button
            variant="contained"
            endIcon={<SendIcon />}
            onClick={handleSubmit}
            disabled={!prompt.trim()}
            fullWidth
          >
            Invia
          </Button>

          {loading && (
            <Typography variant="body2" color="textSecondary" mt={2}>
              Processing, please wait...
            </Typography>
          )}

          {error && (
            <Typography variant="body2" color="error" mt={2}>
              {error}
            </Typography>
          )}
        </Box>
      </Drawer>
    </Box>
  );
};

export default PromptPanel;
