import React from "react";
import { ThemeProvider } from "styled-components";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../tailwind.config";

const { theme } = resolveConfig(tailwindConfig);

const Theme = props => <ThemeProvider {...props} theme={theme} />;

export default Theme;
