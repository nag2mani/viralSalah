import { Box, Button, TextField, Typography } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { useState } from "react";

// ⛳ Gemini API call (you can later move this to a separate utils file)
const generatePostWithGemini = async ({ title, context, tone }) => {
  const prompt = `
    Write a LinkedIn post with the following:
    - Title/Topic: ${title}
    - Context: ${context}
    - Tone: ${tone}
    Format it as a complete engaging LinkedIn post.
  `;

  const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=YOUR_API_KEY", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }]
    }),
  });

  const data = await response.json();
  return data?.candidates?.[0]?.content?.parts?.[0]?.text || "Failed to generate post.";
};

const PostCreation = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [generatedPost, setGeneratedPost] = useState("");

  const handleFormSubmit = async (values, { setSubmitting }) => {
    const generated = await generatePostWithGemini(values);
    setGeneratedPost(generated);
    setSubmitting(false);
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
          isSubmitting
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
              <Button type="submit" color="secondary" variant="contained" disabled={isSubmitting}>
                Generate Post
              </Button>
            </Box>
          </form>
        )}
      </Formik>

      {generatedPost && (
        <Box mt="40px" p="20px" bgcolor="#1f2a40" borderRadius="10px">
          <Typography variant="h5" gutterBottom>
            Generated Post
          </Typography>
          <Typography whiteSpace="pre-line">{generatedPost}</Typography>
        </Box>
      )}
    </Box>
  );
};

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

export default PostCreation;
