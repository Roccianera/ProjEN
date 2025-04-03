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
import { AddCircle } from "@mui/icons-material";
import { generateProject } from "../service/aiService";
import { createProject } from "../service/projectService";

// Definisci l'interfaccia delle props
interface PromptPanelProps {
  shouldFetch: boolean;
  setShouldFetch: React.Dispatch<React.SetStateAction<boolean>>;
}

const PromptPanel: React.FC<PromptPanelProps> = ({
  shouldFetch,
  setShouldFetch,
}) => {
  const [open, setOpen] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
    if (!newOpen) {
      setPrompt(""); // Resetta il prompt quando chiudi il drawer
    }
  };

  const handleSubmit = async () => {
    console.log("Prompt inviato:", prompt);
    setLoading(true);

    try {
      const projectResponse = await generateProject(prompt);
      console.log("Risposta ricevuta:", projectResponse);

      const response = await createProject(projectResponse);
      console.log("Progetto creato:", response);

      setShouldFetch(!shouldFetch);
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
        <AddCircle />
      </Button>

      {/* Pannello laterale */}
      <Drawer
        anchor="right"
        open={open}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: { width: "400px", maxWidth: "90vw", p: 2 },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
          }}
        >
          {/* Intestazione */}
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
          >
            <Typography variant="h6">Inserisci il tuo prompt</Typography>
            <IconButton onClick={toggleDrawer(false)}>
              <CloseIcon />
            </IconButton>
          </Stack>

          {/* Area di testo */}
          <TextField
            multiline
            minRows={6}
            maxRows={12}
            fullWidth
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Scrivi qui il tuo prompt..."
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
              Generating project, please wait...
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
