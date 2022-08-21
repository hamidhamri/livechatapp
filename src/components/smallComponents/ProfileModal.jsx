import React from "react";
import Modal from "@mui/material/Modal";
import { useFormik } from "formik";
import * as Yup from "yup";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { withStyles } from "@mui/styles";
import { Alert, IconButton, InputAdornment, Stack } from "@mui/material";
import { createMuiTheme } from "@mui/material/styles";
import MuiThemeProvider from "@mui/material/styles/ThemeProvider";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { updateUserInfoAction } from "../../actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const t = createMuiTheme({
  palette: {
    action: {
      disabledBackground: "#777",
      disabled: "set color of text here",
    },
  },
});

const theme = createTheme();

const CssTextField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "#F97230",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#F97230",
    },
    "& .MuiFormHelperText-root": {
      fontSize: "1.3rem",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#F97230",
      },
      "&:hover fieldset": {
        borderColor: "#F97230",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#F97230",
      },
    },
  },
})(TextField);

const ProfileModal = ({ setOpen, open, user }) => {
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  const handleClose = () => setOpen(false);

  const { success, loading, error } = useSelector(
    (state) => state.updateUserInfo
  );

  useEffect(() => {
    if (success) {
      setOpen(false);
      formik.values.name = user.name || "";
      formik.values.email = user.email || "";
      formik.values.password = user.password || "";
      formik.values.status = user.status || "";
      formik.values.about = user.about || "";
      formik.values.relationship = user.relationship || "";
      formik.values.living = user.living || "";
      formik.values.working = user.working || "";
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success]);

  const formik = useFormik({
    initialValues: {
      name: user.name || "",
      email: user.email || "",
      password: "",
      status: user.status || "",
      about: user.about || "",
      relationship: user.relationship || "",
      living: user.living || "",
      working: user.working || "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .matches(/^[A-Za-z ]*$/, "Please enter valid name")
        .max(40),
      living: Yup.string().max(40),
      status: Yup.string().max(40),
      relationship: Yup.string().max(40),
      about: Yup.string().max(40),
      working: Yup.string().max(40),
      email: Yup.string().email("Invalid email address"),
      password: Yup.string().required("No password provided."),
    }),
    onSubmit: function (values) {
      dispatch(
        updateUserInfoAction(
          values.name,
          values.status,
          values.living,
          values.working,
          values.relationship,
          values.about,
          values.email.toLowerCase(),
          values.password
        )
      );
    },
  });

  return (
    <>
      <Modal
        sx={{ top: "10%" }}
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <ThemeProvider theme={theme}>
          <Container
            sx={{
              backgroundColor: "#f3f3f3",
              p: 4,
              zIndex: "1",
              borderRadius: "20px",
            }}
            component="main"
            maxWidth="xs"
          >
            <CssBaseline />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <img src="/images/logo.png" alt="logo" />

              <Typography
                component="h1"
                variant="h4"
                sx={{ fontWeight: "600", color: "#333" }}
              >
                Edit Profile
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={formik.handleSubmit}
                sx={{ mt: 3 }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <CssTextField
                      helperText={
                        formik.touched.name && formik.errors.name
                          ? formik.errors.name
                          : null
                      }
                      error={formik.touched.name && formik.errors.name}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.name}
                      InputLabelProps={{
                        style: { fontSize: "1.5rem", color: "#333" },
                      }}
                      inputProps={{
                        style: { fontSize: "1.5rem", color: "#333" },
                      }}
                      autoComplete="given-name"
                      name="name"
                      required
                      fullWidth
                      id="name"
                      label="Full name"
                      variant="standard"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <CssTextField
                      helperText={
                        formik.touched.status && formik.errors.status
                          ? formik.errors.status
                          : null
                      }
                      error={formik.touched.status && formik.errors.status}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.status}
                      InputLabelProps={{
                        style: { fontSize: "1.5rem", color: "#333" },
                      }}
                      inputProps={{
                        style: { fontSize: "1.5rem", color: "#333" },
                      }}
                      autoComplete="given-name"
                      name="status"
                      required
                      fullWidth
                      id="status"
                      label="Your status"
                      variant="standard"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <CssTextField
                      helperText={
                        formik.touched.living && formik.errors.living
                          ? formik.errors.living
                          : null
                      }
                      error={formik.touched.living && formik.errors.living}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.living}
                      InputLabelProps={{
                        style: { fontSize: "1.5rem", color: "#333" },
                      }}
                      inputProps={{
                        style: { fontSize: "1.5rem", color: "#333" },
                      }}
                      autoComplete="given-name"
                      name="living"
                      required
                      fullWidth
                      id="living"
                      label="Lives In"
                      variant="standard"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <CssTextField
                      helperText={
                        formik.touched.working && formik.errors.working
                          ? formik.errors.working
                          : null
                      }
                      error={formik.touched.working && formik.errors.working}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.working}
                      InputLabelProps={{
                        style: { fontSize: "1.5rem", color: "#333" },
                      }}
                      inputProps={{
                        style: { fontSize: "1.5rem", color: "#333" },
                      }}
                      autoComplete="given-name"
                      name="working"
                      required
                      fullWidth
                      id="working"
                      label="Works at"
                      variant="standard"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <CssTextField
                      helperText={
                        formik.touched.relationship &&
                        formik.errors.relationship
                          ? formik.errors.relationship
                          : null
                      }
                      error={
                        formik.touched.relationship &&
                        formik.errors.relationship
                      }
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.relationship}
                      InputLabelProps={{
                        style: { fontSize: "1.5rem", color: "#333" },
                      }}
                      inputProps={{
                        style: { fontSize: "1.5rem", color: "#333" },
                      }}
                      autoComplete="given-name"
                      name="relationship"
                      required
                      fullWidth
                      id="relationship"
                      label="relationship"
                      variant="standard"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <CssTextField
                      helperText={
                        formik.touched.about && formik.errors.about
                          ? formik.errors.about
                          : null
                      }
                      error={formik.touched.about && formik.errors.about}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.about}
                      InputLabelProps={{
                        style: { fontSize: "1.5rem", color: "#333" },
                      }}
                      inputProps={{
                        style: { fontSize: "1.5rem", color: "#333" },
                      }}
                      autoComplete="given-name"
                      name="about"
                      required
                      fullWidth
                      id="about"
                      label="about"
                      variant="standard"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <CssTextField
                      error={formik.touched.email && formik.errors.email}
                      helperText={
                        formik.touched.email && formik.errors.email
                          ? formik.errors.email
                          : null
                      }
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.email}
                      inputProps={{
                        style: { fontSize: "1.5rem", color: "#333" },
                      }}
                      InputLabelProps={{
                        style: { fontSize: "1.5rem", color: "#333" },
                      }}
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      variant="standard"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <CssTextField
                      error={formik.touched.password && formik.errors.password}
                      helperText={
                        formik.touched.password && formik.errors.password
                          ? formik.errors.password
                          : null
                      }
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.password}
                      inputProps={{
                        style: { fontSize: "1.5rem", color: "#333" },
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                            >
                              {showPassword ? (
                                <VisibilityIcon
                                  style={{ fontSize: "2rem", color: "#333" }}
                                />
                              ) : (
                                <VisibilityOffIcon
                                  style={{ fontSize: "2rem", color: "#333" }}
                                />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      InputLabelProps={{
                        style: { fontSize: "1.5rem", color: "#333" },
                      }}
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="new-password"
                      variant="standard"
                    />
                  </Grid>
                </Grid>
                <MuiThemeProvider theme={t}>
                  <Button
                    disabled={loading}
                    sx={{
                      mt: 3,
                      mb: 2,
                      fontSize: "1.5rem",
                      fontWeight: "300",
                      backgroundColor: "#F97230",
                      color: "#fff",
                      "&:hover": { backgroundColor: "#F96600" },
                    }}
                    type="submit"
                    fullWidth
                    variant="contained"
                  >
                    Update
                  </Button>
                </MuiThemeProvider>
                {error && (
                  <Stack>
                    <Alert
                      sx={{ fontSize: "1.5rem", mb: 2 }}
                      variant="outlined"
                      severity="error"
                    >
                      {error}
                    </Alert>
                  </Stack>
                )}
              </Box>
            </Box>
          </Container>
        </ThemeProvider>
      </Modal>
    </>
  );
};

export default ProfileModal;
