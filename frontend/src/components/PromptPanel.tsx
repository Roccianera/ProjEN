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

const PromptPanel = () => {
  const [open, setOpen] = useState(false);
  const [prompt, setPrompt] = useState("");

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
    if (!newOpen) {
      setPrompt(""); // Resetta il prompt quando chiudi il drawer
    }
  };

  const handleSubmit = () => {
    console.log("Prompt inviato:", prompt);
    // Qui puoi aggiungere la logica per gestire il prompt
    setOpen(false);
    setPrompt("");
  };

  return (
    <Box>
      {/* Pulsante per aprire il pannello */}
      <Button
        variant="contained"
        color="primary"
        onClick={toggleDrawer(true)}
        sx={{ position: "fixed", right: 16, bottom: 16 }}
      >
        <AddCircle></AddCircle>
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

          {/* Pulsante di invio */}
          <Button
            variant="contained"
            endIcon={<SendIcon />}
            onClick={handleSubmit}
            disabled={!prompt.trim()}
            fullWidth
          >
            Invia
          </Button>
        </Box>
      </Drawer>
    </Box>
  );
};

export default PromptPanel;
