"use client";
import { Theme, ThemeProvider, createTheme } from "@mui/material/styles";
import { styled, Dialog, DialogTitle } from "@mui/material";

declare module "@mui/material/styles" {
    interface PaletteColorOptions {
        main: string;
        contrastText?: string;
        light?: string;
        dark?: string;
    }
    interface PaletteOptions {
        darker?: PaletteColorOptions;
        primary?: PaletteColorOptions;
        secondary?: PaletteColorOptions;
        info?: PaletteColorOptions;
        error?: PaletteColorOptions;
        success?: PaletteColorOptions;
        dark?: PaletteColorOptions;
        textLight?: PaletteColorOptions;
        mintCream?: PaletteColorOptions;
    }
    interface Theme {
        palette: {
            darker: any;
            primary: any;
            secondary: any;
            info: any;
            error: any;
            success: any;
            dark: any;
            textLight: any;
            mintCream: any;
        };
    }
    // allow configuration using `createTheme`
    interface ThemeOptions {
        palette?: PaletteOptions;
    }
}

declare module "@mui/material/Button" {
    interface ButtonPropsColorOverrides {
        dark: true;
    }
}

declare module "@mui/material/SvgIcon" {
    interface SvgIconPropsColorOverrides {
        dark: true;
        darker: true;
    }
}

const dark = "#1E3345";
const darker = "#153C7F";
const primary = "#2665BE";
const secondary = "#E5E2E2";
const royal_blue = "#163760";

export const theme: Theme = createTheme({
    palette: {
        primary: {
            main: primary,
        },
        success: {
            main: "#8CD087",
        },
        error: {
            main: "#D95D56",
        },
        darker: {
            main: darker,
            contrastText: "#FFF",
        },
        dark: {
            main: dark,
            contrastText: "#FFF",
        },
        secondary: {
            main: secondary,
        },
        textLight: {
            main: "#00000066",
        },
        mintCream: {
            main: "#F5FFFA",
        },
    },
    
});
export const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
      padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
      padding: theme.spacing(1),
    },
  }));
  
  export const StyledDialogTitle = styled(DialogTitle)({
    m: 0,
    p: 2,
    textAlign: "center",
    backgroundColor: "#E5E2E2",
    fontFamily: "Roboto",
    fontSize: "20px",
  });
  // themes.js

export const TaskStatusColors = {
    "Em Andamento": "yellow",
    "Concluída": "Chartreuse",
    "Pendente": "OrangeRed",
  };
  

export default function ThemeRegistry(props: React.PropsWithChildren) {
    const { children } = props;
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
