"use client";
import { MdPreview, config } from "md-editor-rt";
import "md-editor-rt/lib/style.css";
import "./index.css";
import screenfull from "screenfull";
import hls from "highlight.js";
import "highlight.js/styles/github.css";

// 配置文档 https://imzbf.github.io/md-editor-rt/en-US/demo#%F0%9F%98%81%20%E5%9F%BA%E6%9C%AC%E4%BD%BF%E7%94%A8%E7%A4%BA%E4%BE%8B

config({
  editorExtensions: {
    screenfull: {
      instance: screenfull,
    },
    highlight: {
      instance: hls,
    },
    prettier: {
      standaloneJs:
        "https://cdn.bootcdn.net/ajax/libs/prettier/3.0.3/standalone.min.js",
    },
    cropper: {
      js: "https://cdn.bootcdn.net/ajax/libs/cropperjs/1.6.0/cropper.min.js",
      css: "https://cdn.bootcdn.net/ajax/libs/cropperjs/1.6.0/cropper.min.css",
    },
  },
});

export default function Markdown({ markdown }: { markdown: string }) {
  return (
    <>
      <MdPreview
        editorId="preview"
        modelValue={markdown}
        previewTheme="vuepress"
        codeTheme="github"
      />
    </>
  );
}
