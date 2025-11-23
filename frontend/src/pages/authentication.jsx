import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Snackbar } from "@mui/material";
import { AuthContext } from "../contexts/AuthContext";

const defaultTheme = createTheme();

export default function Authentication() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [name, setName] = React.useState("");
  const [error, setError] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [formState, setFormState] = React.useState(0);
  const [open, setOpen] = React.useState(false);

  const { handleRegister, handleLogin } = React.useContext(AuthContext);

  let handleAuth = async () => {
    try {
      if (formState === 0) {
        await handleLogin(username, password);
      } else {
        let result = await handleRegister(name, username, password);
        setMessage(result);
        setOpen(true);
        setError("");
        setFormState(0);
        setUsername("");
        setPassword("");
      }
    } catch (err) {
      let message = err?.response?.data?.message || "Error occurred";
      setError(message);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />

      <Grid
        container
        sx={{
          height: "100vh",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f5f5f5",
          backgroundImage: "url('/background.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Grid
          size={{ xs: 11, sm: 8, md: 4 }}
          component={Paper}
          elevation={6}
          square
        >
          <Box
            sx={{
              my: 6,
              mx: 4,
              height: "440px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "#2c1547" }}>
              <LockOutlinedIcon />
            </Avatar>

            <Typography component="h1" variant="h5">
              {formState === 0 ? "Login" : "Register"}
            </Typography>

            <Box component="form" noValidate sx={{ mt: 2 }}>
              {formState === 1 && (
                <TextField
                  margin="normal"
                  fullWidth
                  required
                  label="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              )}

              <TextField
                margin="normal"
                fullWidth
                required
                label="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />

              <TextField
                margin="normal"
                fullWidth
                required
                type="password"
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
               

              />

              <p style={{ color: "red" }}>{error}</p>

              <Button
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 1,
                  backgroundColor: "#2c1547", // custom color
                  "&:hover": {
                    backgroundColor: "#16022dff", // hover color
                  },
                }}
                onClick={handleAuth}
              >
                {formState === 0 ? "Login" : "Register"}
              </Button>

              <Button
                fullWidth
                sx={{
                  mt: 3,
                  mb: 1,
                  backgroundColor: "#2c1547", // custom color
                  color:"white",
                  "&:hover": {
                    backgroundColor: "#16022dff", // hover color
                  },
                }}
                onClick={() => setFormState(formState === 0 ? 1 : 0)}
              >
                {formState === 0
                  ? "Don't have an account? Register"
                  : "Already have an account? Login"}
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>

      <Snackbar open={open} autoHideDuration={4000} message={message} />
    </ThemeProvider>
  );
}
