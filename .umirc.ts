import { defineConfig } from "umi";

export default defineConfig({
  plugins: [
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
  antd:{},
  clientLoader: {},
  locale: {
    default: 'zh-CN',
    baseSeparator: '-',
    useLocalStorage: true,
    baseNavigator: false,
  },
  chainWebpack(config:any) {
    config.module
      .rule('ttf')
      .test(/.(woff|eot|woff2|ttf)$/)
      .use('file-loader')
      .loader('file-loader');
  },
});
