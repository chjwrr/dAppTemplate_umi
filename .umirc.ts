import { defineConfig } from "umi";

export default defineConfig({
  plugins: [
    '@umijs/plugins/dist/react-query',
    '@umijs/plugins/dist/antd',
    '@umijs/plugins/dist/styled-components',
    '@umijs/plugins/dist/locale'
  ],
  routes: [
    { path: "/", component: "index" },
    // { path: "/home", component: "home" }
  ],
  npmClient: 'pnpm',
  title:"INTO OTC",
  jsMinifierOptions: {
    target: ['chrome80', 'es2020']
  },
  styledComponents: {},
  reactQuery: {},
  antd:{},
  clientLoader: {},
  locale: {
    default: 'zh-CN',
    baseSeparator: '-',
  },
  chainWebpack(config:any) {
    config.module
      .rule('ttf')
      .test(/.(woff|eot|woff2|ttf)$/)
      .use('file-loader')
      .loader('file-loader');
  },
});
