import '@mui/material/styles';

// Extend the Palette interface with a custom property
declare module '@mui/material/styles' {
    interface Palette {
        custom: {
            darkIcon: string;
        };
    }
    interface PaletteOptions {
        custom?: {
            darkIcon?: string;
        };
    }
}
