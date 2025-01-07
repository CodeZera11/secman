import type { Config } from "tailwindcss";
import config from "@repo/ui/tailwind.config";

const webConfig = {
  ...config,
  presets: [config],
  theme: {
    extend: {
      colors: {},
    },
  },
} satisfies Config;

export default webConfig;
