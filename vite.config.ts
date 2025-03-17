import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { keycloakify } from "keycloakify/vite-plugin";
import { buildEmailTheme } from "keycloakify-emails";

import * as url from "url";

// const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        keycloakify({
            accountThemeImplementation: "none",
            themeName: "humblehr",
            postBuild: async buildContext => {
                const { config: loadConfig } = await import("./jsx-email.config.js");

                const config = await loadConfig;

                await buildEmailTheme({
                    // templatesSrcDirPath: import.meta.dirname + "/src/email/templates",
                    // i18nSourceFile: import.meta.dirname + "/src/email/i18n.ts",
                    templatesSrcDirPath: __dirname + "/emails/templates",
                    i18nSourceFile: __dirname + "/emails/i18n.ts",
                    themeNames: buildContext.themeNames,
                    keycloakifyBuildDirPath: buildContext.keycloakifyBuildDirPath,
                    locales: ["en"],
                    esbuild: {
                        ...config.esbuild,
                        format: 'esm'
                    },
                    cwd: __dirname,
                });
            }
        })
    ]
});
