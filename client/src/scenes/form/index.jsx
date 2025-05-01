import { Box, Button, TextField, Typography, CircularProgress } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { useState } from "react";

// Define validation schema and initial values first
const postSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  context: yup.string().required("Context is required"),
  tone: yup.string().required("Tone is required"),
});

const initialValues = {
  title: "",
  context: "",
  tone: "",
};

// Gemini API call
const generatePostWithGemini = async ({ title, context, tone }) => {
  try {
    const prompt = `
      Write a LinkedIn post with the following:
      - Title/Topic: ${title}
      - Context: ${context}
      - Tone: ${tone}
      Format it as a complete engaging LinkedIn post.
    `;

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    
    if (!data?.candidates?.[0]?.content?.parts?.[0]?.text) {
      throw new Error("No text generated in the response");
    }
    
    return data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error("Error generating post:", error);
    return `Failed to generate post. Error: ${error.message}`;
  }
};

const PostCreation = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [generatedPost, setGeneratedPost] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFormSubmit = async (values, { setSubmitting }) => {
    try {
      setLoading(true);
      setGeneratedPost("");
      setError("");
      
      const generated = await generatePostWithGemini(values);
      
      if (generated.startsWith("Failed to generate post")) {
        setError(generated);
      } else {
        setGeneratedPost(generated);
      }
    } catch (err) {
      setError(`Error: ${err.message}`);
      console.error("Form submission error:", err);
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <Box m="20px">
      <Header title="Create Post" subtitle="Generate LinkedIn Post with AI" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={postSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                label="Post Title / Topic"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.title}
                name="title"
                error={!!touched.title && !!errors.title}
                helperText={touched.title && errors.title}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                multiline
                rows={4}
                label="Context (What should the post be about?)"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.context}
                name="context"
                error={!!touched.context && !!errors.context}
                helperText={touched.context && errors.context}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                label="Tone (e.g. Inspirational, Informative, Friendly)"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.tone}
                name="tone"
                error={!!touched.tone && !!errors.tone}
                helperText={touched.tone && errors.tone}
                sx={{ gridColumn: "span 4" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button 
                type="submit" 
                color="secondary" 
                variant="contained" 
                disabled={isSubmitting || loading}
                startIcon={loading && <CircularProgress size={20} color="inherit" />}
              >
                {loading ? "Generating..." : "Generate Post"}
              </Button>
            </Box>
          </form>
        )}
      </Formik>

      {loading && (
        <Box mt="40px" p="20px" bgcolor="#1f2a40" borderRadius="10px">
          <Typography variant="h6" color="secondary">
            Generating post... Please wait.
          </Typography>
        </Box>
      )}

      {error && !loading && (
        <Box mt="40px" p="20px" bgcolor="#f44336" borderRadius="10px">
          <Typography variant="h6" color="white">
            Error
          </Typography>
          <Typography color="white">{error}</Typography>
        </Box>
      )}

      {generatedPost && !loading && !error && (
        <Box mt="40px" p="20px" bgcolor="#1f2a40" borderRadius="10px">
          <Typography variant="h5" color="white" gutterBottom>
            Generated Post
          </Typography>
          <Typography color="white" whiteSpace="pre-line">{generatedPost}</Typography>
          <Box display="flex" justifyContent="end" mt="20px">
            <Button
              color="secondary"
              variant="contained"
              onClick={() => {
                navigator.clipboard.writeText(generatedPost);
              }}
            >
              Copy to Clipboard
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default PostCreation;