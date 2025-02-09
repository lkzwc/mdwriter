"use client";

import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";
import { useState, useEffect } from "react";
import remarkGfm from "remark-gfm";

export function Preview({ content, styles = {} }) {
  const [mdxSource, setMdxSource] = useState(null);

  useEffect(() => {
    const compile = async () => {
      try {
        const mdxSource = await serialize(content || "", {
          mdxOptions: {
            remarkPlugins: [remarkGfm],
            development: false
          }
        });
        setMdxSource(mdxSource);
      } catch (error) {
        console.error("Failed to compile markdown:", error);
      }
    };
    compile();
  }, [content]);

  const previewStyles = {
    "--text-color": styles.colors?.text || "#1f2937",
    "--heading-color": styles.colors?.heading || "#111827",
    "--link-color": styles.colors?.link || "#3b82f6",
    "--quote-color": styles.colors?.quote || "#4b5563",
    "--quote-border-color": styles.colors?.border || "#e5e7eb",
    "--background-color": styles.colors?.background || "#ffffff",
    "--headingBorder": styles.colors?.headingBorder || "#3b82f6",
    "--headingBackground": styles.colors?.headingBackground || "#f3f4f6",
    "--font-family": styles.bodyFont === "serif"
      ? "'Noto Serif', 'Source Serif Pro', Georgia, Cambria, 'Times New Roman', Times, serif"
      : "'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
    "--font-size": `${styles.fontSize || 16}px`,
    "--line-height": styles.lineHeight || 1.8,
    "--paragraph-spacing": `${styles.paragraphSpacing || 1.6}em`,
  };

  return (
    <div
      className="preview-content p-2"
      style={{
        ...previewStyles,
        color: "var(--text-color)",
        fontFamily: "var(--font-family)",
        fontSize: "var(--font-size)",
        lineHeight: "var(--line-height)",
        backgroundColor: "var(--background-color)",
      }}
    >
      <style jsx global>{`
        .preview-content {
          max-width: 100%;
          overflow-wrap: break-word;
        }
        
        .preview-content h1,
        .preview-content h2,
        .preview-content h3,
        .preview-content h4,
        .preview-content h5,
        .preview-content h6 {
          color: var(--heading-color);
          font-weight: 600;
          margin-top: calc(var(--paragraph-spacing) * 1.5);
          margin-bottom: var(--paragraph-spacing);
        }

        /* 混合标题样式 */
        ${styles.headingStyle === "mixed" ? `
          .preview-content h1 {
            text-align: center;
            background-color: var(--headingBackground);
            padding: 1em;
            border-radius: 8px;
            margin: 1.5em -0.5em;
            border: 2px solid var(--headingBorder);
          }
          
          .preview-content h2 {
            border-bottom: 2px solid var(--headingBorder);
            padding-bottom: 0.3em;
          }
          
          .preview-content h3 {
            border-left: 4px solid var(--headingBorder);
            padding-left: 0.8em;
            margin-left: -0.8em;
          }
          
          .preview-content h4 {
            position: relative;
            padding-left: 1em;
          }
          
          .preview-content h4::before {
            content: '';
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
            width: 0.5em;
            height: 0.5em;
            background-color: var(--headingBorder);
            border-radius: 50%;
          }
          
          .preview-content h5 {
            color: var(--headingBorder);
          }
          
          .preview-content h6 {
            font-style: italic;
            color: var(--quote-color);
          }
        ` : styles.headingStyle === "border" ? `
          .preview-content h1,
          .preview-content h2,
          .preview-content h3,
          .preview-content h4,
          .preview-content h5,
          .preview-content h6 {
            border-left: 4px solid var(--headingBorder);
            padding-left: 0.5em;
            margin-left: -0.5em;
          }
        ` : styles.headingStyle === "background" ? `
          .preview-content h1,
          .preview-content h2,
          .preview-content h3,
          .preview-content h4,
          .preview-content h5,
          .preview-content h6 {
            background-color: var(--headingBackground);
            padding: 0.5em;
            border-radius: 4px;
            margin-left: -0.5em;
            margin-right: -0.5em;
          }
        ` : styles.headingStyle === "underline" ? `
          .preview-content h1,
          .preview-content h2,
          .preview-content h3,
          .preview-content h4,
          .preview-content h5,
          .preview-content h6 {
            border-bottom: 2px solid var(--headingBorder);
            padding-bottom: 0.2em;
          }
        ` : styles.headingStyle === "simple" ? `
          .preview-content h1,
          .preview-content h2,
          .preview-content h3,
          .preview-content h4,
          .preview-content h5,
          .preview-content h6 {
            position: relative;
          }
          
          .preview-content h1::after,
          .preview-content h2::after,
          .preview-content h3::after,
          .preview-content h4::after,
          .preview-content h5::after,
          .preview-content h6::after {
            content: '';
            position: absolute;
            bottom: -0.2em;
            left: 0;
            width: 2em;
            height: 2px;
            background-color: var(--headingBorder);
          }
        ` : ''}
        
        .preview-content h1 { font-size: 2em; }
        .preview-content h2 { font-size: 1.5em; }
        .preview-content h3 { font-size: 1.25em; }
        .preview-content h4 { font-size: 1em; }
        .preview-content h5 { font-size: 0.875em; }
        .preview-content h6 { font-size: 0.85em; }
        
        .preview-content p {
          margin-top: 0;
          margin-bottom: var(--paragraph-spacing);
        }
        
        .preview-content a {
          color: var(--link-color);
          text-decoration: none;
          &:hover {
            text-decoration: underline;
          }
        }
        
        .preview-content blockquote {
          margin: var(--paragraph-spacing) 0;
          ${styles.quoteStyle === "border" ? `
            border-left: 4px solid var(--quote-border-color);
            padding-left: 1em;
            color: var(--quote-color);
          ` : styles.quoteStyle === "background" ? `
            background-color: var(--quote-border-color);
            padding: 1em;
            border-radius: 4px;
            color: var(--quote-color);
          ` : styles.quoteStyle === "modern" ? `
            border-left: 2px solid var(--quote-border-color);
            background-color: color-mix(in srgb, var(--quote-border-color) 10%, transparent);
            padding: 1em;
            border-radius: 2px;
            color: var(--quote-color);
          ` : ''}
        }
        
        .preview-content blockquote p {
          margin: 0;
        }
        
        .preview-content img {
          max-width: 100%;
          height: auto;
          border-radius: 4px;
          margin: var(--paragraph-spacing) 0;
        }
        
        .preview-content pre {
          background-color: #1f2937;
          color: #e5e7eb;
          padding: 1em;
          border-radius: 4px;
          overflow-x: auto;
          margin: var(--paragraph-spacing) 0;
        }
        
        .preview-content code {
          background-color: color-mix(in srgb, var(--text-color) 10%, transparent);
          padding: 0.2em 0.4em;
          border-radius: 4px;
          font-size: 0.9em;
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
        }
        
        .preview-content pre code {
          background-color: transparent;
          padding: 0;
          border-radius: 0;
          color: inherit;
        }
        
        .preview-content ul,
        .preview-content ol {
          margin-top: var(--paragraph-spacing);
          margin-bottom: var(--paragraph-spacing);
          padding-left: 1.5em;
        }
        
        .preview-content li {
          margin-top: calc(var(--paragraph-spacing) * 0.3);
          margin-bottom: calc(var(--paragraph-spacing) * 0.3);
        }

        /* Task List 样式 */
        .preview-content input[type="checkbox"] {
          margin-right: 0.5em;
        }
        
        .preview-content table {
          width: 100%;
          border-collapse: collapse;
          margin: var(--paragraph-spacing) 0;
          display: block;
          overflow-x: auto;
        }
        
        .preview-content th,
        .preview-content td {
          border: 1px solid var(--quote-border-color);
          padding: 0.5em;
        }
        
        .preview-content th {
          background-color: color-mix(in srgb, var(--quote-border-color) 10%, transparent);
          font-weight: 600;
        }

        /* 删除线 */
        .preview-content del {
          color: var(--quote-color);
        }

        /* 水平分割线 */
        .preview-content hr {
          border: none;
          border-top: 1px solid var(--quote-border-color);
          margin: var(--paragraph-spacing) 0;
        }
      `}</style>
      {mdxSource ? <MDXRemote {...mdxSource} /> : null}
    </div>
  );
}