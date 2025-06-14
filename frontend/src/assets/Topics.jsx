import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { Box, Typography, Grid, Paper, CircularProgress, Alert } from "@mui/material";

function Topics() {
  const { level } = useParams();
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        setLoading(true);
        const levelNumber = level.split("-")[1];
        const res = await axios.get(
          `http://localhost:2100/api/levels/${levelNumber}/topics`
        );
        setTopics(res.data);
      } catch (err) {
        setError("Failed to load topics");
      } finally {
        setLoading(false);
      }
    };

    fetchTopics();
  }, [level]);

  const levelNumber = level.split("-")[1];

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box mt={4}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box maxWidth="900px" mx="auto" p={3}>
      <Typography variant="h4" component="h1" gutterBottom align="center" fontWeight={600}>
        Topics for Level {levelNumber}
      </Typography>

      {topics.length === 0 ? (
        <Typography align="center" color="text.secondary">
          No topics found.
        </Typography>
      ) : (
        <Grid container spacing={2}>
          {topics.map((topic) => (
            <Grid item xs={12} sm={6} md={4} key={topic.customId}>
              <Paper
                elevation={3}
                sx={{
                  p: 2,
                  transition: "0.3s",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: 6,
                  },
                }}
              >
                <Link
                  to={`/levels/${levelNumber}/topics/${topic.customId}`}
                  style={{
                    textDecoration: "none",
                    color: "#1976d2",
                    fontWeight: 500,
                    fontSize: "1.1rem",
                  }}
                >
                  {topic.title || topic.customId}
                </Link>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}

      <Box mt={4} textAlign="center">
        <Link to="/modules" style={{ textDecoration: "none", color: "#555" }}>
          ← Back to Modules
        </Link>
      </Box>
    </Box>
  );
}

export default Topics;
