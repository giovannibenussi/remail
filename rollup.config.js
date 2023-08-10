import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import { terser } from "rollup-plugin-terser";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import postcss from "rollup-plugin-postcss";
import simplevars from "postcss-simple-vars";
import nested from "postcss-nested";
import cssnext from "postcss-cssnext";
import cssnano from "cssnano";

const packageJson = require("./package.json");

const postcssConfig = postcss({
  plugins: [
    simplevars(),
    nested(),
    cssnext({ warnForDuplicates: false }),
    cssnano(),
  ],
  extensions: [".css"],
});

export default [
  {
    input: "src/index.ts",
    output: [
      {
        file: packageJson.main,
        format: "cjs",
        sourcemap: true,
      },
      {
        file: packageJson.module,
        format: "esm",
        sourcemap: true,
      },
      {
        file: "dist/types.d.ts",
        format: "es",
      },
    ],
    plugins: [
      postcssConfig,
      peerDepsExternal(),
      resolve(),
      commonjs(),
      typescript({ tsconfig: "./tsconfig.json" }),
      terser(),
    ],
    external: ["react", "react-dom", "styled-components"],
  },
  //{
  //input: "src/index.ts",
  //output: [{ file: "dist/types.d.ts", format: "es" }],
  //plugins: [dts.default(), postcssConfig],
  //external: ["react", "react-dom", "styled-components"],
  //},
];
