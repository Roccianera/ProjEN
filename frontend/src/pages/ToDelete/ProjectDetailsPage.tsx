import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  CircularProgress,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  Divider,
  Grid,
  Card,
  CardContent,
  CardHeader,
  ThemeProvider,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import CategoryIcon from "@mui/icons-material/Category";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { theme } from "../../theme"; // Importo il tema fornito
import PromptPanel from "../../components/PromptPanel";

// Definizione delle interfacce basate sullo schema JSON
interface TaskRequestDto {
  name: string;
  description: string;
  endDate: any;
}

interface TaskCategoryRequestDto {
  name: string;
  tasks: TaskRequestDto[];
}

interface ProjectRequestDto {
  name: string;
  description: string;
  endDate: any;
  taskCategories: TaskCategoryRequestDto[];
}

// Componente principale della pagina
const ProjectDetailsPage: React.FC = () => {
  const [project, setProject] = useState<ProjectRequestDto | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Simuliamo il recupero dei dati del progetto all'avvio del componente
  useEffect(() => {
    const fetchProject = async () => {
      try {
        // Simuliamo una chiamata API con un ritardo
        setLoading(true);

        // ID del progetto dall'URL (potrebbe essere ottenuto da useParams() in React Router)
        const projectId =
          new URLSearchParams(window.location.search).get("id") || "1";

        // Simuliamo una risposta del server dopo 1.5 secondi
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // Dati di esempio per la demo
        const mockData: ProjectRequestDto = {
          name: `Progetto ${projectId}`,
          description:
            "Questo è un progetto di esempio che mostra come strutturare i dati secondo lo schema fornito",
          endDate: "2025-06-30",
          taskCategories: [
            {
              name: "Sviluppo Frontend",
              tasks: [
                {
                  name: "Design UI/UX",
                  description:
                    "Creare wireframe e mockup dell'interfaccia utente",
                  endDate: "2025-04-15",
                },
                {
                  name: "Implementazione componenti React",
                  description:
                    "Sviluppare componenti riutilizzabili basati su Material UI",
                  endDate: "2025-05-01",
                },
              ],
            },
            {
              name: "Sviluppo Backend",
              tasks: [
                {
                  name: "API Design",
                  description: "Progettare le API RESTful per il sistema",
                  endDate: "2025-04-10",
                },
                {
                  name: "Implementazione database",
                  description:
                    "Configurare il database e creare le tabelle necessarie",
                  endDate: "2025-04-20",
                },
                {
                  name: "Autenticazione e autorizzazione",
                  description:
                    "Implementare il sistema di sicurezza e gestione utenti",
                  endDate: "2025-05-15",
                },
              ],
            },
          ],
        };

        setProject(mockData);
        setLoading(false);
      } catch (err) {
        setError(
          "Si è verificato un errore durante il recupero dei dati del progetto"
        );
        setLoading(false);
      }
    };

    fetchProject();
  }, []);

  // Formatta una data in un formato leggibile
  const formatDate = (dateString: any): string => {
    if (!dateString) return "Data non specificata";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("it-IT", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return "Data non valida";
    }
  };

  // Mostra un loader durante il caricamento
  if (loading) {
    return (
      <ThemeProvider theme={theme}>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="100vh"
          bgcolor="background.default"
        >
          <CircularProgress color="primary" />
          <Typography variant="h6" color="textSecondary" ml={2}>
            Caricamento dettagli progetto...
          </Typography>
        </Box>
      </ThemeProvider>
    );
  }

  // Mostra un messaggio di errore se necessario
  if (error) {
    return (
      <ThemeProvider theme={theme}>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="100vh"
          bgcolor="background.default"
        >
          <Paper
            elevation={3}
            sx={{
              p: 4,
              maxWidth: 500,
              textAlign: "center",
              bgcolor: "background.paper",
            }}
          >
            <Typography variant="h5" color="error" gutterBottom>
              Errore
            </Typography>
            <Typography variant="body1">{error}</Typography>
          </Paper>
        </Box>
      </ThemeProvider>
    );
  }

  // Se non ci sono dati del progetto
  if (!project) {
    return (
      <ThemeProvider theme={theme}>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="100vh"
          bgcolor="background.default"
        >
          <Paper
            elevation={3}
            sx={{
              p: 4,
              maxWidth: 500,
              textAlign: "center",
              bgcolor: "background.paper",
            }}
          >
            <Typography variant="h5" gutterBottom>
              Nessun dato disponibile
            </Typography>
            <Typography variant="body1">
              Non è stato possibile trovare i dettagli del progetto richiesto.
            </Typography>
          </Paper>
        </Box>
      </ThemeProvider>
    );
  }

  // Visualizza i dettagli del progetto
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          bgcolor: "background.default",
          minHeight: "100vh",
          py: 4,
        }}
      >
        <Container>
          <Paper
            elevation={3}
            sx={{
              p: 3,
              mb: 4,
              borderRadius: theme.shape.borderRadius,
              boxShadow: theme.shadows[3],
            }}
          >
            <Typography variant="h4" gutterBottom>
              {project.name}
            </Typography>

            <Typography variant="body1" paragraph>
              {project.description}
            </Typography>

            <Box display="flex" alignItems="center" mb={2}>
              <CalendarTodayIcon sx={{ mr: 1 }} />
              <Typography variant="subtitle1">
                Data di fine: {formatDate(project.endDate)}
              </Typography>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Typography
              variant="h5"
              mt={3}
              mb={2}
              display="flex"
              alignItems="center"
            >
              <CategoryIcon sx={{ mr: 1 }} />
              Categorie di attività ({project.taskCategories.length})
            </Typography>
          </Paper>

          {/* Categorie e Task */}
          {project.taskCategories.map((category, categoryIndex) => (
            <Accordion
              key={categoryIndex}
              sx={{
                mb: 2,
                boxShadow: theme.shadows[2],
                "&:before": {
                  display: "none",
                },
                borderRadius: `${theme.shape.borderRadius}px !important`,
                overflow: "hidden",
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                sx={{
                  bgcolor: "background.paper",
                  borderBottom: "1px solid rgba(255, 255, 255, 0.12)",
                }}
              >
                <Box display="flex" alignItems="center" width="100%">
                  <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    {category.name}
                  </Typography>
                  <Chip
                    label={`${category.tasks.length} attività`}
                    size="small"
                    color="primary"
                    sx={{ ml: 2 }}
                  />
                </Box>
              </AccordionSummary>

              <AccordionDetails sx={{ p: 0 }}>
                <Grid container spacing={2} sx={{ p: 2 }}>
                  {category.tasks.map((task, taskIndex) => (
                    <Grid item xs={12} sm={6} md={4} key={taskIndex}>
                      <Card
                        sx={{
                          height: "100%",
                          display: "flex",
                          flexDirection: "column",
                          boxShadow: theme.shadows[1],
                          borderRadius: theme.shape.borderRadius,
                        }}
                      >
                        <CardHeader
                          title={
                            <Box display="flex" alignItems="center">
                              <AssignmentIcon sx={{ mr: 1, fontSize: 20 }} />
                              <Typography variant="subtitle1">
                                {task.name}
                              </Typography>
                            </Box>
                          }
                          sx={{
                            pb: 0,
                            "& .MuiCardHeader-content": { overflow: "hidden" },
                          }}
                        />

                        <CardContent sx={{ flexGrow: 1, pt: 1 }}>
                          <Typography
                            variant="body2"
                            color="textSecondary"
                            paragraph
                          >
                            {task.description}
                          </Typography>

                          <Box display="flex" alignItems="center" mt={1}>
                            <CalendarTodayIcon
                              sx={{
                                mr: 1,
                                fontSize: 16,
                                color: "text.secondary",
                              }}
                            />
                            <Typography variant="caption" color="textSecondary">
                              Scadenza: {formatDate(task.endDate)}
                            </Typography>
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </AccordionDetails>
            </Accordion>
          ))}
        </Container>
      </Box>
      <PromptPanel></PromptPanel>
    </ThemeProvider>
  );
};

export default ProjectDetailsPage;
